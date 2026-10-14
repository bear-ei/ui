import type {RefAttributes} from 'react'
import type {NativeTouchEvent, Pressable, PressableProps, StyleProp, View, ViewStyle} from 'react-native'
import type {LayoutRectangle, State} from '../../constants'
import type {HandleStateEventChangeOptions, InteractionHandlers, StateEventChangeHandler} from '../../hooks'
import type {CommonProps} from '../../theme'
import type {TouchableRippleProps} from './Touchable-ripple'

export type PressableType = typeof Pressable & View
export interface TouchableProps
	extends
		Omit<
			PressableProps & RefAttributes<PressableType> & InteractionHandlers,
			'children' | 'disabled' | 'hitSlop' | 'style'
		>,
		CommonProps {
	backgroundUnderlay?: React.JSX.Element
	centered?: boolean
	children?: React.JSX.Element
	disabled?: boolean
	elevationUnderlay?: React.JSX.Element
	enableTouchableRipple?: boolean
	onStateEventChange?: StateEventChangeHandler
	style?: StyleProp<ViewStyle>
	underlayColor?: string
}

export interface RenderTouchableProps extends TouchableProps {
	interactionHandlers: InteractionHandlers
	rippleElements?: React.JSX.Element
}

export type TouchableBaseProps = TouchableProps
export type TouchableRipple = TouchableRippleProps['touchableLocation']
export type TouchableRippleSequence = Record<string, TouchableRipple>
export interface TouchableState {
	contentLayout: Partial<Omit<LayoutRectangle, 'x' | 'y'>>
	rippleSequence: TouchableRippleSequence
}

export interface RenderTouchableRippleProps extends Omit<TouchableRippleProps, 'indexKey'> {
	rippleSequence: TouchableRippleSequence
}

export interface HandleTouchableStateChangeOptions
	extends
		Pick<TouchableRippleProps, 'touchableLocation'>,
		HandleStateEventChangeOptions,
		Pick<TouchableProps, 'enableTouchableRipple' | 'onStateEventChange'> {
	ref: React.RefObject<PressableType | null>
	state: State
}

export interface AddTouchableRippleOptions extends Pick<TouchableState, 'contentLayout'> {
	touchableLocation?: Partial<Pick<NativeTouchEvent, 'locationX' | 'locationY'>>
}
