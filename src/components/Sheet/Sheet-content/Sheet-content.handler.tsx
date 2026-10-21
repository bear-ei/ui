import type {SharedValue} from 'react-native-reanimated'

import type {AnimatedTimingOptions, AnimateSharedValueTo} from '../../../hooks'
import {DURATION, EASING} from '../../../theme'

export const animateSheetContent =
	(animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) =>
	(backgroundColorSharedValue: SharedValue<number>) => {
		const animateSharedValueTo = animatedTiming({duration: DURATION.MEDIUM_0, easing: EASING.STANDARD})({
			sharedValue: backgroundColorSharedValue
		})

		return (visible?: boolean) => {
			if (typeof visible !== 'boolean') {
				return
			}

			const toValue = visible ? 1 : 0

			animateSharedValueTo(toValue)
		}
	}
