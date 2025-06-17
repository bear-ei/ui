import type {RefAttributes} from 'react'
import type {LayoutRectangle, NativeTouchEvent, Pressable, PressableProps, ViewStyle} from 'react-native'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '../../hooks'
import type {ShapeProps} from '../Common'
import type {TouchableRippleProps} from './Touchable-ripple'

export interface TouchableProps
	extends Omit<
		PressableProps & Pick<ShapeProps, 'shape'> & RefAttributes<typeof Pressable> & InteractionHandlers,
		'children' | 'disabled' | 'hitSlop'
	> {
	backgroundUnderlay?: React.JSX.Element
	centered?: boolean
	children?: React.JSX.Element
	disabled?: boolean
	elevationUnderlay?: React.JSX.Element
	/**
	 * enableFocusRing is used to disable the focus style in macOS,
	 * this parameter has been implemented and is available.
	 * However, react-native-macos does not have an official typescript declaration for this parameter,
	 * so using it directly in a typescript will result in an undefined parameter.
	 */
	enableFocusRing?: boolean
	enableTouchableRipple?: boolean
	hotZone?: boolean
	mainAlignSelf?: ViewStyle['alignSelf']
	underlayColor?: string
}

export interface RenderTouchableProps extends TouchableProps {
	interactionHandlers: InteractionHandlers
	rippleElements?: React.JSX.Element[]
}

export type TouchableBaseProps = TouchableProps
export type TouchableRipple = TouchableRippleProps['touchableLocation']
export type TouchableRippleSequence = Record<string, TouchableRipple>
export interface TouchableState {
	contentLayout: LayoutRectangle
	rippleSequence: TouchableRippleSequence
}

export type RenderTouchableRippleOptions = Omit<TouchableRippleProps, 'indexKey'>
export interface HandleTouchableStateChangeOptions
	extends Pick<TouchableRippleProps, 'touchableLocation'>,
		HandleStateEventChangeOptions,
		Pick<TouchableProps, 'enableTouchableRipple'> {
	ref: React.RefObject<typeof Pressable>
}

export type TouchableContentProps = Pick<RenderTouchableProps, 'hotZone' | 'enableFocusRing'> &
	RefAttributes<typeof Pressable>

export interface TouchableMainProps {
	alignSelf?: ViewStyle['alignSelf']
}

export interface AddTouchableRippleOptions extends Pick<TouchableState, 'contentLayout'> {
	touchableLocation?: Pick<NativeTouchEvent, 'locationX' | 'locationY'>
}
