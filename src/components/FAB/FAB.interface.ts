import type {TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus, EventName} from '../../constants'
import type {HandleInteractionStateChangeOptions, InteractionStateChangeHandler} from '../../hooks'
import type {ThemeableProps} from '../../theme'
import type {ElevationValue} from '../Elevation'
import type {TouchableProps} from '../Touchable'
import type {FAB_TYPE} from './FAB.enum'

export type FABType = (typeof FAB_TYPE)[keyof typeof FAB_TYPE]
export interface FABProps extends TouchableProps, ThemeableProps {
	disabled?: boolean
	elevated?: boolean
	icon?: React.JSX.Element
	labelText?: string
	loading?: boolean
	type?: FABType
}

export interface RenderFABProps extends FABProps, Pick<FABState, 'status'> {
	backgroundUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
	elevation?: ElevationValue
	eventName?: EventName
	extended?: boolean
	iconElement?: React.JSX.Element
	labelTextAnimatedStyle: AnimatedStyle<TextStyle>
	onInteractionStateChange: InteractionStateChangeHandler
}

export type FABBaseProps = FABProps
export interface FABState {
	elevation?: ElevationValue
	eventName?: EventName
	status: ComponentStatus
}

export type HandleFABInteractionStateChangeOptions = HandleInteractionStateChangeOptions &
	Pick<RenderFABProps, 'elevated'>
export type RenderFABIconProps = Pick<RenderFABProps, 'size' | 'disabled' | 'type' | 'id' | 'icon' | 'extended'>
export type UseFABAnimatedOptions = Pick<RenderFABProps, 'disabled' | 'type'>
