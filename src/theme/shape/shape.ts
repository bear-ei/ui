import type {Shape} from './shape.interface'

import {UI_DENSITY, type UIDensity} from '../density'
import {RADIUS, SHAPE} from './shape.enum'

const RADIUS_SIZE = {
	[UI_DENSITY.COMFORTABLE]: {
		[RADIUS.FULL]: 9999,
		[RADIUS.LARGE]: 16,
		[RADIUS.MEDIUM]: 12,
		[RADIUS.NONE]: 0,
		[RADIUS.SMALL]: 8,
		[RADIUS.X_LARGE]: 24,
		[RADIUS.X_SMALL]: 4,
		[RADIUS.XX_LARGE]: 32,
		[RADIUS.XX_SMALL]: 2
	},
	[UI_DENSITY.COMPACT]: {
		[RADIUS.FULL]: 9999,
		[RADIUS.LARGE]: 12,
		[RADIUS.MEDIUM]: 8,
		[RADIUS.NONE]: 0,
		[RADIUS.SMALL]: 6,
		[RADIUS.X_LARGE]: 16,
		[RADIUS.X_SMALL]: 4,
		[RADIUS.XX_LARGE]: 24,
		[RADIUS.XX_SMALL]: 2
	}
}

const buildShapeRadius = (radius: number) => ({
	bottomLeft: radius,
	bottomRight: radius,
	topLeft: radius,
	topRight: radius
})

const buildShapeRadiusSet = (value: number) => ({
	[SHAPE.ALL]: buildShapeRadius(value),
	[SHAPE.BOTTOM]: {bottomLeft: value, bottomRight: value, topLeft: 0, topRight: 0},
	[SHAPE.END]: {bottomLeft: 0, bottomRight: value, topLeft: 0, topRight: value},
	[SHAPE.START]: {bottomLeft: value, bottomRight: 0, topLeft: value, topRight: 0},
	[SHAPE.TOP]: {bottomLeft: 0, bottomRight: 0, topLeft: value, topRight: value}
})

export const createShape = (uiDensity: UIDensity = UI_DENSITY.COMPACT): Shape => {
	const radius = RADIUS_SIZE[uiDensity]

	return {
		radius: radius,
		[RADIUS.FULL]: buildShapeRadiusSet(radius[RADIUS.FULL]),
		[RADIUS.LARGE]: buildShapeRadiusSet(radius[RADIUS.LARGE]),
		[RADIUS.MEDIUM]: buildShapeRadiusSet(radius[RADIUS.MEDIUM]),
		[RADIUS.NONE]: buildShapeRadiusSet(radius[RADIUS.NONE]),
		[RADIUS.SMALL]: buildShapeRadiusSet(radius[RADIUS.SMALL]),
		[RADIUS.X_LARGE]: buildShapeRadiusSet(radius[RADIUS.X_LARGE]),
		[RADIUS.X_SMALL]: buildShapeRadiusSet(radius[RADIUS.X_SMALL]),
		[RADIUS.XX_LARGE]: buildShapeRadiusSet(radius[RADIUS.XX_LARGE]),
		[RADIUS.XX_SMALL]: buildShapeRadiusSet(radius[RADIUS.XX_SMALL])
	}
}
