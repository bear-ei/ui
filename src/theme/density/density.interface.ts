import type {DENSITY_TYPE, LAYOUT_DENSITY, DENSITY_SIZE, UI_DENSITY, WINDOW_SIZE} from './density.enum'

export type DensitySize = (typeof DENSITY_SIZE)[keyof typeof DENSITY_SIZE]
export type DensityType = (typeof DENSITY_TYPE)[keyof typeof DENSITY_TYPE]
export type LayoutDensity = (typeof LAYOUT_DENSITY)[keyof typeof LAYOUT_DENSITY]
export type UIDensity = (typeof UI_DENSITY)[keyof typeof UI_DENSITY]
export type WindowSize = (typeof WINDOW_SIZE)[keyof typeof WINDOW_SIZE]
export type DensitySizeScale = Exclude<DensitySize, 'NONE' | 'SNUG' | 'TIGHT'>
export type Spacing = Record<DensitySize, number>
export type SpacingScale = Omit<Spacing, 'SNUG' | 'TIGHT'>
export interface Density {
	control: SpacingScale
	icon: SpacingScale
	inline: SpacingScale
	inset: SpacingScale
	layout: Record<LayoutDensity, number> & Pick<Spacing, 'NONE'>
	spacing: Spacing
}
