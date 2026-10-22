import {useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {SkeletonBaseProps, SkeletonState} from './Skeleton.interface'

import {updateSkeletonVisible} from './Skeleton.handler'
import {RenderSkeleton} from './Skeleton.render'
import {useSkeletonAnimated} from './use-skeleton-animated.hook'

export const SkeletonBase: FC<SkeletonBaseProps> = ({duration, enableAnimated = true, ...renderSkeletonProps}) => {
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
			visible={isVisible}
		/>
	)
}

SkeletonBase.displayName = 'SkeletonBase'
