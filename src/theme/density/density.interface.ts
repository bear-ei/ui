import type {Size} from '../theme.interface'
import type {DENSITY_TYPE, LAYOUT_DENSITY, UI_DENSITY, WINDOW_SIZE} from './density.enum'

export type UIDensity = (typeof UI_DENSITY)[keyof typeof UI_DENSITY]
export type LayoutDensity = (typeof LAYOUT_DENSITY)[keyof typeof LAYOUT_DENSITY]
export type WindowSize = (typeof WINDOW_SIZE)[keyof typeof WINDOW_SIZE]
export type DensityType = (typeof DENSITY_TYPE)[keyof typeof DENSITY_TYPE]
export type Spacing = Record<Size, number>

export interface Density {
	control: Spacing
	icon: Spacing
	inline: Spacing
	inset: Spacing
	layout: Record<LayoutDensity, number> & Pick<Spacing, 'NONE'>
	layoutDensity: (windowSize: WindowSize) => number
	spacing: Spacing
}
