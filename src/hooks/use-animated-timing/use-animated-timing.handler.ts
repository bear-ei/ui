import {Easing, withDelay, withRepeat, withTiming, type AnimationCallback} from 'react-native-reanimated'
import {scheduleOnRN} from 'react-native-worklets'

import type {CreateAnimatedTimingOptions} from './use-animated-timing.interface'

export const createAnimatedTiming = (
	toValue: number,
	{bezier, delay, duration, repeat, ...options}: CreateAnimatedTimingOptions,
	callback?: AnimationCallback
) => {
	'worklet'

	const animation = withTiming(
		toValue,
		{...options, duration, easing: Easing.bezier(bezier.x0, bezier.y0, bezier.x1, bezier.y1)},
		finished => {
			'worklet'

			if (callback) {
				scheduleOnRN(callback, finished)
			}
		}
	)

	const withDelayedAnimation = typeof delay === 'number' ? withDelay(delay, animation) : animation

	if (typeof repeat === 'number' && repeat !== 0) {
		return withRepeat(withDelayedAnimation, repeat)
	}

	return withDelayedAnimation
}
