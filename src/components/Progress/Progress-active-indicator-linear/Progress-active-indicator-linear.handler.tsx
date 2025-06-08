import type {SharedValue} from 'react-native-reanimated'
import type {AnimatedTiming} from '../../../hooks'

export const animateProgressActiveIndicatorLinear =
	(animatedTiming: AnimatedTiming) => (widthSharedValue: SharedValue<number>) => (value?: number) =>
		typeof value === 'number' && animatedTiming()(widthSharedValue)(value)
