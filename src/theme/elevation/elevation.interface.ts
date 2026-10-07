import type {ELEVATION_LEVEL} from './elevation.enum'

export type ElevationLevel = (typeof ELEVATION_LEVEL)[keyof typeof ELEVATION_LEVEL]
export interface Shadow {
	elevation: number
	shadowOffset: {height: number; width: number}
	shadowOpacity: number
	shadowRadius: number
}

export type Elevation = Record<ElevationLevel, Shadow>
export interface ShadowSpec {
	offset: number
	opacity: number
	radius: number
}
