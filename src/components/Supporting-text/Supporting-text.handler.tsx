import type {SharedValue} from 'react-native-reanimated'

import type {AnimatedTiming} from '../../hooks'

import {DURATION, EASING} from '../../theme'

export const animateSupportingText = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTiming) =>
	animatedTiming(sharedValue, {duration: DURATION.SHORT_2, easing: EASING.STANDARD})
