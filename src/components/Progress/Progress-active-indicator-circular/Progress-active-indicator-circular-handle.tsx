import {EASING} from '@bearei/material-token'
import type {AnimatedTiming} from '../../../hooks'
import type {HandleProgressActiveIndicatorCircularAnimatedTimingOptions} from './Progress-active-indicator-circular.interface'

export const handleProgressActiveIndicatorCircularAnimatedTiming =
	(animatedTiming: AnimatedTiming) =>
	({containerSharedValue, circleSharedValue}: HandleProgressActiveIndicatorCircularAnimatedTimingOptions) =>
	(value: number) => {
		animatedTiming({repeat: 0, duration: 2000, easing: EASING.LINEAR})(circleSharedValue)(value)
		animatedTiming({repeat: 0, duration: 2000, easing: EASING.LINEAR})(containerSharedValue)(value)
	}

export const handleProgressActiveIndicatorCircularStrokeDashoffset = (circumference: number) => (value: number) =>
	circumference * (1 - value)
