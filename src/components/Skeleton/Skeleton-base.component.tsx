import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'

import {updateSkeletonVisible} from './Skeleton.handler'
import type {SkeletonBaseProps, SkeletonState} from './Skeleton.interface'
import {RenderSkeleton} from './Skeleton.render'
import {useSkeletonAnimated} from './use-skeleton-animated.hook'

export const SkeletonBase = forwardRef<View, SkeletonBaseProps>(
	({enableAnimated = true, duration, ...renderSkeletonProps}, ref) => {
		const [{visible: isVisible}, setState] = useImmer<SkeletonState>({visible: true})
		const id = useId()
		const {containerAnimatedStyle} = useSkeletonAnimated({enableAnimated, visible: isVisible})
		const runUpdateVisible = useMemo(() => updateSkeletonVisible(setState), [setState])

		useEffect(() => {
			const cancel = runUpdateVisible(duration)

			return () => cancel?.()
		}, [duration, runUpdateVisible])

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

SkeletonBase.displayName = 'SkeletonBase'
