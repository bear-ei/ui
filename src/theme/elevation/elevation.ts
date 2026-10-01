import type {Scheme} from '../scheme'
import {SCHEME} from '../scheme'
import type {Elevation} from './elevation.interface'

const calcOffset = (elevation: number) => {
	return elevation <= 1 ? 1 : Math.floor(elevation * 0.5)
}

const calcRadius = (elevation: number) => {
	return elevation <= 1 ? 3 : Math.floor(elevation * 1.5)
}

const calcOpacity = (elevation: number, scheme: Scheme) => {
	const base = scheme === SCHEME.DARK ? 0.05 : 0.08
	const max = scheme === SCHEME.DARK ? 0.14 : 0.18
	const factor = elevation / 12

	return +(base + (max - base) * factor).toFixed(3)
}

export const createElevation =
	(scheme: Scheme) =>
	(color: string): Elevation => ({
		shadowColor: color,
		level0: {elevation: 0, shadowOffset: {width: 0, height: 0}, shadowOpacity: 0, shadowRadius: 0},
		level1: {
			elevation: 1,
			shadowOffset: {width: 0, height: calcOffset(1)},
			shadowOpacity: calcOpacity(1, scheme),
			shadowRadius: calcRadius(1)
		},
		level2: {
			elevation: 3,
			shadowOffset: {width: 0, height: calcOffset(3)},
			shadowOpacity: calcOpacity(3, scheme),
			shadowRadius: calcRadius(3)
		},
		level3: {
			elevation: 6,
			shadowOffset: {width: 0, height: calcOffset(6)},
			shadowOpacity: calcOpacity(6, scheme),
			shadowRadius: calcRadius(6)
		},
		level4: {
			elevation: 8,
			shadowOffset: {width: 0, height: calcOffset(8)},
			shadowOpacity: calcOpacity(8, scheme),
			shadowRadius: calcRadius(8)
		},
		level5: {
			elevation: 12,
			shadowOffset: {width: 0, height: calcOffset(12)},
			shadowOpacity: calcOpacity(12, scheme),
			shadowRadius: calcRadius(12)
		}
	})
