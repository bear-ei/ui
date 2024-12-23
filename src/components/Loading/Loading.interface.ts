import {RefAttributes} from 'react'
import {View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {ShapeProps} from '../Common'

export interface LoadingProps extends ViewProps, RefAttributes<View>, ShapeProps {
        content?: JSX.Element
        height?: number
        width?: number
}

export interface RenderLoadingProps extends LoadingProps {
        containerAnimatedStyle: AnimatedStyle<ViewStyle>
        rippleAnimatedStyle: AnimatedStyle<ViewStyle>
        theme: DefaultTheme
}

export interface LoadingBaseProps extends LoadingProps {
        render: (props: RenderLoadingProps) => JSX.Element
}

export interface HandleLoadingAnimatedTimingOptions {
        containerSharedValue: SharedValue<number>
        rippleSharedValue: SharedValue<number>
}

export type LoadingContainerProps = Pick<LoadingProps, 'height' | 'width'>
