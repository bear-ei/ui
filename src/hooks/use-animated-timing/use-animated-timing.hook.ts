import type {SharedValue} from 'react-native-reanimated'

import {useCallback} from 'react'
import {scheduleOnRN} from 'react-native-worklets'

import type {AnimatedTimingOptions, AnimateSharedValueTo} from './use-animated-timing.interface'

import {DURATION, EASING} from '../../theme'
import {useTheme} from '../use-theme'
import {createAnimatedTiming} from './use-animated-timing.handler'

/**
 * Returns an `animatedTiming` factory that drives a `SharedValue` toward a target.
 *
 * **Callback semantics — "animation truly finished":**
 *  - Skipped (value already equals target) → onFinish NOT called.
 *  - Animation completes normally → onFinish(true).
 *  - Animation interrupted by a newer call → onFinish(false).
 *
 * If you need "value reached target regardless of animation", do NOT
 * rely on this onFinish — read `sharedValue.value` at the call site.
 */
export const useAnimatedTiming = () => {
	const {token} = useTheme()
	const animatedTiming = useCallback(
		(
			sharedValue: SharedValue<number>,
			{
				duration: rawDuration = DURATION.MEDIUM_0,
				easing = EASING.STANDARD,
				immediate,
				onFinish,
				...options
			}: AnimatedTimingOptions = {}
		): AnimateSharedValueTo => {
			const {bezier, duration} = token.animated({duration: rawDuration, easing})

			return (toValue: number) => {
				'worklet'

				if (sharedValue.value === toValue) {
					return
				}

				if (immediate) {
					sharedValue.value = toValue

					if (onFinish) {
						scheduleOnRN(onFinish, true)
					}

					return
				}

				sharedValue.value = createAnimatedTiming(toValue, {...options, bezier, duration}, onFinish)
			}
		},
		[token]
	)

	return animatedTiming
}
