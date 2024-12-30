import {Duration, Easing} from '@bearei/material-token'
import {RefAttributes} from 'react'
import {LayoutRectangle, StyleProp, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {AnimatedTiming, AnimatedTimingOptions, OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {ComponentStatus, ShapeProps} from '../Common'

export type LayoutAnimatedType = 'fade' | 'collapseX' | 'collapseY'
export interface LayoutAnimatedProps extends RefAttributes<View>, Omit<ViewProps, 'style'>, ShapeProps {
        animatedType?: LayoutAnimatedType
        defaultVisible?: boolean
        disabledAnimated?: boolean
        duration?: Duration
        easing?: Easing
        entry?: AnimatedTimingOptions
        exit?: AnimatedTimingOptions
        height?: number
        lazy?: boolean
        onUnmount?: () => void
        onVisible?: (value?: boolean) => void
        opacity?: number
        style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>> & StyleProp<ViewStyle>
        unmount?: boolean
        visible?: boolean
        width?: number
}

export interface RenderLayoutAnimatedProps extends LayoutAnimatedProps {
        containerAnimatedStyle: AnimatedStyle<ViewStyle>
        layout?: LayoutRectangle
        onStateEvent: OnStateEvent
        status?: ComponentStatus
        visible?: boolean
}

export interface LayoutAnimatedState {
        layout: LayoutRectangle
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
export interface HandleLayoutAnimatedStateChangeOptions extends OnStateEventChangeOptions {
        onLayoutChange: () => void
}

export interface UseLayoutAnimatedOptions
        extends Pick<
                LayoutAnimatedProps,
                | 'animatedType'
                | 'disabledAnimated'
                | 'entry'
                | 'exit'
                | 'height'
                | 'opacity'
                | 'unmount'
                | 'visible'
                | 'width'
        > {
        onAnimatedFinished: (value?: boolean) => void
        status: ComponentStatus
}

export type HandleLayoutAnimatedInitOptions = Pick<LayoutAnimatedProps, 'lazy' | 'unmount'>
export interface HandleLayoutAnimatedTimingOptions
        extends Pick<UseLayoutAnimatedOptions, 'onAnimatedFinished' | 'entry' | 'exit'> {
        animatedTiming: AnimatedTiming
}

export type LayoutAnimatedContentProps = Pick<RenderLayoutAnimatedProps, 'visible'>
export interface LayoutAnimatedContentInnerProps extends Pick<RenderLayoutAnimatedProps, 'visible'> {
        containerHeight?: number
}

export interface HandleLayoutAnimatedTimingSharedValue {
        collapseSharedValue: SharedValue<number>
        fadeSharedValue: SharedValue<number>
}

export interface HandleLayoutAnimatedLayoutVisibleDraftChangeOptions {
        height: number
        value?: boolean
        width: number
}

export type LayoutAnimatedContainerOptions = Pick<LayoutAnimatedProps, 'width' | 'height'>
