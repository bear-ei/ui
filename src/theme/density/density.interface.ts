import type {Size} from '../core'
import type {UI_DENSITY, WINDOW_SIZE} from './density.enum'

export type UIDensity = (typeof UI_DENSITY)[keyof typeof UI_DENSITY]
export type WindowSize = (typeof WINDOW_SIZE)[keyof typeof WINDOW_SIZE]
export type Spacing = Record<Size, number>

export interface Density {
	control: Spacing
	icon: Spacing
	inset: Spacing
	layout: {navigationWidth: number; sidebarWidth: number; detailPanelWidth: number}
	layoutDensity: (windowSize: WindowSize) => number
	spacing: Spacing
}
