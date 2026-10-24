import {useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {SkeletonBaseProps, SkeletonState} from './Skeleton.interface'

import {updateSkeletonVisible} from './Skeleton.handler'
import {RenderSkeleton} from './Skeleton.render'
import {useSkeletonAnimated} from './use-skeleton-animated.hook'

export const SkeletonBase: FC<SkeletonBaseProps> = ({autoHideDelay, enableLoop = true, ...renderSkeletonProps}) => {
	const [{visible: isVisible}, setState] = useImmer<SkeletonState>({visible: true})
	const id = useId()
	const {containerAnimatedStyle} = useSkeletonAnimated({enableLoop, visible: isVisible})
	const runUpdateVisible = useMemo(() => updateSkeletonVisible(setState), [setState])

	useEffect(() => {
		const cancel = runUpdateVisible(autoHideDelay)

		return () => cancel?.()
	}, [autoHideDelay, runUpdateVisible])

	return (
		<RenderSkeleton
			{...renderSkeletonProps}
			containerAnimatedStyle={containerAnimatedStyle}
			id={id}
			visible={isVisible}
		/>
	)
}
