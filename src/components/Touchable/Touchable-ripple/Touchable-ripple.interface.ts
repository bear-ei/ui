import type {RefAttributes} from 'react'
import type {NativeTouchEvent, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus, MeasuredLayoutRectangle} from '../../../constants'
import type {InteractionHandlers} from '../../../hooks'
import type {TouchableProps} from '../Touchable.interface'

export interface TouchableRippleProps
	extends ViewProps, RefAttributes<View>, Pick<TouchableProps, 'rippleCentered' | 'underlayColor' | 'shape'> {
	containerLayout?: Partial<Omit<MeasuredLayoutRectangle, 'x' | 'y'>>
	onAnimationFinished?: (rippleKey: string) => void
	rippleKey: string
	touchableLocation?: Partial<Pick<NativeTouchEvent, 'locationX' | 'locationY'>>
}

export interface RenderTouchableRippleProps extends Omit<TouchableRippleProps, 'rippleKey'> {
	containerAnimatedStyle: AnimatedStyle<ViewStyle>
	interactionHandlers: InteractionHandlers
	locationX: number
	locationY: number
	size?: number
}

export interface TouchableRippleState {
	status: ComponentStatus
}

export type TouchableRippleBaseProps = TouchableRippleProps
export interface UseTouchableRippleAnimatedOptions
	extends Pick<RenderTouchableRippleProps, 'onAnimationFinished'>, Pick<TouchableRippleProps, 'rippleKey'> {
	radius: number
	status: ComponentStatus
}

export type AnimateTouchableRippleOptions = Pick<TouchableRippleProps, 'onAnimationFinished' | 'rippleKey'>
