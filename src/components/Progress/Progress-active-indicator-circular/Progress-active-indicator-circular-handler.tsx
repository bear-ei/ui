import {EASING} from '@bearei/material-token'
import type {AnimatedTiming} from '../../../hooks'
import type {AnimateProgressCircularOptions} from './Progress-active-indicator-circular.interface'

export const animateProgressCircular =
	(animatedTiming: AnimatedTiming) =>
	({containerSharedValue, circleSharedValue}: AnimateProgressCircularOptions) =>
	(value: number) => {
		animatedTiming({repeat: 0, duration: 2000, easing: EASING.LINEAR})(circleSharedValue)(value)
		animatedTiming({repeat: 0, duration: 2000, easing: EASING.LINEAR})(containerSharedValue)(value)
	}

export const computeProgressStrokeDashoffset = (circumference: number) => (value: number) => circumference * (1 - value)
