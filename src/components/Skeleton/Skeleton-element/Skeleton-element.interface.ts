import type {CommonProps} from '@/constants'
import type {RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'
import type {RenderSkeletonProps} from '../Skeleton.interface'

export interface SkeletonElementProps
        extends ViewProps,
                RefAttributes<View>,
                Pick<RenderSkeletonProps, 'layoutType'>,
                Pick<CommonProps, 'shape'> {
        size?: number | {width?: number; height: number}
}

export type RenderSkeletonElementProps = SkeletonElementProps
export type SkeletonElementBaseProps = SkeletonElementProps
