import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {ShapeProps} from '../../Common'
import {RenderSkeletonProps} from '../Skeleton.interface'

export interface SkeletonElementProps
        extends ViewProps,
                RefAttributes<View>,
                Pick<ShapeProps, 'shape'>,
                Pick<RenderSkeletonProps, 'containerLayout'> {
        size?: number | {width?: number; height: number}
}

export type RenderSkeletonElementProps = SkeletonElementProps
export interface SkeletonElementBaseProps extends SkeletonElementProps {
        render: (props: RenderSkeletonElementProps) => JSX.Element
}

export type SkeletonElementContainerProps = Pick<RenderSkeletonElementProps, 'containerLayout'> & {
        showChildren?: boolean
}
