import type {RefAttributes} from 'react'
import type {LayoutRectangle, NativeTouchEvent, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {AnimatedTiming} from '../../../hooks'
import type {TouchableProps} from '../Touchable.interface'

export interface TouchableRippleProps
	extends ViewProps,
		RefAttributes<View>,
		Pick<TouchableProps, 'centered' | 'underlayColor'> {
	containerLayout?: LayoutRectangle
	indexKey?: string
	onAnimatedFinished?: (indexKey: string) => void
	touchableLocation?: Pick<NativeTouchEvent, 'locationX' | 'locationY'>
}

export interface RenderTouchableRippleProps extends Omit<TouchableRippleProps, 'indexKey'> {
	containerAnimatedStyle: AnimatedStyle<ViewStyle>
	locationX: number
	locationY: number
	size?: number
}

export interface TouchableRippleBaseProps extends TouchableRippleProps {
	renderTouchableRipple: (props: RenderTouchableRippleProps) => React.JSX.Element
}

export interface UseTouchableRippleAnimatedOptions
	extends Pick<RenderTouchableRippleProps, 'onAnimatedFinished'>,
		Pick<TouchableRippleProps, 'indexKey'> {
	radius: number
}

export interface CreateTouchableRippleAnimatedTimingSharedValue {
	scaleSharedValue: SharedValue<number>
	opacitySharedValue: SharedValue<number>
}

export interface HandleTouchableRippleAnimatedTimingOptions
	extends Pick<RenderTouchableRippleProps, 'onAnimatedFinished' | 'containerLayout'> {
	animatedTiming: AnimatedTiming
}

export interface TouchableRippleLayoutProps extends Pick<RenderTouchableRippleProps, 'underlayColor'> {
	size?: number
	locationX?: number
	locationY?: number
}
