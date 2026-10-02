import {SIZE} from '../theme.enum'
import {UI_DENSITY, WINDOW_SIZE} from './density.enum'
import type {Density, Spacing, UIDensity, WindowSize} from './density.interface'

const createLayoutDensity = (compact: boolean) => (spacing: Spacing) => {
	const layoutDensity = {
		[WINDOW_SIZE.COMPACT]: spacing[SIZE.MEDIUM],
		[WINDOW_SIZE.EXPANDED]: spacing[SIZE.LARGE],
		[WINDOW_SIZE.EXTRA_LARGE]: spacing[SIZE.LARGE],
		[WINDOW_SIZE.LARGE]: spacing[SIZE.LARGE],
		[WINDOW_SIZE.MEDIUM]: spacing[SIZE.LARGE]
	}

	return (windowSize: WindowSize) => {
		if (compact) {
			return spacing[SIZE.SMALL]
		}

		return layoutDensity[windowSize]
	}
}

export const createDensity = (density: UIDensity = UI_DENSITY.COMPACT): Density => {
	const isCompact = density === UI_DENSITY.COMPACT
	const spacing = {
		[SIZE.EXTRA_LARGE]: isCompact ? 24 : 32,
		[SIZE.EXTRA_SMALL]: 4,
		[SIZE.LARGE]: isCompact ? 16 : 24,
		[SIZE.MEDIUM]: isCompact ? 12 : 16,
		[SIZE.NONE]: 0,
		[SIZE.SMALL]: 8
	}

	const inset = {
		[SIZE.EXTRA_LARGE]: isCompact ? 20 : 24,
		[SIZE.EXTRA_SMALL]: isCompact ? 4 : 8,
		[SIZE.LARGE]: isCompact ? 16 : 20,
		[SIZE.MEDIUM]: isCompact ? 12 : 16,
		[SIZE.NONE]: 0,
		[SIZE.SMALL]: isCompact ? 8 : 12
	}

	const control = {
		[SIZE.NONE]: 0,
		[SIZE.EXTRA_LARGE]: isCompact ? 40 : 56,
		[SIZE.EXTRA_SMALL]: isCompact ? 24 : 32,
		[SIZE.LARGE]: isCompact ? 36 : 48,
		[SIZE.MEDIUM]: isCompact ? 32 : 40,
		[SIZE.SMALL]: isCompact ? 28 : 36
	}

	const layout = {
		[SIZE.NONE]: 0,
		detailPanelWidth: isCompact ? 260 : 320,
		navigationWidth: isCompact ? 44 : 64,
		sidebarWidth: isCompact ? 220 : 280
	}

	const icon = {
		[SIZE.EXTRA_LARGE]: isCompact ? 24 : 28,
		[SIZE.EXTRA_SMALL]: isCompact ? 14 : 16,
		[SIZE.LARGE]: isCompact ? 20 : 24,
		[SIZE.MEDIUM]: isCompact ? 18 : 20,
		[SIZE.NONE]: 0,
		[SIZE.SMALL]: isCompact ? 16 : 18
	}

	const inline = {
		[SIZE.NONE]: 0,
		[SIZE.EXTRA_LARGE]: isCompact ? 40 : 56,
		[SIZE.EXTRA_SMALL]: isCompact ? 24 : 32,
		[SIZE.LARGE]: isCompact ? 36 : 48,
		[SIZE.MEDIUM]: isCompact ? 32 : 40,
		[SIZE.SMALL]: isCompact ? 28 : 36
	}

	return {spacing, inset, control, icon, layout, inline, layoutDensity: createLayoutDensity(isCompact)(spacing)}
}
