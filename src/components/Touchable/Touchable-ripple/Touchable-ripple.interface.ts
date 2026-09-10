import type {ComponentStatus, LayoutRectangle} from '@/constants'
import type {Theme} from '@/contexts'
import type {AnimatedTiming, InteractionHandlers} from '@/hooks'
import type {RefAttributes} from 'react'
import type {NativeTouchEvent, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {TouchableProps} from '../Touchable.interface'

export interface TouchableRippleProps
	extends ViewProps, RefAttributes<View>, Pick<TouchableProps, 'centered' | 'underlayColor' | 'shape'> {
	containerLayout?: LayoutRectangle
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
}

export interface AnimateTouchableRippleOptions extends Pick<
	RenderTouchableRippleProps,
	'onAnimateFinished' | 'containerLayout'
> {
	animatedTiming: AnimatedTiming
}

export interface TouchableRippleContainerProps extends Pick<RenderTouchableRippleProps, 'underlayColor' | 'shape'> {
	locationX?: number
	locationY?: number
	size?: number
	theme: Theme
}
