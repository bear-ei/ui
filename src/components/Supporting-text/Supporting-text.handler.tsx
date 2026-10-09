import type {SharedValue} from 'react-native-reanimated'
import type {AnimatedTimingOptions, AnimateSharedValueTo} from '../../hooks'
import {DURATION, EASING} from '../../theme'

export const animateSupportingText =
	(animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) =>
	(supportingTextSharedValue: SharedValue<number>) => {
		const animateSharedValueTo = animatedTiming({easing: EASING.STANDARD, duration: DURATION.SHORT_2})({
			sharedValue: supportingTextSharedValue
		})

		return (value: number) => animateSharedValueTo(value)
	}
