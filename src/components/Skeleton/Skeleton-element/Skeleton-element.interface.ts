import type {RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'

import type {ThemeableProps} from '../../../theme'
import type {RenderSkeletonProps} from '../Skeleton.interface'

export interface SkeletonElementProps
	extends ViewProps, RefAttributes<View>, Pick<RenderSkeletonProps, 'orientation'>, Omit<ThemeableProps, 'size'> {
	size?: number | {height: number; width?: number}
}

export type RenderSkeletonElementProps = SkeletonElementProps
export type SkeletonElementBaseProps = SkeletonElementProps
