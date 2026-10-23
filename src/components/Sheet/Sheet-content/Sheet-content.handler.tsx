import type {SharedValue} from 'react-native-reanimated'

import type {AnimatedTiming} from '../../../hooks'

import {DURATION, EASING} from '../../../theme'

export const animateSheetContent = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTiming) => {
	const animateSharedValueTo = animatedTiming(sharedValue, {duration: DURATION.MEDIUM_0, easing: EASING.STANDARD})

	return (visible?: boolean) => {
		if (typeof visible !== 'boolean') {
			return
		}

		const toValue = visible ? 1 : 0

		animateSharedValueTo(toValue)
	}
}
