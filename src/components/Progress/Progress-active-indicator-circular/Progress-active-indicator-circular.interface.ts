import {RefAttributes} from 'react'
import {View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedProps, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {CircleProps} from 'react-native-svg'
import {DefaultTheme} from 'styled-components/native'
import {ShapeProps} from '../../Common'
import {ProgressProps} from '../Progress.interface'

export interface ProgressActiveIndicatorCircularProps
        extends ViewProps,
                RefAttributes<View>,
                ShapeProps,
                Pick<ProgressProps, 'animatedType' | 'value' | 'increment' | 'defaultValue' | 'strokeWidth'> {
        content?: JSX.Element
        size?: number
}

export interface RenderProgressActiveIndicatorCircularProps extends ProgressActiveIndicatorCircularProps {
        circleAnimatedProps: AnimatedProps<CircleProps>['animatedProps']
        circumference: number
        containerAnimatedStyle: AnimatedStyle<ViewStyle>
        radius: number
        strokeWidth: number
        theme: DefaultTheme
}

export interface ProgressActiveIndicatorCircularBaseProps extends ProgressActiveIndicatorCircularProps {
        render: (props: RenderProgressActiveIndicatorCircularProps) => JSX.Element
}

export type UseProgressActiveIndicatorCircularAnimatedOptions = Pick<
        RenderProgressActiveIndicatorCircularProps,
        'circumference'
>

export interface HandleProgressActiveIndicatorCircularAnimatedTimingOptions {
        containerSharedValue: SharedValue<number>
        circleSharedValue: SharedValue<number>
}
