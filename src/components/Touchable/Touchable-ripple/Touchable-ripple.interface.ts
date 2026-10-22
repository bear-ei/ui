import type {RefAttributes} from 'react'
import type {NativeTouchEvent, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus, LayoutRectangle} from '../../../constants'
import type {InteractionHandlers} from '../../../hooks'
import type {TouchableProps} from '../Touchable.interface'

export interface TouchableRippleProps
	extends ViewProps, RefAttributes<View>, Pick<TouchableProps, 'centered' | 'underlayColor' | 'shape'> {
	containerLayout?: Partial<Omit<LayoutRectangle, 'x' | 'y'>>
	indexKey?: string
	onAnimateFinished?: (indexKey: string) => void
	touchableLocation?: Partial<Pick<NativeTouchEvent, 'locationX' | 'locationY'>>
}

export interface RenderTouchableRippleProps extends Omit<TouchableRippleProps, 'indexKey'> {
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
	extends Pick<RenderTouchableRippleProps, 'onAnimateFinished'>, Pick<TouchableRippleProps, 'indexKey'> {
	radius: number
	status: ComponentStatus
}

export type AnimateTouchableRippleOptions = Pick<TouchableRippleProps, 'onAnimateFinished' | 'indexKey'>
