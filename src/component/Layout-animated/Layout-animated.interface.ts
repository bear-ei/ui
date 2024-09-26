import {Duration, Easing} from '@bearei/material-token'
import {RefAttributes} from 'react'
import {View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {AnimatedTiming, AnimatedTimingOptions, OnStateEvent, OnStateEventChangeOptions} from '../../hook'
import {ComponentStatus, ShapeProps} from '../Common'

export interface LayoutAnimatedProps extends RefAttributes<View>, ViewProps, ShapeProps {
    defaultVisible?: boolean
    duration?: Duration
    easing?: Easing
    entry?: AnimatedTimingOptions
    exit?: AnimatedTimingOptions
    onUnmount?: () => void
    onVisible?: (value?: boolean) => void
    unmount?: boolean
    visible?: boolean
}

export interface RenderLayoutAnimatedProps extends LayoutAnimatedProps {
    onStateEvent: OnStateEvent
    containerAnimatedStyle: AnimatedStyle<ViewStyle>
    visible?: boolean
}

export interface InitialLayoutAnimatedState {
    layoutVisible?: boolean
    layoutWasVisible?: boolean
    nextUnmountCallback?: () => void
    nextVisibleCallback?: () => void
    unmountLayout?: boolean
    status: ComponentStatus
}

export interface LayoutAnimatedBaseProps extends LayoutAnimatedProps {
    render: (props: RenderLayoutAnimatedProps) => React.JSX.Element
}

export type HandleLayoutAnimatedStateChangeOptions = OnStateEventChangeOptions & Pick<LayoutAnimatedProps, 'visible'>
export type HandleLayoutAnimatedFinishedOptions = Pick<RenderLayoutAnimatedProps, 'onUnmount' | 'unmount' | 'onVisible'>
export interface UseLayoutAnimatedOptions extends Pick<LayoutAnimatedProps, 'visible' | 'unmount' | 'entry' | 'exit'> {
    onAnimatedFinished: (value?: boolean) => void
}

export interface HandleLayoutAnimatedTimingOptions
    extends Pick<UseLayoutAnimatedOptions, 'onAnimatedFinished' | 'entry' | 'exit'> {
    animatedTiming: AnimatedTiming
}

export type LayoutAnimatedContainer = Pick<RenderLayoutAnimatedProps, 'visible'>
