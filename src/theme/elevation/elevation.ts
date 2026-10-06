import {UI_DENSITY, type UIDensity} from '../density'
import {ELEVATION_LEVEL} from './elevation.enum'
import type {Elevation, Shadow, ShadowSpec} from './elevation.interface'

const SHADOW_TABLE = {
	[UI_DENSITY.COMPACT]: {
		[ELEVATION_LEVEL.LEVEL_0]: {offset: 0, radius: 0, opacity: 0},
		[ELEVATION_LEVEL.LEVEL_1]: {borderWidth: 0.5, offset: 1, radius: 2, opacity: 0.06},
		[ELEVATION_LEVEL.LEVEL_2]: {borderWidth: 0.5, offset: 2, radius: 4, opacity: 0.08},
		[ELEVATION_LEVEL.LEVEL_3]: {borderWidth: 0.5, offset: 3, radius: 8, opacity: 0.1},
		[ELEVATION_LEVEL.LEVEL_4]: {borderWidth: 0.5, offset: 4, radius: 12, opacity: 0.12},
		[ELEVATION_LEVEL.LEVEL_5]: {borderWidth: 0.5, offset: 6, radius: 16, opacity: 0.14}
	},
	[UI_DENSITY.COMFORTABLE]: {
		[ELEVATION_LEVEL.LEVEL_0]: {offset: 0, radius: 0, opacity: 0},
		[ELEVATION_LEVEL.LEVEL_1]: {offset: 1, radius: 2, opacity: 0.08},
		[ELEVATION_LEVEL.LEVEL_2]: {offset: 2, radius: 4, opacity: 0.1},
		[ELEVATION_LEVEL.LEVEL_3]: {offset: 3, radius: 8, opacity: 0.12},
		[ELEVATION_LEVEL.LEVEL_4]: {offset: 4, radius: 12, opacity: 0.14},
		[ELEVATION_LEVEL.LEVEL_5]: {offset: 6, radius: 16, opacity: 0.16}
	}
}

const createShadow =
	(spec: ShadowSpec) =>
	(elevation: number) =>
	(borderColor?: string): Shadow => ({
		...(spec.borderWidth && borderColor && {borderColor, borderWidth: spec.borderWidth}),
		elevation,
		shadowOffset: {height: spec.offset, width: 0},
		shadowOpacity: spec.opacity,
		shadowRadius: spec.radius
	})

export const createElevation =
	(uiDensity: UIDensity) =>
	(borderColor?: string): Elevation => {
		const table = SHADOW_TABLE[uiDensity]
		const resolveShadow =
			(level: keyof typeof table) =>
			(elevation: number): Shadow =>
				createShadow(table[level])(elevation)(borderColor)

		return {
			[ELEVATION_LEVEL.LEVEL_0]: resolveShadow(ELEVATION_LEVEL.LEVEL_0)(0),
			[ELEVATION_LEVEL.LEVEL_1]: resolveShadow(ELEVATION_LEVEL.LEVEL_1)(1),
			[ELEVATION_LEVEL.LEVEL_2]: resolveShadow(ELEVATION_LEVEL.LEVEL_2)(2),
			[ELEVATION_LEVEL.LEVEL_3]: resolveShadow(ELEVATION_LEVEL.LEVEL_3)(3),
			[ELEVATION_LEVEL.LEVEL_4]: resolveShadow(ELEVATION_LEVEL.LEVEL_4)(4),
			[ELEVATION_LEVEL.LEVEL_5]: resolveShadow(ELEVATION_LEVEL.LEVEL_5)(5)
		}
	}
