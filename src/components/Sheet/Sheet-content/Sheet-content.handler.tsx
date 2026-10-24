import type {SharedValue} from 'react-native-reanimated'

import type {AnimatedTiming} from '../../../hooks'

import {ANIMATED_TIMING} from '../../../theme'

export const animateSheetContent = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTiming) => {
	const animateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.SURFACE)

	return (visible?: boolean) => {
		if (typeof visible !== 'boolean') {
			return
		}

		const toValue = visible ? 1 : 0

		animateSharedValueTo(toValue)
	}
}
