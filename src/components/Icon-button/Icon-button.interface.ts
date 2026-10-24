import type {ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {EventName} from '../../constants'
import type {HandleInteractionStateChangeOptions, InteractionStateChangeHandler} from '../../hooks'
import type {ThemeableProps} from '../../theme'
import type {TouchableProps} from '../Touchable'
import type {ICON_BUTTON_TYPE} from './Icon-button.enum'

export type IconButtonType = (typeof ICON_BUTTON_TYPE)[keyof typeof ICON_BUTTON_TYPE]
export interface IconButtonProps extends TouchableProps, ThemeableProps {
	active?: boolean
	defaultActive?: boolean
	icon?: React.JSX.Element
	iconColor?: string
	labelText?: string

	/**
	 * Replaces the button content with a circular progress ring wrapping the icon.
	 * Use this for time-consuming actions with clear semantics (export, download, sync, AI processing…).
	 *
	 * The icon is preserved inside the ring — pass a status-specific icon
	 * (e.g., a "thinking" icon for AI analysis) to make the operation self-evident.
	 */
	loading?: boolean
	type?: IconButtonType
}

export interface RenderIconButtonProps extends IconButtonProps {
	backgroundUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
	eventName: EventName
	iconElement?: React.JSX.Element
	onInteractionStateChange: InteractionStateChangeHandler
}

export type IconButtonBaseProps = IconButtonProps
export interface IconButtonState {
	eventName: EventName
}

export type RenderIconButtonIconProps = Pick<
	RenderIconButtonProps,
	'disabled' | 'type' | 'iconColor' | 'id' | 'icon' | 'size'
>

export type HandleIconButtonInteractionStateChangeOptions = HandleInteractionStateChangeOptions
export type UseIconButtonAnimatedOptions = Pick<RenderIconButtonProps, 'disabled' | 'type'>
export type AnimateIconButtonOptions = Pick<UseIconButtonAnimatedOptions, 'type'>
