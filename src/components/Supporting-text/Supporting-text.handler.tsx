import type {SharedValue} from 'react-native-reanimated'
import type {AnimatedTimingOptions, AnimateSharedValueTo} from '../../hooks'

export const animateSupportingText = (animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) => {
	const animateSharedValueTo = animatedTiming()

	return (supportingTextSharedValue: SharedValue<number>) => (value: number) =>
		animateSharedValueTo({sharedValue: supportingTextSharedValue})(value)
}
