import {SIZE} from '../theme.enum'

export const WINDOW_SIZE = {
	COMPACT: 'COMPACT',
	EXPANDED: 'EXPANDED',
	X_LARGE: 'X_LARGE',
	XX_LARGE: 'XX_LARGE',
	LARGE: 'LARGE',
	MEDIUM: 'MEDIUM'
} as const

export const UI_DENSITY = {
	COMPACT: 'COMPACT',
	COMFORTABLE: 'COMFORTABLE'
} as const

export const DENSITY_TYPE = {
	CONTROL: 'CONTROL',
	ICON: 'ICON',
	INLINE: 'INLINE',
	INSET: 'INSET',
	LAYOUT: 'LAYOUT',
	SPACING: 'SPACING'
} as const

export const LAYOUT_DENSITY = {
	NAVIGATION: 'NAVIGATION',
	SIDEBAR: 'SIDEBAR'
} as const

export const SPACING = {
	...SIZE,
	SNUG: 'SNUG',
	TIGHT: 'TIGHT'
} as const
