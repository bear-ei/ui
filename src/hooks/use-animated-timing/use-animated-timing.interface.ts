import type {AnimationCallback, SharedValue, WithTimingConfig} from 'react-native-reanimated'

import type {Bezier, Duration, Easing, Loop} from '../../theme'

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

/**
 * Animated timing factory — curried in three layers.
 *
 * **Layer 1 — configure the animation** (`AnimatedTimingOptions`):
 *   duration / easing / delay / repeat / callback / … (all optional)
 *   → the returned function is a reusable "animation recipe".
 *
 * **Layer 2 — bind a target SharedValue** (`AnimateSharedValueToOptions`):
 *   {sharedValue, immediate?}
 *   → the returned function is a "driver" for that specific SharedValue.
 *
 * **Layer 3 — drive the value** (`toValue: number`):
 *   The actual worklet call. Must be invoked on the UI thread
 *   (or from another worklet / `scheduleOnRN` bridge).
 *
 * **Why curry?** Layers 1 and 2 are commonly reused across multiple calls:
 *
 * @example
 *   const animateOpacity = animatedTiming({duration: DURATION.SHORT_2})
 *   //                       ↑ layer 1: configured once
 *
 *   const fadeIn  = animateOpacity({sharedValue: opacitySV})
 *   const fadeOut = animateOpacity({sharedValue: opacitySV})
 *   //               ↑ layer 2: bound per SharedValue (and possibly per-direction)
 *
 *   fadeIn(1)
 *   fadeOut(0)
 *   //       ↑ layer 3: only the target value changes
 *
 * @example
 *   // One-shot usage — currying still reads naturally:
 *   animatedTiming()({sharedValue: sv})(1)
 */
export type AnimatedTiming = (options?: AnimatedTimingOptions) => AnimateSharedValueTo
export interface AnimateSharedValueToOptions {
	immediate?: boolean
	sharedValue: SharedValue<number>
}
