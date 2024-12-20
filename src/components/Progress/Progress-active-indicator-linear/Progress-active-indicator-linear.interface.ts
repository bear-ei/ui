import {RefAttributes} from 'react'
import {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'

export interface ProgressActiveIndicatorLinearProps extends ViewProps, RefAttributes<View> {
        containerLayout: LayoutRectangle
        increment?: number
        defaultValue?: number
        value?: number
}

export interface RenderProgressActiveIndicatorLinearProps
        extends Omit<ProgressActiveIndicatorLinearProps, 'containerLayout'> {
        containerAnimatedStyle: AnimatedStyle<ViewStyle>
}

export interface ProgressActiveIndicatorLinearBaseProps extends ProgressActiveIndicatorLinearProps {
        render: (props: RenderProgressActiveIndicatorLinearProps) => JSX.Element
}

export type UseProgressActiveIndicatorLinearAnimatedOptions = Pick<
        ProgressActiveIndicatorLinearProps,
        'increment' | 'defaultValue' | 'value' | 'containerLayout'
>
