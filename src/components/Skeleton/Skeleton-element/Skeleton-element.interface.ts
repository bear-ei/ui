import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {ShapeProps} from '../../Common'

export interface SkeletonElementProps extends ViewProps, RefAttributes<View>, Pick<ShapeProps, 'shape'> {
        height?: number
        containerLayout?: 'horizontal' | 'vertical'
        width?: number
}

export type RenderSkeletonElementProps = SkeletonElementProps
export interface SkeletonElementBaseProps extends SkeletonElementProps {
        render: (props: RenderSkeletonElementProps) => JSX.Element
}

export type SkeletonElementContainerProps = Pick<RenderSkeletonElementProps, 'width' | 'height' | 'containerLayout'> & {
        showChildren?: boolean
}
