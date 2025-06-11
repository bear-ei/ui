import type {SharedValue} from 'react-native-reanimated'
import type {AnimateSharedValueTo} from '../../../hooks'

export const animateSideSheetContent =
	(animateSharedValueTo: AnimateSharedValueTo) =>
	(backgroundColorSharedValue: SharedValue<number>) =>
	(visible?: boolean) => {
		if (typeof visible !== 'boolean') {
			return
		}

		const toValue = visible ? 1 : 0

		animateSharedValueTo({sharedValue: backgroundColorSharedValue})(toValue)
	}
