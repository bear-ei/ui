import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {createDeferredHandlerWithState, runAfterInteractions} from '../../utils'
import {clearSkeletonEvent, updateSkeletonDuration} from './Skeleton.handler'
import type {SkeletonBaseProps, SkeletonState} from './Skeleton.interface'
import {RenderSkeleton} from './Skeleton.render'
import {useSkeletonAnimated} from './use-skeleton-animated.hook'

export const SkeletonBase = forwardRef<View, SkeletonBaseProps>(
	({enableAnimated = true, duration, ...renderSkeletonProps}, ref) => {
		const [{visible: isVisible, nextSkeletonVisibilityEvent}, setState] = useImmer<SkeletonState>({
			visible: true
		})

		const id = useId()
		const {containerAnimatedStyle} = useSkeletonAnimated({
			enableAnimated,
			visible: typeof duration === 'number' && duration ? isVisible : false
		})

		const runUpdateDuration = useMemo(
			() =>
				createDeferredHandlerWithState(updateSkeletonDuration)(setState)({
					debounceMillisecond: 50
				}),
			[setState]
		)

		const runClearSkeletonEvent = useMemo(
			() => createDeferredHandlerWithState(clearSkeletonEvent)(setState)(),
			[setState]
		)

		useEffect(() => {
			runUpdateDuration(duration)
		}, [duration, runUpdateDuration])

		useEffect(() => {
			runAfterInteractions(nextSkeletonVisibilityEvent)().then(() =>
				runClearSkeletonEvent('visibility')
			)
		}, [nextSkeletonVisibilityEvent, runClearSkeletonEvent])

		return (
			<RenderSkeleton
				{...renderSkeletonProps}
				containerAnimatedStyle={containerAnimatedStyle}
				id={id}
				ref={ref}
				visible={isVisible}
			/>
		)
	}
)
