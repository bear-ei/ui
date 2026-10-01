import {UI_DENSITY, WINDOW_SIZE} from './density.enum'
import type {Spacing, UIDensity, WindowSize} from './density.interface'

const createLayoutDensity = (compact: boolean) => (spacing: Spacing) => {
	const layoutDensity = {
		[WINDOW_SIZE.COMPACT]: spacing.medium,
		[WINDOW_SIZE.EXPANDED]: spacing.large,
		[WINDOW_SIZE.EXTRA_LARGE]: spacing.large,
		[WINDOW_SIZE.LARGE]: spacing.large,
		[WINDOW_SIZE.MEDIUM]: spacing.large
	}

	return (windowSize: WindowSize) => {
		if (compact) {
			return spacing.small
		}

		return layoutDensity[windowSize]
	}
}

export const createDensity = (density: UIDensity = UI_DENSITY.COMPACT) => {
	const isCompact = density === UI_DENSITY.COMPACT
	const spacing = {
		extraLarge: isCompact ? 24 : 32,
		extraSmall: 4,
		large: isCompact ? 16 : 24,
		medium: isCompact ? 12 : 16,
		none: 0,
		small: 8
	}

	const inset = {
		extraLarge: isCompact ? 20 : 24,
		extraSmall: isCompact ? 4 : 8,
		large: isCompact ? 16 : 20,
		medium: isCompact ? 12 : 16,
		none: 0,
		small: isCompact ? 8 : 12
	}

	const size = {
		control: {
			none: 0,
			extraLarge: isCompact ? 40 : 56,
			extraSmall: isCompact ? 24 : 32,
			large: isCompact ? 36 : 48,
			medium: isCompact ? 32 : 40,
			small: isCompact ? 28 : 36
		},
		layout: {
			detailPanelWidth: isCompact ? 260 : 320,
			navigationWidth: isCompact ? 44 : 64,
			sidebarWidth: isCompact ? 220 : 280
		}
	}

	const icon = {
		extraLarge: isCompact ? 24 : 28,
		extraSmall: isCompact ? 14 : 16,
		large: isCompact ? 20 : 24,
		medium: isCompact ? 18 : 20,
		none: 0,
		small: isCompact ? 16 : 18
	}

	return {spacing, inset, size, icon, layoutDensity: createLayoutDensity(isCompact)(spacing)}
}
