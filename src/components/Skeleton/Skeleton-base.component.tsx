import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../utils'
import {handleSkeletonDurationChange} from './Skeleton-handle'
import type {SkeletonBaseProps, SkeletonState} from './Skeleton.interface'
import {useSkeletonAnimated} from './use-skeleton-animated.hook'

export const SkeletonBase = forwardRef<View, SkeletonBaseProps>(
	({renderSkeleton, enableAnimated = true, duration, ...renderSkeletonProps}, ref) => {
		const [{visible: isVisible, nextSkeletonVisibleEvent}, setState] = useImmer<SkeletonState>({
			visible: true
		})

		const id = useId()
		const onSkeletonDurationChange = useMemo(() => handleSkeletonDurationChange(setState), [setState])
		const {containerAnimatedStyle} = useSkeletonAnimated({
			enableAnimated,
			visible: typeof duration === 'number' && duration ? isVisible : false
		})

		useEffect(() => {
			onSkeletonDurationChange(duration)
		}, [duration, onSkeletonDurationChange])

		useEffect(() => {
			runAfterInteractions(nextSkeletonVisibleEvent)()
		}, [nextSkeletonVisibleEvent])

		return renderSkeleton({...renderSkeletonProps, containerAnimatedStyle, ref, visible: isVisible, id})
	}
)
