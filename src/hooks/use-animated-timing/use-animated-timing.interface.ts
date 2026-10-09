import type {AnimationCallback, SharedValue, WithTimingConfig} from 'react-native-reanimated'
import type {Bezier, Duration, Easing, Loop, Token} from '../../theme'

export interface UseAnimatedTimingOptions {
	disabledAnimated?: boolean
	token: Token
}

export interface CreateAnimatedTimingOptions extends Omit<
	AnimatedTimingOptions,
	'sharedValue' | 'callback' | 'duration'
> {
	bezier: Bezier
	duration: number
}

export interface AnimatedTimingOptions extends Omit<WithTimingConfig, 'duration' | 'easing'> {
	callback?: AnimationCallback
	delay?: number
	duration?: Duration | Loop | number
	easing?: Easing
	immediate?: boolean
	repeat?: number
}

export type AnimateSharedValueTo = (options: AnimateSharedValueToOptions) => (toValue: number) => void
export type AnimatedTiming = (options?: AnimatedTimingOptions) => AnimateSharedValueTo
export interface AnimateSharedValueToOptions {
	sharedValue: SharedValue<number>
	immediate?: boolean
}
