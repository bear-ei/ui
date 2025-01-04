import {Duration, Easing} from '@bearei/material-token'
import {RefAttributes} from 'react'
import {LayoutChangeEvent, LayoutRectangle, StyleProp, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {Updater} from 'use-immer'
import {AnimatedTiming, AnimatedTimingOptions, OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {ComponentStatus, ShapeProps} from '../Common'

export type LayoutAnimatedType = 'fade' | 'collapseX' | 'collapseY' | 'scale'
export interface LayoutAnimatedProps extends RefAttributes<View>, Omit<ViewProps, 'style'>, ShapeProps {
        animatedType?: LayoutAnimatedType
        defaultVisible?: boolean
        disabledAnimated?: boolean
        duration?: Duration
        easing?: Easing
        entry?: AnimatedTimingOptions
        exit?: AnimatedTimingOptions
        height?: number
        hidden?: boolean
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
        onStateEvent: OnStateEvent
        status?: ComponentStatus
        visible?: boolean
}

export interface LayoutAnimatedState {
        layout: LayoutRectangle
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
export interface HandleLayoutAnimatedStateChangeOptions extends OnStateEventChangeOptions {
        onLayoutChange: (event: LayoutChangeEvent) => void
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

export type HandleLayoutAnimatedStatusOptions = Pick<LayoutAnimatedProps, 'lazy' | 'unmount'>
export interface HandleLayoutAnimatedTimingOptions
        extends Pick<UseLayoutAnimatedOptions, 'onAnimatedFinished' | 'entry' | 'exit'> {
        animatedTiming: AnimatedTiming
}

export type LayoutAnimatedContentProps = Pick<RenderLayoutAnimatedProps, 'visible'>
export interface LayoutAnimatedContentInnerProps {
        height?: number
        width?: number
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

export interface HandleLayoutAnimatedLayoutVisibleOptions extends Pick<LayoutAnimatedProps, 'animatedType'> {
        setState: Updater<LayoutAnimatedState>
}

export type LayoutAnimatedContainerProps = Pick<LayoutAnimatedProps, 'visible' | 'hidden'>
