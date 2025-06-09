import {Easing, runOnJS, withRepeat, withTiming, type AnimationCallback} from 'react-native-reanimated'
import type {CreateAnimatedTimingOptions} from './use-animated-timing.interface'

export const createAnimatedTiming = ({duration, repeat, bezier, ...config}: CreateAnimatedTimingOptions) => {
	return (callback?: AnimationCallback) => (toValue: number) => {
		'worklet'

		const animation = withTiming(
			toValue,
			{...config, duration, easing: Easing.bezier(bezier.x0, bezier.y0, bezier.x1, bezier.y1)},
			finished => {
				'worklet'

				if (callback) {
					runOnJS(callback)(finished)
				}
			}
		)

		return repeat !== undefined && typeof repeat === 'number' ? withRepeat(animation, repeat) : animation
	}
}
