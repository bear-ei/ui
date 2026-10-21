import type {RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'

import type {ThemeProps} from '../../../theme'
import type {RenderSkeletonProps} from '../Skeleton.interface'

export interface SkeletonElementProps
	extends ViewProps, RefAttributes<View>, Pick<RenderSkeletonProps, 'layoutType'>, Omit<ThemeProps, 'size'> {
	size?: number | {width?: number; height: number}
}

export type RenderSkeletonElementProps = SkeletonElementProps
export type SkeletonElementBaseProps = SkeletonElementProps
