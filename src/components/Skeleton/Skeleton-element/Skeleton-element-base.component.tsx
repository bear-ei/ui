import {useId, type FC} from 'react'

import type {SkeletonElementBaseProps} from './Skeleton-element.interface'

import {RenderSkeletonElement} from './Skeleton-element.render'

export const SkeletonElementBase: FC<SkeletonElementBaseProps> = props => {
	const id = useId()

	return (
		<RenderSkeletonElement
			{...props}
			id={id}
		/>
	)
}

SkeletonElementBase.displayName = 'SkeletonElementBase'
