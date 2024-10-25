import {RefObject} from 'react'
import {TextStyle, View, ViewStyle} from 'react-native'
import {AnimatableValue, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {AnimatedTiming, OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {ComponentStatus, EventName} from '../Common'
import {ElevationLevel} from '../Elevation'
import {TouchableProps} from '../Touchable'

export type ButtonType = 'elevated' | 'filled' | 'link' | 'outlined' | 'text' | 'tonal'
export interface ButtonProps extends TouchableProps {
        icon?: JSX.Element
        labelText?: string
        loading?: boolean
        type?: ButtonType
}

export interface RenderButtonProps extends ButtonProps {
        contentUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
        elevation: ElevationLevel
        eventName?: EventName
        labelTextAnimatedStyle: AnimatedStyle<TextStyle>
        onStateEvent: OnStateEvent
}

export interface ButtonBaseProps extends ButtonProps {
        render: (props: RenderButtonProps) => JSX.Element
}

export interface ButtonState {
        elevation?: ElevationLevel
        eventName?: EventName
        nextPressInEvent?: () => void
        status: ComponentStatus
}

export interface HandleButtonStateChangeOptions extends OnStateEventChangeOptions, Pick<RenderButtonProps, 'type'> {
        touchableRef: RefObject<View>
}

export type RenderButtonIconOptions = Pick<RenderButtonProps, 'disabled' | 'type' | 'eventName'>
export type UseButtonAnimatedOptions = Pick<RenderButtonProps, 'disabled' | 'type' | 'eventName'>
export interface HandleButtonAnimatedTimingOptions extends Omit<UseButtonAnimatedOptions, 'eventName'> {
        animatedTiming: AnimatedTiming
        borderColorInputRange: number[]
}

export interface HandleButtonAnimatedTimingSharedValue {
        borderSharedValue: SharedValue<AnimatableValue>
        colorSharedValue: SharedValue<AnimatableValue>
}

export type ButtonContainerProps = Pick<RenderButtonProps, 'type'>
export type ButtonContentProps = Pick<RenderButtonProps, 'type'>
export interface ButtonMainProps extends Pick<RenderButtonProps, 'type'> {
        iconShow: boolean
}
