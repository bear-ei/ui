import {RefAttributes} from 'react'
import {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'

export interface ProgressActiveIndicatorProps extends ViewProps, RefAttributes<View> {
    containerLayout: LayoutRectangle
    increment?: number
    defaultValue?: number
    value?: number
}

export interface RenderProgressActiveIndicatorProps extends Omit<ProgressActiveIndicatorProps, 'containerLayout'> {
    containerAnimatedStyle: AnimatedStyle<ViewStyle>
}

export interface ProgressActiveIndicatorBaseProps extends ProgressActiveIndicatorProps {
    render: (props: RenderProgressActiveIndicatorProps) => React.JSX.Element
}

export type UseProgressActiveIndicatorAnimatedOptions = Pick<
    ProgressActiveIndicatorProps,
    'increment' | 'defaultValue' | 'value' | 'containerLayout'
>
