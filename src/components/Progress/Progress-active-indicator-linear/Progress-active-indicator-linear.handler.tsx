import type {SharedValue} from 'react-native-reanimated'
import type {CreateSharedValueAnimator} from '../../../hooks'

export const animateProgressActiveIndicatorLinear =
	(createSharedValueAnimator: CreateSharedValueAnimator) =>
	(widthSharedValue: SharedValue<number>) =>
	(value?: number) =>
		typeof value === 'number' && createSharedValueAnimator(widthSharedValue)(value)
