import {FC, RefAttributes} from 'react'
import {View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {AnimatedTiming, OnStateEvent, OnStateEventChangeOptions} from '../../hook'
import {ComponentStatus} from '../Common'
import {SkeletonElementProps} from './Skeleton-element'

export interface SkeletonProps extends ViewProps, RefAttributes<View>, Pick<SkeletonElementProps, 'containerLayout'> {
    content?: React.ReactNode
    duration?: number
    enableAnimated?: boolean
    height?: number
    width?: number
}

export interface RenderSkeletonProps extends SkeletonProps {
    animatedStyle: AnimatedStyle<ViewStyle>
    onStateEvent: OnStateEvent
    skeletonVisible?: boolean
    status: ComponentStatus
}

export interface SkeletonBaseProps extends SkeletonProps {
    render: (props: RenderSkeletonProps) => React.JSX.Element
}

export interface InitialSkeletonState {
    skeletonVisible: boolean
    status: ComponentStatus
}

export type ProcessSkeletonStateChangeOptions = OnStateEventChangeOptions & Pick<SkeletonProps, 'duration'>
export type UseSkeletonAnimatedOptions = Pick<RenderSkeletonProps, 'enableAnimated'> &
    Pick<InitialSkeletonState, 'skeletonVisible'>

export interface ProcessSkeletonAnimatedTimingOptions extends Pick<UseSkeletonAnimatedOptions, 'enableAnimated'> {
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
