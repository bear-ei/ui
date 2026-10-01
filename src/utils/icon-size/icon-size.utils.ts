import {SIZE, type Size, type Theme} from '../../theme'

export const processIconSize = (theme: Theme) => (size: Size) => {
	const iconSize = {
		[SIZE.EXTRA_LARGE]: theme.density.icon.EXTRA_SMALL * 7,
		[SIZE.EXTRA_SMALL]: theme.density.icon.MEDIUM,
		[SIZE.LARGE]: theme.density.icon.LARGE,
		[SIZE.MEDIUM]: theme.density.icon.EXTRA_SMALL * 5,
		[SIZE.NONE]: theme.density.icon.NONE,
		[SIZE.SMALL]: theme.density.icon.MEDIUM
	}

	return iconSize[size]
}
