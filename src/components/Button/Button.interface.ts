import type {TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {AnimatedTiming, HandleStateEventChangeOptions, InteractionHandlers} from '../../hooks'
import type {CommonProps, ComponentStatus, EventName} from '../Common'
import type {ElevationLevel} from '../Elevation'
import type {TouchableProps} from '../Touchable'
import type {BUTTON_TYPE} from './Button.enum'

export type ButtonType = (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE]
export interface ButtonProps extends TouchableProps, CommonProps {
	error?: boolean
	icon?: React.JSX.Element
	labelText?: string
	loading?: boolean
	type?: ButtonType
}

export interface RenderButtonProps extends ButtonProps {
	backgroundUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
	elevation?: ElevationLevel
	eventName?: EventName
	labelTextAnimatedStyle: AnimatedStyle<TextStyle>
	interactionHandlers: InteractionHandlers
}

export interface ButtonBaseProps extends ButtonProps {
	renderButton: (props: RenderButtonProps) => React.JSX.Element
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
	borderColorInputRanges: number[]
}

export interface HandleButtonAnimatedTimingSharedValue {
	borderSharedValue: SharedValue<number>
	colorSharedValue: SharedValue<number>
}

export type ButtonContainerProps = Pick<RenderButtonProps, 'type'>
export type ButtonContentProps = Pick<RenderButtonProps, 'type' | 'density'>
export interface ButtonMainProps extends Pick<RenderButtonProps, 'type'> {
	iconShow: boolean
}
