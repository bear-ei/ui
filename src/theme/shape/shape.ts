import {SHAPE} from './shape.enum'
import type {Shape} from './shape.interface'

export const createShape = (): Shape => ({
	[SHAPE.TINY_SMALL]: {
		bottomLeft: 2,
		bottomRight: 2,
		topLeft: 2,
		topRight: 2
	},
	[SHAPE.TINY_SMALL_BOTTOM]: {
		bottomLeft: 2,
		bottomRight: 2,
		topLeft: 0,
		topRight: 0
	},
	[SHAPE.TINY_SMALL_END]: {
		bottomLeft: 0,
		bottomRight: 2,
		topLeft: 0,
		topRight: 2
	},
	[SHAPE.TINY_SMALL_START]: {
		bottomLeft: 2,
		bottomRight: 0,
		topLeft: 2,
		topRight: 0
	},
	[SHAPE.TINY_SMALL_TOP]: {
		bottomLeft: 0,
		bottomRight: 0,
		topLeft: 2,
		topRight: 2
	},
	[SHAPE.EXTRA_SMALL]: {
		bottomLeft: 4,
		bottomRight: 4,
		topLeft: 4,
		topRight: 4
	},
	[SHAPE.EXTRA_SMALL_BOTTOM]: {
		bottomLeft: 4,
		bottomRight: 4,
		topLeft: 0,
		topRight: 0
	},
	[SHAPE.EXTRA_SMALL_END]: {
		bottomLeft: 0,
		bottomRight: 4,
		topLeft: 0,
		topRight: 4
	},
	[SHAPE.EXTRA_SMALL_START]: {
		bottomLeft: 4,
		bottomRight: 0,
		topLeft: 4,
		topRight: 0
	},
	[SHAPE.EXTRA_SMALL_TOP]: {
		bottomLeft: 0,
		bottomRight: 0,
		topLeft: 4,
		topRight: 4
	},
	[SHAPE.SMALL]: {
		bottomLeft: 8,
		bottomRight: 8,
		topLeft: 8,
		topRight: 8
	},
	[SHAPE.SMALL_BOTTOM]: {
		bottomLeft: 8,
		bottomRight: 8,
		topLeft: 0,
		topRight: 0
	},
	[SHAPE.SMALL_END]: {
		bottomLeft: 0,
		bottomRight: 8,
		topLeft: 0,
		topRight: 8
	},
	[SHAPE.SMALL_START]: {
		bottomLeft: 8,
		bottomRight: 0,
		topLeft: 8,
		topRight: 0
	},
	[SHAPE.SMALL_TOP]: {
		bottomLeft: 0,
		bottomRight: 0,
		topLeft: 8,
		topRight: 8
	},
	[SHAPE.MEDIUM]: {
		bottomLeft: 12,
		bottomRight: 12,
		topLeft: 12,
		topRight: 12
	},
	[SHAPE.MEDIUM_BOTTOM]: {
		bottomLeft: 12,
		bottomRight: 12,
		topLeft: 0,
		topRight: 0
	},
	[SHAPE.MEDIUM_END]: {
		bottomLeft: 0,
		bottomRight: 12,
		topLeft: 0,
		topRight: 12
	},
	[SHAPE.MEDIUM_START]: {
		bottomLeft: 12,
		bottomRight: 0,
		topLeft: 12,
		topRight: 0
	},
	[SHAPE.MEDIUM_TOP]: {
		bottomLeft: 0,
		bottomRight: 0,
		topLeft: 12,
		topRight: 12
	},
	[SHAPE.LARGE]: {
		bottomLeft: 16,
		bottomRight: 16,
		topLeft: 16,
		topRight: 16
	},
	[SHAPE.LARGE_BOTTOM]: {
		bottomLeft: 16,
		bottomRight: 16,
		topLeft: 0,
		topRight: 0
	},
	[SHAPE.LARGE_END]: {
		bottomLeft: 0,
		bottomRight: 16,
		topLeft: 0,
		topRight: 16
	},
	[SHAPE.LARGE_START]: {
		bottomLeft: 16,
		bottomRight: 0,
		topLeft: 16,
		topRight: 0
	},
	[SHAPE.LARGE_TOP]: {
		bottomLeft: 0,
		bottomRight: 0,
		topLeft: 16,
		topRight: 16
	},
	[SHAPE.EXTRA_LARGE]: {
		bottomLeft: 28,
		bottomRight: 28,
		topLeft: 28,
		topRight: 28
	},
	[SHAPE.EXTRA_LARGE_BOTTOM]: {
		bottomLeft: 28,
		bottomRight: 28,
		topLeft: 0,
		topRight: 0
	},
	[SHAPE.EXTRA_LARGE_END]: {
		bottomLeft: 0,
		bottomRight: 28,
		topLeft: 0,
		topRight: 28
	},
	[SHAPE.EXTRA_LARGE_START]: {
		bottomLeft: 28,
		bottomRight: 0,
		topLeft: 28,
		topRight: 0
	},
	[SHAPE.EXTRA_LARGE_TOP]: {
		bottomLeft: 0,
		bottomRight: 0,
		topLeft: 28,
		topRight: 28
	},
	[SHAPE.FULL]: {
		bottomLeft: 9999,
		bottomRight: 9999,
		topLeft: 9999,
		topRight: 9999
	},
	[SHAPE.FULL_BOTTOM]: {
		bottomLeft: 9999,
		bottomRight: 9999,
		topLeft: 0,
		topRight: 0
	},
	[SHAPE.FULL_END]: {
		bottomLeft: 0,
		bottomRight: 9999,
		topLeft: 0,
		topRight: 9999
	},
	[SHAPE.FULL_START]: {
		bottomLeft: 9999,
		bottomRight: 0,
		topLeft: 9999,
		topRight: 0
	},
	[SHAPE.FULL_TOP]: {
		bottomLeft: 0,
		bottomRight: 0,
		topLeft: 9999,
		topRight: 9999
	},
	[SHAPE.NONE]: {
		bottomLeft: 0,
		bottomRight: 0,
		topLeft: 0,
		topRight: 0
	}
})
