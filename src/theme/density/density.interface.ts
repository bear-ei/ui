import type {Size} from '../token'
import type {DENSITY_TYPE, UI_DENSITY, WINDOW_SIZE} from './density.enum'

export type UIDensity = (typeof UI_DENSITY)[keyof typeof UI_DENSITY]
export type WindowSize = (typeof WINDOW_SIZE)[keyof typeof WINDOW_SIZE]
export type DensityType = (typeof DENSITY_TYPE)[keyof typeof DENSITY_TYPE]
export type Spacing = Record<Size, number>

export interface Density {
	control: Spacing
	icon: Spacing
	inline: Spacing
	inset: Spacing
	layout: {navigationWidth: number; sidebarWidth: number; detailPanelWidth: number} & Pick<Spacing, 'NONE'>
	layoutDensity: (windowSize: WindowSize) => number
	spacing: Spacing
}
