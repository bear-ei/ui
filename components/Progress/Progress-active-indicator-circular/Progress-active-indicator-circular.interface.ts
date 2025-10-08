import {ComponentStatus, ShapeProps} from '@/constants'
import {InteractionHandlers} from '@/hooks'
import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedProps, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {CircleProps} from 'react-native-svg'
import type {ProgressProps} from '../Progress.interface'

export interface ProgressActiveIndicatorCircularProps
        extends ViewProps,
                RefAttributes<View>,
                ShapeProps,
                Pick<
                        ProgressProps,
                        'animatedType' | 'value' | 'defaultValue' | 'strokeWidth' | 'size' | 'enableAnimated'
                > {
        content?: React.JSX.Element
}

export interface ProgressActiveIndicatorCircularState {
        status: ComponentStatus
}

export interface RenderProgressActiveIndicatorCircularProps extends ProgressActiveIndicatorCircularProps {
        circleAnimatedProps: AnimatedProps<CircleProps>['animatedProps']
        circumference: number
        containerAnimatedStyle: AnimatedStyle<ViewStyle>
        interactionHandlers: InteractionHandlers
        radius: number
        strokeWidth: number
}

export type ProgressActiveIndicatorCircularBaseProps = ProgressActiveIndicatorCircularProps
export interface UseProgressActiveIndicatorCircularAnimatedOptions
        extends Pick<RenderProgressActiveIndicatorCircularProps, 'circumference' | 'enableAnimated'> {
        status: ComponentStatus
}

export interface AnimateProgressActiveIndicatorCircularSharedValues {
        circleSharedValue: SharedValue<number>
        containerSharedValue: SharedValue<number>
}
