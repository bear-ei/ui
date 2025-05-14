import type {SharedValue} from 'react-native-reanimated'
import type {AnimatedTiming} from '../../hooks'

export const animateElevationLevel =
	(animatedTiming: AnimatedTiming) => (shadowSharedValue: SharedValue<number>) => (level: number) =>
		animatedTiming()(shadowSharedValue)(level)
