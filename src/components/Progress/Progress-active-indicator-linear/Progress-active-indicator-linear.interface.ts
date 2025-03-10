import {RefAttributes} from 'react'
import {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {ProgressProps} from '../Progress.interface'

export interface ProgressActiveIndicatorLinearProps
        extends ViewProps,
                RefAttributes<View>,
                Pick<ProgressProps, 'animatedType' | 'value' | 'increment' | 'defaultValue'> {
        containerLayout: LayoutRectangle
}

export interface RenderProgressActiveIndicatorLinearProps
        extends Omit<ProgressActiveIndicatorLinearProps, 'containerLayout'> {
        contentAnimatedStyle: AnimatedStyle<ViewStyle>
}

export interface ProgressActiveIndicatorLinearBaseProps extends ProgressActiveIndicatorLinearProps {
        render: (props: RenderProgressActiveIndicatorLinearProps) => React.JSX.Element
}

export type UseProgressActiveIndicatorLinearAnimatedOptions = Pick<
        ProgressActiveIndicatorLinearProps,
        'increment' | 'defaultValue' | 'value' | 'containerLayout'
>
