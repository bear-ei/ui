import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../utils'
import {updateSkeletonDuration} from './Skeleton.handler'
import type {SkeletonBaseProps, SkeletonState} from './Skeleton.interface'
import {useSkeletonAnimated} from './use-skeleton-animated.hook'

export const SkeletonBase = forwardRef<View, SkeletonBaseProps>(
	({renderSkeleton, enableAnimated = true, duration, ...renderSkeletonProps}, ref) => {
		const [{visible: isVisible, nextSkeletonVisibilityEvent}, setState] = useImmer<SkeletonState>({
			visible: true
		})

		const id = useId()
		const {containerAnimatedStyle} = useSkeletonAnimated({
			enableAnimated,
			visible: typeof duration === 'number' && duration ? isVisible : false
		})

		const runUpdateDuration = useMemo(() => updateSkeletonDuration(setState), [setState])

		useEffect(() => {
			runUpdateDuration(duration)
		}, [duration, runUpdateDuration])

		useEffect(() => {
			runAfterInteractions(nextSkeletonVisibilityEvent)()
		}, [nextSkeletonVisibilityEvent])

		return renderSkeleton({
			...renderSkeletonProps,
			containerAnimatedStyle,
			id,
			ref,
			visible: isVisible
		})
	}
)
