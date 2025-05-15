import type {SharedValue} from 'react-native-reanimated'
import type {AnimatedTiming} from '../../../hooks'

export const animateSideSheetContentVisibility =
	(animatedTiming: AnimatedTiming) =>
	(backgroundColorSharedValue: SharedValue<number>) =>
	(visible?: boolean) => {
		if (typeof visible !== 'boolean') {
			return
		}

		const toValue = visible ? 1 : 0

		animatedTiming()(backgroundColorSharedValue)(toValue)
	}
