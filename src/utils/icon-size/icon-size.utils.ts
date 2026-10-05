import {SIZE, type Size, type Token} from '../../theme'

export const processIconSize = (token: Token) => (size: Size) => {
	const iconSize = {
		[SIZE.LARGE]: token.density.icon[SIZE.MEDIUM],
		[SIZE.MEDIUM]: token.density.icon[SIZE.SMALL],
		[SIZE.NONE]: token.density.icon[SIZE.NONE],
		[SIZE.SMALL]: token.density.icon[SIZE.X_SMALL],
		[SIZE.X_LARGE]: token.density.icon[SIZE.LARGE],
		[SIZE.X_SMALL]: Math.round(token.density.icon[SIZE.X_SMALL] * 0.85), // 0.85 scale: Desktop 14→12, Mobile 16→14
		[SIZE.XX_LARGE]: token.density.icon[SIZE.X_LARGE]
	}

	return iconSize[size]
}
