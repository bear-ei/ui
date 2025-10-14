import {ComponentStatus} from '@/constants'
import {InteractionHandlers} from '@/hooks'
import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {ProgressProps} from '../Progress.interface'

export interface ProgressActiveIndicatorLinearProps
        extends ViewProps,
                RefAttributes<View>,
                Pick<ProgressProps, 'animatedType' | 'value' | 'defaultValue'> {}

export interface RenderProgressActiveIndicatorLinearProps extends ProgressActiveIndicatorLinearProps {
        contentAnimatedStyle: AnimatedStyle<ViewStyle>
        interactionHandlers: InteractionHandlers
}

export interface ProgressActiveIndicatorLinearState {
        status: ComponentStatus
}

export type ProgressActiveIndicatorLinearBaseProps = ProgressActiveIndicatorLinearProps
export interface UseProgressActiveIndicatorLinearAnimatedOptions
        extends Pick<ProgressActiveIndicatorLinearProps, 'defaultValue' | 'value'> {
        status: ComponentStatus
}
