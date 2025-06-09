import type {SharedValue} from 'react-native-reanimated'
import type {AnimateSharedValueTo} from '../../../hooks'

export const animateProgressActiveIndicatorLinear =
	(animateSharedValueTo: AnimateSharedValueTo) => (widthSharedValue: SharedValue<number>) => (value?: number) =>
		typeof value === 'number' && animateSharedValueTo(widthSharedValue)(value)
