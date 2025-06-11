import {cancelAnimation} from 'react-native-reanimated'
import type {AnimateSharedValueTo} from '../../../hooks'
import type {AnimateProgressActiveIndicatorCircularSharedValues} from './Progress-active-indicator-circular.interface'

export const animateProgressActiveIndicatorCircular =
	(animateSharedValueTo: AnimateSharedValueTo) =>
	({containerSharedValue, circleSharedValue}: AnimateProgressActiveIndicatorCircularSharedValues) =>
	(enableAnimated?: boolean) => {
		if (enableAnimated) {
			animateSharedValueTo({sharedValue: circleSharedValue})(2)
			animateSharedValueTo({sharedValue: containerSharedValue})(2)

			return
		}

		cancelAnimation(circleSharedValue)
		cancelAnimation(containerSharedValue)
	}

export const computeProgressStrokeDashoffset = (circumference: number) => (value: number) => circumference * (1 - value)
