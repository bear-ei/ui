import type {RefAttributes} from 'react'
import type {NativeTouchEvent, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {ComponentStatus, LayoutRectangle} from '../../../constants'
import type {AnimatedTiming, AnimatedTimingOptions, InteractionHandlers} from '../../../hooks'
import type {TouchableProps} from '../Touchable.interface'

export interface TouchableRippleProps
	extends ViewProps, RefAttributes<View>, Pick<TouchableProps, 'centered' | 'underlayColor' | 'shape'> {
	containerLayout?: Omit<LayoutRectangle, 'x' | 'y'>
	indexKey?: string
	onAnimateFinished?: (indexKey: string) => void
	touchableLocation?: Pick<NativeTouchEvent, 'locationX' | 'locationY'>
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

export interface AnimateTouchableRippleSharedValues {
	scaleSharedValue: SharedValue<number>
	opacitySharedValue: SharedValue<number>
	animatedTimingOptions?: AnimatedTimingOptions
}

export interface AnimateTouchableRippleOptions extends Pick<RenderTouchableRippleProps, 'onAnimateFinished'> {
	animatedTiming: AnimatedTiming
}
