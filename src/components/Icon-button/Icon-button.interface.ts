import type {ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {CommonProps, EventName} from '../../constants'
import type {
	AnimatedTimingOptions,
	AnimateSharedValueTo,
	HandleStateEventChangeOptions,
	InteractionHandlers
} from '../../hooks'
import type {TouchableProps} from '../Touchable'
import type {ICON_BUTTON_TYPE} from './Icon-button.enum'

export type IconButtonType = (typeof ICON_BUTTON_TYPE)[keyof typeof ICON_BUTTON_TYPE]
export interface IconButtonProps extends TouchableProps, CommonProps {
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
	eventName?: EventName
	iconElement?: React.JSX.Element
	interactionHandlers: InteractionHandlers
}

export type IconButtonBaseProps = IconButtonProps
export interface IconButtonState {
	eventName?: EventName
}

export type RenderIconButtonIconProps = Pick<
	RenderIconButtonProps,
	'disabled' | 'type' | 'iconColor' | 'id' | 'icon' | 'size'
>

export type HandleIconButtonStateChangeOptions = HandleStateEventChangeOptions
export type UseIconButtonAnimatedOptions = Pick<RenderIconButtonProps, 'disabled' | 'type'>
export interface AnimateIconButtonOptions extends Pick<UseIconButtonAnimatedOptions, 'type'> {
	animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo
}

export interface AnimateIconButtonSharedValues {
	borderSharedValue: SharedValue<number>
	colorSharedValue: SharedValue<number>
}
