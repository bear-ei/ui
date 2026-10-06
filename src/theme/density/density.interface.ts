import type {DENSITY_TYPE, LAYOUT_DENSITY, DENSITY_SIZE, UI_DENSITY, WINDOW_SIZE} from './density.enum'

export type UIDensity = (typeof UI_DENSITY)[keyof typeof UI_DENSITY]
export type LayoutDensity = (typeof LAYOUT_DENSITY)[keyof typeof LAYOUT_DENSITY]
export type WindowSize = (typeof WINDOW_SIZE)[keyof typeof WINDOW_SIZE]
export type DensityType = (typeof DENSITY_TYPE)[keyof typeof DENSITY_TYPE]
export type DensitySize = (typeof DENSITY_SIZE)[keyof typeof DENSITY_SIZE]
export type Spacing = Record<DensitySize, number>

export type OmitSpacing = Omit<Spacing, 'SNUG' | 'TIGHT'>
export interface Density {
	control: OmitSpacing
	icon: OmitSpacing
	inline: OmitSpacing
	inset: OmitSpacing
	layout: Record<LayoutDensity, number> & Pick<Spacing, 'NONE'>
	spacing: Spacing
	mobileGap: (windowSize: WindowSize) => number
}
