import {FC, ReactNode, RefAttributes} from 'react'
import {View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {AnimatedTiming, OnStateEventChangeOptions} from '../../hooks'
import {SkeletonElementProps} from './Skeleton-element'

export interface SkeletonProps extends ViewProps, RefAttributes<View>, Pick<SkeletonElementProps, 'containerLayout'> {
        duration?: number
        enableAnimated?: boolean
        height?: number
        skeleton?: ReactNode
        width?: number
}

export interface RenderSkeletonProps extends SkeletonProps {
        containerAnimatedStyle: AnimatedStyle<ViewStyle>
        visible?: boolean
}

export interface SkeletonBaseProps extends SkeletonProps {
        render: (props: RenderSkeletonProps) => JSX.Element
}

export interface SkeletonState {
        nextSkeletonVisibleEvent?: () => void
        visible: boolean
}

export type HandleSkeletonStateChangeOptions = OnStateEventChangeOptions & Pick<SkeletonProps, 'duration'>
export type UseSkeletonAnimatedOptions = Pick<RenderSkeletonProps, 'enableAnimated'> & Pick<SkeletonState, 'visible'>
export interface HandleSkeletonAnimatedTimingOptions extends Pick<UseSkeletonAnimatedOptions, 'enableAnimated'> {
        animatedTiming: AnimatedTiming
}

export interface SkeletonComponent extends FC<SkeletonProps> {
        Circle: FC<SkeletonElementProps>
        Rectangular: FC<SkeletonElementProps>
        Square: FC<SkeletonElementProps>
}

export type SkeletonContainerProps = Pick<RenderSkeletonProps, 'width' | 'height' | 'containerLayout'> & {
        showChildren?: boolean
}
