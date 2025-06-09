import type {SharedValue} from 'react-native-reanimated'
import type {AnimateSharedValueTo} from '../../hooks'

export const animateElevation =
	(animateSharedValueTo: AnimateSharedValueTo) => (shadowSharedValue: SharedValue<number>) => (level: number) =>
		animateSharedValueTo(shadowSharedValue)(level)
