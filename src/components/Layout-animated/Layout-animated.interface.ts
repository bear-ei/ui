import {Duration, Easing} from '@bearei/material-token'
import {RefAttributes} from 'react'
import {View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {AnimatedTiming, AnimatedTimingOptions, OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {ComponentStatus, ShapeProps} from '../Common'

export interface LayoutAnimatedProps extends RefAttributes<View>, ViewProps, ShapeProps {
        defaultVisible?: boolean
        duration?: Duration
        easing?: Easing
        entry?: AnimatedTimingOptions
        exit?: AnimatedTimingOptions
        hidden?: boolean
        onUnmount?: () => void
        onVisible?: (value?: boolean) => void
        opacity?: number
        unmount?: boolean
        visible?: boolean
}

export interface RenderLayoutAnimatedProps extends LayoutAnimatedProps {
        containerAnimatedStyle: AnimatedStyle<ViewStyle>
        onStateEvent: OnStateEvent
        visible?: boolean
}

export interface LayoutAnimatedState {
        layoutVisible?: boolean
        layoutWasVisible?: boolean
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
        extends Pick<LayoutAnimatedProps, 'visible' | 'unmount' | 'entry' | 'exit' | 'opacity'> {
        onAnimatedFinished: (value?: boolean) => void
}

export interface HandleLayoutAnimatedTimingOptions
        extends Pick<UseLayoutAnimatedOptions, 'onAnimatedFinished' | 'entry' | 'exit'> {
        animatedTiming: AnimatedTiming
}

export type LayoutAnimatedContainerProps = Pick<RenderLayoutAnimatedProps, 'visible' | 'hidden'>
export type LayoutAnimatedContentProps = LayoutAnimatedContainerProps
