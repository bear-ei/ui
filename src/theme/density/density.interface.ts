import type {UI_DENSITY, WINDOW_SIZE} from './density.enum'

export type UIDensity = (typeof UI_DENSITY)[keyof typeof UI_DENSITY]
export type WindowSize = (typeof WINDOW_SIZE)[keyof typeof WINDOW_SIZE]
export interface Spacing {
	extraLarge: number
	extraSmall: number
	large: number
	medium: number
	none: number
	small: number
}

export interface Density {
	spacing: Spacing
	inset: Spacing
	size: {
		control: Spacing
		layout: {
			navigationWidth: number
			sidebarWidth: number
			detailPanelWidth: number
		}
	}
	layoutDensity: (windowSize: WindowSize) => number
	icon: Spacing
}
