import {useCallback} from 'react'
import {scheduleOnRN} from 'react-native-worklets'
import {createAnimatedTiming} from './use-animated-timing.handler'
import type {
	AnimatedTimingOptions,
	AnimateSharedValueTo,
	AnimateSharedValueToOptions,
	UseAnimatedTimingOptions
} from './use-animated-timing.interface'
import {DURATION, EASING} from '../../theme'

export const useAnimatedTiming = ({token}: UseAnimatedTimingOptions) => {
	const animatedTiming = useCallback(
		(
			{
				callback,
				duration: rawDuration = DURATION.MEDIUM_0,
				easing = EASING.STANDARD,
				...options
			} = {} as AnimatedTimingOptions
		): AnimateSharedValueTo => {
			const {bezier, duration} = token.animated({easing, duration: rawDuration})

			return ({sharedValue, immediate}: AnimateSharedValueToOptions) =>
				(toValue: number) => {
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

					sharedValue.value = createAnimatedTiming({...options, bezier, duration})(callback)(toValue)
				}
		},
		[token]
	)

	return animatedTiming
}
