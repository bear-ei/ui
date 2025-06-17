import type {RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'
import type {ShapeProps} from '../../Common'
import type {RenderSkeletonProps} from '../Skeleton.interface'

export interface SkeletonElementProps
	extends ViewProps,
		RefAttributes<View>,
		Pick<ShapeProps, 'shape'>,
		Pick<RenderSkeletonProps, 'layout'> {
	size?: number | {width?: number; height: number}
}

export type RenderSkeletonElementProps = SkeletonElementProps
export type SkeletonElementBaseProps = SkeletonElementProps
export type SkeletonElementContainerProps = Pick<RenderSkeletonElementProps, 'layout'> & {
	visible?: boolean
}
