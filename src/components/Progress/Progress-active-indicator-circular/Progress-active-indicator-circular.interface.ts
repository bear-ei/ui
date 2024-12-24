import {RefAttributes} from 'react'
import {View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {ShapeProps} from '../../Common'

export interface ProgressActiveIndicatorCircularProps extends ViewProps, RefAttributes<View>, ShapeProps {
        content?: JSX.Element
        height?: number
        width?: number
}

export interface RenderProgressActiveIndicatorCircularProps extends ProgressActiveIndicatorCircularProps {
        iconAnimatedStyle: AnimatedStyle<ViewStyle>
        theme: DefaultTheme
}

export interface ProgressActiveIndicatorCircularBaseProps extends ProgressActiveIndicatorCircularProps {
        render: (props: RenderProgressActiveIndicatorCircularProps) => JSX.Element
}
