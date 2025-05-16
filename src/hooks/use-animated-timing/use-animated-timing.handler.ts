import {DURATION, EASING} from '@bearei/material-token'
import {Easing, runOnJS, withRepeat, withTiming, type AnimationCallback} from 'react-native-reanimated'
import type {CreateAnimatedTimingOptions} from './use-animated-timing.interface'

export const createAnimatedTiming = ({
	duration = DURATION.MEDIUM_1,
	easing = EASING.EMPHASIZED,
	repeat,
	token,
	...config
}: CreateAnimatedTimingOptions) => {
	const {bezier, duration: transitionDuration} = token.animated(easing)(duration)

	return (callback?: AnimationCallback) => (toValue: number) => {
		const animation = withTiming(
			toValue,
			{
				...config,
				duration: transitionDuration,
				easing: Easing.bezier(bezier.x0, bezier.y0, bezier.x1, bezier.y1)
			},
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
