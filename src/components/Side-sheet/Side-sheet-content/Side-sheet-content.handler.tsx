import type {SharedValue} from 'react-native-reanimated'
import type {CreateSharedValueAnimator} from '../../../hooks'

export const animateSideSheetContent =
	(createSharedValueAnimator: CreateSharedValueAnimator) =>
	(backgroundColorSharedValue: SharedValue<number>) =>
	(visible?: boolean) => {
		if (typeof visible !== 'boolean') {
			return
		}

		const toValue = visible ? 1 : 0

		createSharedValueAnimator(backgroundColorSharedValue)(toValue)
	}
