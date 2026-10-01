import {DURATION, EASING} from './animated.enum'

export type Duration = (typeof DURATION)[keyof typeof DURATION]
export type Easing = (typeof EASING)[keyof typeof EASING]
export interface Bezier {
	x0: number
	x1: number
	y0: number
	y1: number
}

export interface Animated {
	bezier: Bezier
	duration: number
}

export interface CreateAnimatedConfigOptions {
	easing?: Easing
	speedScale?: number
}
