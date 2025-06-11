import type {SharedValue} from 'react-native-reanimated'
import type {AnimateSharedValueTo} from '../../../hooks'

export const animateProgressActiveIndicatorLinear =
	(animateSharedValueTo: AnimateSharedValueTo) => (scaleXSharedValue: SharedValue<number>) => (value?: number) =>
		typeof value === 'number' && animateSharedValueTo({sharedValue: scaleXSharedValue})(value)
