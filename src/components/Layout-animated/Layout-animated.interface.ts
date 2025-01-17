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

        /**
         * Whether or not to enable scale effects in collapse type animations
         */
        scale?: boolean

        /**
         * [macOS compatible, Only fade type animations]
         *
         * Used in non-collapse animations to control whether or not elements are hidden on the layout after being
         * invisible.  On macOS, if you don't hide an element, there may be unexpected mouseover removal and mouse style
         * anomalies
         */
        hidden?: boolean
        lazy?: boolean
        onUnmount?: () => void
        onVisible?: (value?: boolean) => void
        opacity?: number
        style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>> & StyleProp<ViewStyle>
        unmount?: boolean
        visible?: boolean
        contentStyle?: ViewStyle
}

export interface RenderLayoutAnimatedProps extends LayoutAnimatedProps {
        containerAnimatedStyle?: AnimatedStyle<ViewStyle>
        layout: LayoutRectangle
        onStateEvent: OnStateEvent
        visible?: boolean
}

export interface LayoutAnimatedState {
        invisible?: boolean
        layout: LayoutRectangle
        nextUnmountEvent?: () => void
        nextVisibleEvent?: () => void
        status: ComponentStatus
        unmountLayout?: boolean
        visible?: boolean
}

export interface LayoutAnimatedBaseProps extends LayoutAnimatedProps {
        render: (props: RenderLayoutAnimatedProps) => JSX.Element
}

export type HandleLayoutAnimatedFinishedOptions = Pick<RenderLayoutAnimatedProps, 'onUnmount' | 'unmount'>
export interface HandleLayoutAnimatedStateChangeOptions extends OnStateEventChangeOptions {
        onLayoutChange: (event: LayoutChangeEvent) => void
}

export interface UseLayoutAnimatedOptions
        extends Pick<
                LayoutAnimatedProps,
                'animatedType' | 'disabledAnimated' | 'entry' | 'exit' | 'opacity' | 'scale' | 'unmount' | 'visible'
        > {
        onAnimatedFinished: (value?: boolean) => void
        height?: number
        width?: number
}

export type HandleLayoutAnimatedStatusOptions = Pick<LayoutAnimatedProps, 'lazy' | 'unmount'>
export interface HandleLayoutAnimatedTimingOptions
        extends Pick<UseLayoutAnimatedOptions, 'onAnimatedFinished' | 'entry' | 'exit'> {
        animatedTiming: AnimatedTiming
}

export type LayoutAnimatedContentProps = Pick<RenderLayoutAnimatedProps, 'visible'>
export interface HandleLayoutAnimatedTimingSharedValue {
        collapseSharedValue: SharedValue<number>
        fadeSharedValue: SharedValue<number>
}

export interface HandleLayoutAnimatedLayoutVisibleOptions extends Pick<LayoutAnimatedProps, 'onVisible'> {
        setState: Updater<LayoutAnimatedState>
}

export interface LayoutAnimatedContainerProps extends Pick<LayoutAnimatedProps, 'visible' | 'hidden'> {
        collapse?: boolean
}

export type LayoutAnimatedContentLayoutProps = Pick<RenderLayoutAnimatedProps, 'layout'>

export type HandleLayoutAnimatedLayoutChangeOptions = Pick<LayoutAnimatedProps, 'hidden' | 'animatedType'>
