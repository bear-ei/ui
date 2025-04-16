import type {ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {DefaultTheme} from 'styled-components/native'
import type {AnimatedTiming, HandleStateEventChangeOptions, InteractionHandlers} from '../../hooks'
import type {CommonProps, EventName} from '../Common'
import type {TouchableProps} from '../Touchable'
import type {ICON_BUTTON_TYPE} from './Icon-button.enum'

export type IconButtonType = (typeof ICON_BUTTON_TYPE)[keyof typeof ICON_BUTTON_TYPE]
export interface IconButtonProps extends TouchableProps, CommonProps {
	active?: boolean
	defaultActive?: boolean
	fill?: string
	icon?: React.JSX.Element
	loading?: boolean
	size?: number
	type?: IconButtonType
}

export interface RenderIconButtonProps extends IconButtonProps {
	backgroundUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
	eventName?: EventName
	interactionHandlers: InteractionHandlers
	theme: DefaultTheme
}

export interface IconButtonBaseProps extends IconButtonProps {
	render: (props: RenderIconButtonProps) => React.JSX.Element
}

export interface IconButtonState {
	eventName?: EventName
}

export interface RenderIconButtonIconOptions
	extends Pick<RenderIconButtonProps, 'disabled' | 'type' | 'fill' | 'loading' | 'id'> {
	eventName?: EventName
}

export type HandleIconButtonStateChangeOptions = HandleStateEventChangeOptions
export type UseIconButtonAnimatedOptions = Pick<RenderIconButtonProps, 'disabled' | 'type'>
export interface HandleIconButtonAnimatedTimingOptions extends Pick<UseIconButtonAnimatedOptions, 'type'> {
	animatedTiming: AnimatedTiming
}

export interface HandleIconButtonAnimatedTimingSharedValue {
	borderSharedValue: SharedValue<number>
	colorSharedValue: SharedValue<number>
}

export type IconButtonContentProps = Pick<IconButtonProps, 'size' | 'density'>
