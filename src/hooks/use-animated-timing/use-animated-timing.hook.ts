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
 *  - Skipped (value already equals target) → callback NOT called.
 *  - Animation completes normally → callback(true).
 *  - Animation interrupted by a newer call → callback(false).
 *
 * If you need "value reached target regardless of animation", do NOT
 * rely on this callback — read `sharedValue.value` at the call site.
 */
export const useAnimatedTiming = () => {
	const {token} = useTheme()
	const animatedTiming = useCallback(
		(
			sharedValue: SharedValue<number>,
			{
				callback,
				duration: rawDuration = DURATION.MEDIUM_0,
				easing = EASING.STANDARD,
				immediate,
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

					if (callback) {
						scheduleOnRN(callback, true)
					}

					return
				}

				sharedValue.value = createAnimatedTiming(toValue, {...options, bezier, duration}, callback)
			}
		},
		[token]
	)

	return animatedTiming
}
