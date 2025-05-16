import {useCallback} from 'react'
import type {SharedValue} from 'react-native-reanimated'
import {createAnimatedTiming} from './use-animated-timing.handler'
import type {AnimatedTimingOptions, UseAnimatedTimingOptions} from './use-animated-timing.interface'

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
