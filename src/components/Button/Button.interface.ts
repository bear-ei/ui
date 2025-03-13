import {TextStyle, ViewStyle} from 'react-native'
import {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {AnimatedTiming, HandleStateEventChangeOptions, StateOnEvent} from '../../hooks'
import {ComponentStatus, EventName} from '../Common'
import {ElevationLevel} from '../Elevation'
import {TouchableProps} from '../Touchable'

export type ButtonType = 'elevated' | 'filled' | 'link' | 'outlined' | 'text' | 'tonal'
export interface ButtonProps extends TouchableProps {
        error?: boolean
        icon?: React.JSX.Element
        labelText?: string
        loading?: boolean
        type?: ButtonType
}

export interface RenderButtonProps extends ButtonProps {
        backgroundUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
        elevation: ElevationLevel
        eventName?: EventName
        labelTextAnimatedStyle: AnimatedStyle<TextStyle>
        stateOnEvent: StateOnEvent
}

export interface ButtonBaseProps extends ButtonProps {
        render: (props: RenderButtonProps) => React.JSX.Element
}

export interface ButtonState {
        elevation?: ElevationLevel
        eventName?: EventName
        status: ComponentStatus
}

export type HandleButtonStateChangeOptions = HandleStateEventChangeOptions & Pick<RenderButtonProps, 'type'>
export type RenderButtonIconOptions = Pick<RenderButtonProps, 'disabled' | 'type' | 'eventName' | 'id'>
export type UseButtonAnimatedOptions = Pick<RenderButtonProps, 'disabled' | 'type' | 'eventName' | 'error'>
export interface HandleButtonAnimatedTimingOptions extends Omit<UseButtonAnimatedOptions, 'eventName'> {
        animatedTiming: AnimatedTiming
        borderColorInputRange: number[]
}

export interface HandleButtonAnimatedTimingSharedValue {
        borderSharedValue: SharedValue<number>
        colorSharedValue: SharedValue<number>
}

export type ButtonContainerProps = Pick<RenderButtonProps, 'type'>
export type ButtonContentProps = Pick<RenderButtonProps, 'type'>
export interface ButtonMainProps extends Pick<RenderButtonProps, 'type'> {
        iconShow: boolean
}
