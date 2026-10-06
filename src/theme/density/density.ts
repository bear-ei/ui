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
		[UI_DENSITY.COMPACT]: {
			[SPACING.LARGE]: 16,
			[SPACING.MEDIUM]: 12,
			[SPACING.NONE]: 0,
			[SPACING.SMALL]: 8,
			[SPACING.X_LARGE]: 20,
			[SPACING.X_SMALL]: 4,
			[SPACING.XX_LARGE]: 24
		},
		[UI_DENSITY.COMFORTABLE]: {
			[SPACING.LARGE]: 20,
			[SPACING.MEDIUM]: 16,
			[SPACING.NONE]: 0,
			[SPACING.SMALL]: 12,
			[SPACING.X_LARGE]: 24,
			[SPACING.X_SMALL]: 8,
			[SPACING.XX_LARGE]: 28
		}
	}

	const control = {
		[UI_DENSITY.COMPACT]: {
			[SIZE.LARGE]: 36,
			[SIZE.MEDIUM]: 32,
			[SIZE.NONE]: 0,
			[SIZE.SMALL]: 28,
			[SIZE.X_LARGE]: 40,
			[SIZE.X_SMALL]: 24,
			[SIZE.XX_LARGE]: 48
		},
		[UI_DENSITY.COMFORTABLE]: {
			[SIZE.LARGE]: 48,
			[SIZE.MEDIUM]: 40,
			[SIZE.NONE]: 0,
			[SIZE.SMALL]: 36,
			[SIZE.X_LARGE]: 56,
			[SIZE.X_SMALL]: 32,
			[SIZE.XX_LARGE]: 64
		}
	}

	const layout = {
		[UI_DENSITY.COMPACT]: {
			[SIZE.NONE]: 0,
			[LAYOUT_DENSITY.NAVIGATION]: 72,
			[LAYOUT_DENSITY.SIDEBAR]: 280
		},
		[UI_DENSITY.COMFORTABLE]: {
			[SIZE.NONE]: 0,
			[LAYOUT_DENSITY.NAVIGATION]: 80,
			[LAYOUT_DENSITY.SIDEBAR]: 320
		}
	}

	const icon = {
		[UI_DENSITY.COMPACT]: {
			[SPACING.LARGE]: 20,
			[SPACING.MEDIUM]: 18,
			[SPACING.NONE]: 0,
			[SPACING.SMALL]: 16,
			[SPACING.X_LARGE]: 24,
			[SPACING.X_SMALL]: 14,
			[SPACING.XX_LARGE]: 28
		},
		[UI_DENSITY.COMFORTABLE]: {
			[SPACING.LARGE]: 244,
			[SPACING.MEDIUM]: 20,
			[SPACING.NONE]: 0,
			[SPACING.SMALL]: 18,
			[SPACING.X_LARGE]: 28,
			[SPACING.X_SMALL]: 16,
			[SPACING.XX_LARGE]: 32
		}
	}

	const inline = {
		[UI_DENSITY.COMPACT]: {
			[SIZE.LARGE]: 36,
			[SIZE.MEDIUM]: 32,
			[SIZE.NONE]: 0,
			[SIZE.SMALL]: 28,
			[SIZE.X_LARGE]: 40,
			[SIZE.X_SMALL]: 24,
			[SIZE.XX_LARGE]: 48
		},
		[UI_DENSITY.COMFORTABLE]: {
			[SIZE.LARGE]: 48,
			[SIZE.MEDIUM]: 40,
			[SIZE.NONE]: 0,
			[SIZE.SMALL]: 36,
			[SIZE.X_LARGE]: 56,
			[SIZE.X_SMALL]: 32,
			[SIZE.XX_LARGE]: 64
		}
	}

	return {
		spacing,
		inset: inset[density],
		control: control[density],
		icon: icon[density],
		layout: layout[density],
		inline: inline[density],
		mobileGap: createMobileGap(spacing)
	}
}
