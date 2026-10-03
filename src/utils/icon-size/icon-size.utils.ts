import {SIZE, type Size, type Token} from '../../theme'

export const processIconSize = (token: Token) => (size: Size) => {
	const iconSize = {
		[SIZE.EXTRA_LARGE]: token.density.icon[SIZE.LARGE],
		[SIZE.EXTRA_SMALL]: Math.round(token.density.icon[SIZE.EXTRA_SMALL] * 0.85), // 0.85 scale: Desktop 14→12, Mobile 16→14
		[SIZE.LARGE]: token.density.icon[SIZE.MEDIUM],
		[SIZE.MEDIUM]: token.density.icon[SIZE.SMALL],
		[SIZE.NONE]: token.density.icon[SIZE.NONE],
		[SIZE.SMALL]: token.density.icon[SIZE.EXTRA_SMALL]
	}

	return iconSize[size]
}
