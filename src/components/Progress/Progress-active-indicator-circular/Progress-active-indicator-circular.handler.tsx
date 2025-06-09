import type {CreateSharedValueAnimator} from '../../../hooks'
import type {AnimateProgressActiveIndicatorCircularSharedValues} from './Progress-active-indicator-circular.interface'

export const animateProgressActiveIndicatorCircular =
	(createSharedValueAnimator: CreateSharedValueAnimator) =>
	({containerSharedValue, circleSharedValue}: AnimateProgressActiveIndicatorCircularSharedValues) =>
	(value: number) => {
		createSharedValueAnimator(circleSharedValue)(value)
		createSharedValueAnimator(containerSharedValue)(value)
	}

export const computeProgressStrokeDashoffset = (circumference: number) => (value: number) => circumference * (1 - value)
