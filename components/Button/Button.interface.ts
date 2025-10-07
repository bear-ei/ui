import {CommonProps, ComponentStatus, EventName} from '@/constants'
import {AnimateSharedValueTo, HandleStateEventChangeOptions, InteractionHandlers} from '@/hooks'
import type {TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {ElevationLevel} from '../Elevation'
import type {LayoutAnimatedProps} from '../Layout-animated'
import type {TouchableProps} from '../Touchable'
import type {BUTTON_TYPE} from './Button.enum'

export type ButtonType = (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE]
export interface ButtonProps extends TouchableProps, CommonProps {
        error?: boolean
        icon?: React.JSX.Element
        labelText?: string
        linkColor?: string
        loading?: boolean
        type?: ButtonType
}

export interface RenderButtonProps extends ButtonProps {
        backgroundUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
        elevation?: ElevationLevel
        eventName?: EventName
        iconElement?: React.JSX.Element
        interactionHandlers: InteractionHandlers
        labelTextAnimatedStyle: AnimatedStyle<TextStyle>
}

export type ButtonBaseProps = ButtonProps
export interface ButtonState {
        elevation?: ElevationLevel
        eventName?: EventName
        status: ComponentStatus
}

export type HandleButtonStateChangeOptions = HandleStateEventChangeOptions & Pick<RenderButtonProps, 'type'>
export type RenderButtonIconProps = Pick<RenderButtonProps, 'disabled' | 'type' | 'id' | 'icon'>
export type UseButtonAnimatedOptions = Pick<
        RenderButtonProps,
        'disabled' | 'type' | 'eventName' | 'error' | 'linkColor'
>

export interface AnimateButtonOptions extends Omit<UseButtonAnimatedOptions, 'eventName'> {
        animateSharedValueTo: AnimateSharedValueTo
        borderColorInputRanges: number[]
}

export interface AnimateButtonSharedValues {
        borderSharedValue: SharedValue<number>
        colorSharedValue: SharedValue<number>
}

export type ButtonContainerProps = Pick<RenderButtonProps, 'type'>
export type ButtonContentProps = Pick<RenderButtonProps, 'type'>
export interface ButtonMainProps extends Pick<RenderButtonProps, 'type'> {
        iconShow: boolean
}

export interface ActiveIndicatorLayoutProps extends LayoutAnimatedProps, Pick<ButtonProps, 'linkColor'> {}
