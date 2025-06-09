import {DURATION, EASING} from '@bearei/material-token'
import {useCallback} from 'react'
import {cancelAnimation, type SharedValue} from 'react-native-reanimated'
import {createAnimatedTiming} from './use-animated-timing.handler'
import type {AnimatedTimingOptions, UseAnimatedTimingOptions} from './use-animated-timing.interface'

export const useAnimatedTiming = ({token}: UseAnimatedTimingOptions) => {
	const animatedTiming = useCallback(
		(
			{
				callback,
				duration: rawDuration = DURATION.MEDIUM_1,
				easing = EASING.EMPHASIZED,
				...options
			} = {} as AnimatedTimingOptions
		) => {
			const {bezier, duration} = token.animated(easing)(rawDuration)
			const animate = createAnimatedTiming({...options, bezier, duration})(callback)

			return (sharedValue: SharedValue<number>) => (toValue: number) => {
				'worklet'

				if (sharedValue.value === toValue) {
					return
				}

				cancelAnimation(sharedValue)
				sharedValue.value = animate(toValue)
			}
		},
		[token]
	)

	return animatedTiming
}
