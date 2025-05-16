import type {Duration, Easing, Token} from '@bearei/material-token'
import type {AnimationCallback, SharedValue, WithTimingConfig} from 'react-native-reanimated'

export interface UseAnimatedTimingOptions {
	disabledAnimated?: boolean
	token: Token
}

export interface CreateAnimatedTimingOptions extends Omit<AnimatedTimingOptions, 'sharedValue' | 'callback'> {
	token: Token
}

export interface AnimatedTimingOptions extends Omit<WithTimingConfig, 'duration' | 'easing'> {
	callback?: AnimationCallback
	duration?: Duration | number
	easing?: Easing
	repeat?: number
}

export type AnimatedTiming = (
	options?: AnimatedTimingOptions
) => (sharedValue: SharedValue<number>) => (toValue: number) => void
