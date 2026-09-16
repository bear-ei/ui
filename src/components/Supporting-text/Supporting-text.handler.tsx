import type {SharedValue} from 'react-native-reanimated'
import type {AnimateSharedValueTo} from '../../hooks'

export const animateSupportingText =
	(animateSharedValueTo: AnimateSharedValueTo) =>
	(supportingTextSharedValue: SharedValue<number>) =>
	(value: number) =>
		animateSharedValueTo({sharedValue: supportingTextSharedValue})(value)
