import {Easing, withDelay, withRepeat, withTiming, type AnimationCallback} from 'react-native-reanimated'
import {scheduleOnRN} from 'react-native-worklets'
import type {CreateAnimatedTimingOptions} from './use-animated-timing.interface'

export const createAnimatedTiming =
	({duration, repeat, bezier, delay, speedScale, ...config}: CreateAnimatedTimingOptions) =>
	(callback?: AnimationCallback) =>
	(toValue: number) => {
		'worklet'

		const animation = withTiming(
			toValue,
			{...config, duration, easing: Easing.bezier(bezier.x0, bezier.y0, bezier.x1, bezier.y1)},
			finished => {
				'worklet'

				if (callback) {
					scheduleOnRN(callback, finished)
				}
			}
		)

		if (typeof repeat === 'number') {
			return withRepeat(animation, repeat)
		}

		if (typeof delay === 'number') {
			return withDelay(Math.round(delay * speedScale), animation)
		}

		return animation
	}
