import type {SharedValue} from 'react-native-reanimated'

import type {AnimatedTimingFactory} from '../../hooks'

import {ANIMATED_TIMING} from '../../theme'

export const animateSupportingText = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTimingFactory) =>
	animatedTiming(sharedValue, ANIMATED_TIMING.STANDARD)
