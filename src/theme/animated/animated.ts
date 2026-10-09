import {UI_DENSITY, type UIDensity} from '../density'
import {DURATION, EASING, LOOP} from './animated.enum'
import type {Animated, AnimatedLoop, CreateAnimatedConfigOptions, Duration, Loop} from './animated.interface'

const ANIMATED_DURATION = {
	[UI_DENSITY.COMPACT]: {
		[DURATION.EXTRA_LONG_0]: 500,
		[DURATION.EXTRA_LONG_1]: 600,
		[DURATION.EXTRA_LONG_2]: 700,
		[DURATION.EXTRA_LONG_3]: 800,
		[DURATION.MEDIUM_0]: 180,
		[DURATION.MEDIUM_1]: 220,
		[DURATION.MEDIUM_2]: 260,
		[DURATION.MEDIUM_3]: 300,
		[DURATION.SHORT_0]: 50,
		[DURATION.SHORT_1]: 80,
		[DURATION.SHORT_2]: 120,
		[DURATION.SHORT_3]: 150
	},
	[UI_DENSITY.COMFORTABLE]: {
		[DURATION.EXTRA_LONG_0]: 700,
		[DURATION.EXTRA_LONG_1]: 800,
		[DURATION.EXTRA_LONG_2]: 900,
		[DURATION.EXTRA_LONG_3]: 1000,
		[DURATION.MEDIUM_0]: 250,
		[DURATION.MEDIUM_1]: 300,
		[DURATION.MEDIUM_2]: 350,
		[DURATION.MEDIUM_3]: 400,
		[DURATION.SHORT_0]: 50,
		[DURATION.SHORT_1]: 100,
		[DURATION.SHORT_2]: 150,
		[DURATION.SHORT_3]: 200
	}
}

const ANIMATED_LOOP_DURATION = {
	[UI_DENSITY.COMPACT]: {
		[LOOP.LOOP_0]: 1200,
		[LOOP.LOOP_1]: 1400,
		[LOOP.LOOP_2]: 1600,
		[LOOP.LOOP_3]: 1800
	},
	[UI_DENSITY.COMFORTABLE]: {
		[LOOP.LOOP_0]: 1500,
		[LOOP.LOOP_1]: 1750,
		[LOOP.LOOP_2]: 2000,
		[LOOP.LOOP_3]: 2250
	}
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
	(density: UIDensity = UI_DENSITY.COMPACT) =>
	({easing = EASING.STANDARD, duration = DURATION.MEDIUM_1}: CreateAnimatedConfigOptions): Animated => {
		const isLoop = typeof duration !== 'number' && Object.keys(ANIMATED_LOOP_DURATION[density]).includes(duration)

		const baseDuration =
			typeof duration === 'number' ? duration
			: isLoop ? ANIMATED_LOOP_DURATION[density][duration as Loop]
			: ANIMATED_DURATION[density][duration as Duration]

		return {bezier: ANIMATED_BEZIER[easing], duration: baseDuration}
	}

export const createAnimatedLoopConfig =
	(density: UIDensity = UI_DENSITY.COMPACT) =>
	(loop: Loop = LOOP.LOOP_0): AnimatedLoop => ({
		duration: ANIMATED_LOOP_DURATION[density][loop]
	})
