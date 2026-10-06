import {DENSITY_SIZE, type DensitySize, type Token} from '../../theme'

export const processIconSize = (token: Token) => (size: Exclude<DensitySize, 'SNUG' | 'TIGHT'>) => {
	const iconSize = {
		[DENSITY_SIZE.LARGE]: token.density.icon[DENSITY_SIZE.MEDIUM],
		[DENSITY_SIZE.MEDIUM]: token.density.icon[DENSITY_SIZE.SMALL],
		[DENSITY_SIZE.NONE]: token.density.icon[DENSITY_SIZE.NONE],
		[DENSITY_SIZE.SMALL]: token.density.icon[DENSITY_SIZE.X_SMALL],
		[DENSITY_SIZE.X_LARGE]: token.density.icon[DENSITY_SIZE.LARGE],
		[DENSITY_SIZE.X_SMALL]: Math.round(token.density.icon[DENSITY_SIZE.X_SMALL] * 0.85), // 0.85 scale: Desktop 14→12, Mobile 16→14
		[DENSITY_SIZE.XX_LARGE]: token.density.icon[DENSITY_SIZE.X_LARGE]
	}

	return iconSize[size]
}
