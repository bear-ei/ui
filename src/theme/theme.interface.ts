import type {DensitySizeScale} from './density'
import type {RadiusType, ShapeType} from './shape'
import type {TARGET_PLATFORM} from './theme.enum'

export type TargetPlatform = (typeof TARGET_PLATFORM)[keyof typeof TARGET_PLATFORM]
export interface ThemeableProps {
	radius?: RadiusType
	shape?: ShapeType
	size?: DensitySizeScale
}
