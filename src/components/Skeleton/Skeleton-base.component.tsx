import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {createStableHandlerWithState, runAfterInteractions} from '../../utils'
import {updateSkeletonDuration} from './Skeleton.handle'
import type {SkeletonBaseProps, SkeletonState} from './Skeleton.interface'
import {useSkeletonAnimated} from './use-skeleton-animated.hook'

export const SkeletonBase = forwardRef<View, SkeletonBaseProps>(
	({renderSkeleton, enableAnimated = true, duration, ...renderSkeletonProps}, ref) => {
		const [{visible: isVisible, nextSkeletonVisibleEvent}, setState] = useImmer<SkeletonState>({
			visible: true
		})

		const id = useId()
		const updateSkeletonDurationEffect = useMemo(
			() => createStableHandlerWithState(updateSkeletonDuration)(setState)(),
			[setState]
		)

		const {containerAnimatedStyle} = useSkeletonAnimated({
			enableAnimated,
			visible: typeof duration === 'number' && duration ? isVisible : false
		})

		useEffect(() => {
			updateSkeletonDurationEffect(duration)
		}, [duration, updateSkeletonDurationEffect])

		useEffect(() => {
			runAfterInteractions(nextSkeletonVisibleEvent)()
		}, [nextSkeletonVisibleEvent])

		return renderSkeleton({...renderSkeletonProps, containerAnimatedStyle, ref, visible: isVisible, id})
	}
)
