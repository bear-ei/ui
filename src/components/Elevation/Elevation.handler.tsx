import type {SharedValue} from 'react-native-reanimated'
import type {CreateSharedValueAnimator} from '../../hooks'

export const animateElevation =
	(createSharedValueAnimator: CreateSharedValueAnimator) =>
	(shadowSharedValue: SharedValue<number>) =>
	(level: number) =>
		createSharedValueAnimator(shadowSharedValue)(level)
