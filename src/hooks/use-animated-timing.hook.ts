import {DURATION, EASING} from '@bearei/material-token'
import {useCallback} from 'react'
import type {AnimationCallback, SharedValue} from 'react-native-reanimated'
import {Easing, runOnJS, withRepeat, withTiming} from 'react-native-reanimated'
import type {AnimatedTimingOptions, CreateAnimatedTimingOptions, UseAnimatedTimingOptions} from './hooks.interface'

const createAnimatedTiming = ({
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

export const useAnimatedTiming = ({token}: UseAnimatedTimingOptions) => {
	const animatedTiming = useCallback(
		({callback, ...options} = {} as AnimatedTimingOptions) =>
			(sharedValue: SharedValue<number>) =>
			(toValue: number) => {
				if (sharedValue.value === toValue) {
					return
				}

				sharedValue.value = createAnimatedTiming({...options, token})(callback)(toValue)
			},
		[token]
	)

	return animatedTiming
}
