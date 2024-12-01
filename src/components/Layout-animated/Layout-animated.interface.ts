import {Duration, Easing} from '@bearei/material-token'
import {RefAttributes} from 'react'
import {View, ViewProps, ViewStyle} from 'react-native'
import {AnimatableValue, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {AnimatedTiming, AnimatedTimingOptions, OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {ComponentStatus, ShapeProps} from '../Common'

export type LayoutAnimatedType = 'fade' | 'collapse'
export interface LayoutAnimatedProps extends RefAttributes<View>, ViewProps, ShapeProps {
        animatedType?: LayoutAnimatedType
        defaultVisible?: boolean
        duration?: Duration
        easing?: Easing
        entry?: AnimatedTimingOptions
        exit?: AnimatedTimingOptions
        hidden?: boolean
        lazy?: boolean
        onUnmount?: () => void
        onVisible?: (value?: boolean) => void
        opacity?: number
        unmount?: boolean
        visible?: boolean
        width?: number
}

export interface RenderLayoutAnimatedProps extends LayoutAnimatedProps {
        animatedStyle: AnimatedStyle<ViewStyle>
        onStateEvent: OnStateEvent
        status?: ComponentStatus
        visible?: boolean
}

export interface LayoutAnimatedState {
        layoutVisible?: boolean
        layoutWasVisible?: boolean
        nextStatusEvent?: () => void
        nextUnmountEvent?: () => void
        nextVisibleEvent?: () => void
        status: ComponentStatus
        unmountLayout?: boolean
}

export interface LayoutAnimatedBaseProps extends LayoutAnimatedProps {
        render: (props: RenderLayoutAnimatedProps) => JSX.Element
}

export type HandleLayoutAnimatedFinishedOptions = Pick<RenderLayoutAnimatedProps, 'onUnmount' | 'unmount' | 'onVisible'>
export type HandleLayoutAnimatedStateChangeOptions = OnStateEventChangeOptions & Pick<LayoutAnimatedProps, 'visible'>
export interface UseLayoutAnimatedOptions
        extends Pick<
                LayoutAnimatedProps,
                'visible' | 'unmount' | 'entry' | 'exit' | 'opacity' | 'animatedType' | 'width'
        > {
        onAnimatedFinished: (value?: boolean) => void
}

export type HandleLayoutAnimatedInitOptions = Pick<LayoutAnimatedProps, 'lazy' | 'unmount'>
export interface HandleLayoutAnimatedTimingOptions
        extends Pick<UseLayoutAnimatedOptions, 'onAnimatedFinished' | 'entry' | 'exit' | 'animatedType'> {
        animatedTiming: AnimatedTiming
}

export type LayoutAnimatedContainerProps = Pick<RenderLayoutAnimatedProps, 'visible' | 'hidden'>
export type LayoutAnimatedContentProps = LayoutAnimatedContainerProps

export interface HandleLayoutAnimatedTimingSharedValue {
        opacitySharedValue: SharedValue<AnimatableValue>
        widthSharedValue: SharedValue<AnimatableValue>
}
