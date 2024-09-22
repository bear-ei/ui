import {TextStyle, ViewStyle} from 'react-native'
import {AnimatableValue, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {AnimatedTiming, OnStateEvent, OnStateEventChangeOptions} from '../../hook'
import {ComponentStatus, EventName} from '../Common'
import {ElevationLevel} from '../Elevation'
import {TouchableProps} from '../Touchable'

export type ButtonType = 'elevated' | 'filled' | 'link' | 'outlined' | 'text' | 'tonal'
export interface ButtonProps extends TouchableProps {
    densityScale?: number
    horizontalStretch?: boolean
    icon?: React.JSX.Element
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
    render: (props: RenderButtonProps) => React.JSX.Element
}

export interface InitialButtonState {
    elevation?: ElevationLevel
    eventName?: EventName
    status: ComponentStatus
}

export type ProcessButtonStateChangeOptions = OnStateEventChangeOptions & Pick<RenderButtonProps, 'type'>
export type RenderButtonIconOptions = Pick<RenderButtonProps, 'disabled' | 'type' | 'eventName'>
export type UseButtonAnimatedOptions = Pick<RenderButtonProps, 'disabled' | 'type' | 'eventName'>
export interface ProcessButtonAnimatedTimingOptions extends Omit<UseButtonAnimatedOptions, 'eventName'> {
    animatedTiming: AnimatedTiming
    borderColorInputRange: number[]
}

export interface ProcessButtonAnimatedTimingSharedValue {
    borderSharedValue: SharedValue<AnimatableValue>
    colorSharedValue: SharedValue<AnimatableValue>
}

export type ButtonContainerProps = Pick<RenderButtonProps, 'horizontalStretch' | 'densityScale' | 'type'>
export type ButtonContentProps = Pick<RenderButtonProps, 'type' | 'densityScale'>
export interface ButtonMainProps extends Pick<RenderButtonProps, 'type'> {
    iconShow: boolean
}
