import type {SharedValue} from 'react-native-reanimated'

import type {AnimatedTiming} from '../../hooks'

import {ANIMATED_TIMING} from '../../theme'

export const animateSupportingText = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTiming) =>
	animatedTiming(sharedValue, ANIMATED_TIMING.STANDARD)
