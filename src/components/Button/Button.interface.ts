import type {TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus, EventName} from '../../constants'
import type {HandleInteractionStateChangeOptions, InteractionStateChangeHandler} from '../../hooks'
import type {ThemeableProps} from '../../theme'
import type {ElevationValue} from '../Elevation'
import type {TouchableProps} from '../Touchable'
import type {BUTTON_TYPE} from './Button.enum'

export type ButtonType = (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE]
export interface ButtonProps extends TouchableProps, ThemeableProps {
	error?: boolean
	icon?: React.JSX.Element
	labelText?: string
	linkColor?: string
	loading?: boolean
	stretch?: boolean
	type?: ButtonType
}

export interface RenderButtonProps extends ButtonProps, Pick<ButtonState, 'status'> {
	backgroundUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
	elevation?: ElevationValue
	eventName: EventName
	iconElement?: React.JSX.Element
	labelTextAnimatedStyle: AnimatedStyle<TextStyle>
	onInteractionStateChange: InteractionStateChangeHandler
}

export type ButtonBaseProps = ButtonProps
export interface ButtonState {
	elevation?: ElevationValue
	eventName: EventName
	status: ComponentStatus
}

export type HandleButtonInteractionStateChangeOptions = HandleInteractionStateChangeOptions &
	Pick<RenderButtonProps, 'type'>
export type RenderButtonIconProps = Pick<RenderButtonProps, 'disabled' | 'type' | 'id' | 'icon' | 'size'>
export type UseButtonAnimatedOptions = Pick<
	RenderButtonProps,
	'disabled' | 'type' | 'eventName' | 'error' | 'linkColor'
>

export interface AnimateButtonOptions extends Omit<UseButtonAnimatedOptions, 'eventName'> {
	borderColorInputRanges: number[]
}
