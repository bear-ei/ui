import {SIZE} from '../theme.enum'
import {LAYOUT_DENSITY, SPACING, UI_DENSITY, WINDOW_SIZE} from './density.enum'
import type {Density, Spacing, UIDensity, WindowSize} from './density.interface'

const createMobileGap = (spacing: Spacing) => {
	const gap = {
		[WINDOW_SIZE.COMPACT]: spacing[SPACING.MEDIUM],
		[WINDOW_SIZE.EXPANDED]: spacing[SPACING.LARGE],
		[WINDOW_SIZE.X_LARGE]: spacing[SPACING.LARGE],
		[WINDOW_SIZE.XX_LARGE]: spacing[SPACING.LARGE],
		[WINDOW_SIZE.LARGE]: spacing[SPACING.LARGE],
		[WINDOW_SIZE.MEDIUM]: spacing[SPACING.LARGE]
	}

	return (windowSize: WindowSize) => gap[windowSize]
}

export const createDensity = (density: UIDensity = UI_DENSITY.COMPACT): Density => {
	const isCompact = density === UI_DENSITY.COMPACT
	const spacing = {
		[SPACING.LARGE]: 16,
		[SPACING.MEDIUM]: 12,
		[SPACING.NONE]: 0,
		[SPACING.SMALL]: 8,
		[SPACING.SNUG]: 6,
		[SPACING.TIGHT]: 10,
		[SPACING.X_LARGE]: 24,
		[SPACING.X_SMALL]: 4,
		[SPACING.XX_LARGE]: 32
	}

	const inset = {
		[SPACING.LARGE]: isCompact ? 16 : 20,
		[SPACING.MEDIUM]: isCompact ? 12 : 16,
		[SPACING.NONE]: 0,
		[SPACING.SMALL]: isCompact ? 8 : 12,
		[SPACING.X_LARGE]: isCompact ? 20 : 24,
		[SPACING.X_SMALL]: isCompact ? 4 : 8,
		[SPACING.XX_LARGE]: isCompact ? 24 : 28
	}

	const control = {
		[SIZE.LARGE]: isCompact ? 36 : 48,
		[SIZE.MEDIUM]: isCompact ? 32 : 40,
		[SIZE.NONE]: 0,
		[SIZE.SMALL]: isCompact ? 28 : 36,
		[SIZE.X_LARGE]: isCompact ? 40 : 56,
		[SIZE.X_SMALL]: isCompact ? 24 : 32,
		[SIZE.XX_LARGE]: isCompact ? 48 : 64
	}

	const layout = {
		[SIZE.NONE]: 0,
		[LAYOUT_DENSITY.NAVIGATION]: isCompact ? 72 : 80,
		[LAYOUT_DENSITY.SIDEBAR]: isCompact ? 280 : 320
	}

	const icon = {
		[SPACING.LARGE]: isCompact ? 20 : 24,
		[SPACING.MEDIUM]: isCompact ? 18 : 20,
		[SPACING.NONE]: 0,
		[SPACING.SMALL]: isCompact ? 16 : 18,
		[SPACING.X_LARGE]: isCompact ? 24 : 28,
		[SPACING.X_SMALL]: isCompact ? 14 : 16,
		[SPACING.XX_LARGE]: isCompact ? 28 : 32
	}

	const inline = {
		[SIZE.LARGE]: isCompact ? 36 : 48,
		[SIZE.MEDIUM]: isCompact ? 32 : 40,
		[SIZE.NONE]: 0,
		[SIZE.SMALL]: isCompact ? 28 : 36,
		[SIZE.X_LARGE]: isCompact ? 40 : 56,
		[SIZE.X_SMALL]: isCompact ? 24 : 32,
		[SIZE.XX_LARGE]: isCompact ? 48 : 64
	}

	return {spacing, inset, control, icon, layout, inline, mobileGap: createMobileGap(spacing)}
}
