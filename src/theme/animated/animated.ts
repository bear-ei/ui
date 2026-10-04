import {DURATION, EASING} from './animated.enum'
import type {Animated, Duration, Easing} from './animated.interface'

const ANIMATED_DURATION = {
	[DURATION.EXTRA_LONG_0]: 700,
	[DURATION.EXTRA_LONG_1]: 800,
	[DURATION.EXTRA_LONG_2]: 900,
	[DURATION.EXTRA_LONG_3]: 1000,

	// [
	// LOOP series are dedicated to looping animations.
	// The value represents the loop cycle duration, not a single playback duration.
	[DURATION.LOOP_0]: 1500,
	[DURATION.LOOP_1]: 1750,
	[DURATION.LOOP_2]: 2000,
	[DURATION.LOOP_3]: 2250,
	// ]

	[DURATION.LONG_0]: 450,
	[DURATION.LONG_1]: 500,
	[DURATION.LONG_2]: 550,
	[DURATION.LONG_3]: 600,
	[DURATION.MEDIUM_0]: 250,
	[DURATION.MEDIUM_1]: 300,
	[DURATION.MEDIUM_2]: 350,
	[DURATION.MEDIUM_3]: 400,
	[DURATION.SHORT_0]: 50,
	[DURATION.SHORT_1]: 100,
	[DURATION.SHORT_2]: 150,
	[DURATION.SHORT_3]: 200
}

const ANIMATED_BEZIER = {
	[EASING.EMPHASIZED]: {x0: 0.2, x1: 0, y0: 0, y1: 1},
	[EASING.EMPHASIZED_ACCELERATE]: {x0: 0.3, x1: 0.8, y0: 0, y1: 0.15},
	[EASING.EMPHASIZED_DECELERATE]: {x0: 0.05, x1: 0.1, y0: 0.7, y1: 1},
	[EASING.LINEAR]: {x0: 0, x1: 1, y0: 0, y1: 1},
	[EASING.STANDARD]: {x0: 0.4, x1: 0.2, y0: 0, y1: 1},
	[EASING.STANDARD_ACCELERATE]: {x0: 0.4, x1: 1, y0: 0, y1: 1},
	[EASING.STANDARD_DECELERATE]: {x0: 0, x1: 0.2, y0: 0, y1: 1}
}

export const createAnimatedConfig =
	(speedScale = 1) =>
	(easing: Easing = EASING.STANDARD) =>
	(duration = DURATION.MEDIUM_1 as Duration | number): Animated => {
		const baseDuration = typeof duration === 'number' ? duration : ANIMATED_DURATION[duration]

		return {bezier: ANIMATED_BEZIER[easing], duration: Math.round(baseDuration * speedScale), speedScale}
	}
