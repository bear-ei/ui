import type {AnimationCallback, SharedValue, WithTimingConfig} from 'react-native-reanimated'

import type {Bezier, Duration, Easing, Loop} from '../../theme'

export interface CreateAnimatedTimingOptions extends Omit<
	AnimatedTimingOptions,
	'sharedValue' | 'onFinish' | 'duration'
> {
	bezier: Bezier
	duration: number
}

export interface AnimatedTimingOptions extends Omit<WithTimingConfig, 'duration' | 'easing'> {
	delay?: number
	duration?: Duration | Loop | number
	easing?: Easing
	immediate?: boolean
	onFinish?: AnimationCallback
	repeat?: number
}

export type AnimateSharedValueTo = (toValue: number) => void

/**
 * Animated timing factory — curried in two layers.
 *
 * **Layer 1 — bind a target SharedValue** (`AnimatedTimingOptions`):
 *   {sharedValue, duration?, easing?, delay?, repeat?, onFinish?, immediate?}
 *   → the returned function is a "driver" for that specific SharedValue.
 *
 * **Layer 2 — drive the value** (`toValue: number`):
 *   The actual worklet call. Must be invoked on the UI thread
 *   (or from another worklet / `scheduleOnRN` bridge).
 *
 * **Why curry?** The bound driver is commonly reused across multiple calls:
 *
 * @example
 *   const animateOpacity = animatedTiming(opacitySharedValue, {duration: DURATION.SHORT_2})
 *
 *   animateOpacity(1)
 *   animateOpacity(0)
 *   //              ↑ layer 2: only the target value changes
 *
 * @example
 *   // One-shot usage — currying still reads naturally:
 *   animatedTiming(sharedValue)(1)
 */
export type AnimatedTimingFactory = (
	sharedValue: SharedValue<number>,
	options?: AnimatedTimingOptions
) => AnimateSharedValueTo
