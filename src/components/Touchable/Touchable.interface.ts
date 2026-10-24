import type {RefAttributes} from 'react'
import type {NativeTouchEvent, Pressable, PressableProps, View, ViewStyle} from 'react-native'

import type {MeasuredLayoutRectangle, InteractionState} from '../../constants'
import type {HandleInteractionStateChangeOptions, InteractionHandlers, InteractionStateChangeHandler} from '../../hooks'
import type {ThemeableProps} from '../../theme'
import type {TouchableRippleProps} from './Touchable-ripple'

export type PressableType = typeof Pressable & View
export interface TouchableProps
	extends
		Omit<
			PressableProps & RefAttributes<PressableType> & InteractionHandlers,
			'children' | 'disabled' | 'hitSlop' | 'style'
		>,
		ThemeableProps {
	backgroundUnderlay?: React.JSX.Element
	children?: React.JSX.Element
	disabled?: boolean
	elevationUnderlay?: React.JSX.Element
	enableTouchableRipple?: boolean
	onInteractionStateChange?: InteractionStateChangeHandler
	rippleCentered?: boolean
	style?: ViewStyle
	underlayColor?: string
}

export interface RenderTouchableProps extends TouchableProps {
	interactionHandlers: InteractionHandlers
	rippleElements?: React.JSX.Element
}

export type TouchableBaseProps = TouchableProps
export type TouchableRippleLocation = TouchableRippleProps['touchableLocation']
export type TouchableRippleLocations = Record<string, TouchableRippleLocation>
export interface TouchableState {
	contentLayout: Partial<Omit<MeasuredLayoutRectangle, 'x' | 'y'>>
	rippleLocations: TouchableRippleLocations
}

export interface RenderTouchableRipplesProps extends Omit<TouchableRippleProps, 'rippleKey'> {
	rippleLocations: TouchableRippleLocations
}

export interface HandleTouchableInteractionStateChangeOptions
	extends
		Pick<TouchableRippleProps, 'touchableLocation'>,
		HandleInteractionStateChangeOptions,
		Pick<TouchableProps, 'enableTouchableRipple' | 'onInteractionStateChange'> {
	interactionState: InteractionState
	ref: React.RefObject<PressableType | null>
}

export interface AddTouchableRippleOptions extends Pick<TouchableState, 'contentLayout'> {
	touchableLocation?: Partial<Pick<NativeTouchEvent, 'locationX' | 'locationY'>>
}
