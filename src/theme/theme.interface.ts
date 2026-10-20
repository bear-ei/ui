import type {DensitySizeScale} from './density'
import type {RadiusType, ShapeType} from './shape'
import type {PLATFORM} from './theme.enum'

export type Platform = (typeof PLATFORM)[keyof typeof PLATFORM]

export interface ThemeProps {
	radius?: RadiusType
	shape?: ShapeType
	size?: DensitySizeScale
}
