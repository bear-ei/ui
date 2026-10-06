import type {ClassValue} from 'clsx'
import type {LayoutType} from '../../constants'
import type {DensitySize, DensityType} from '../density'
import type {RadiusType, ShapeType} from '../shape'
import type {TypographySize, TypographyType} from '../typography'

export interface TypographyClassesOptions {
	colorClasses?: string
	fontFamilyClasses?: string
}

export interface Classes {
	classesName: (...inputs: ClassValue[]) => string
	densityClasses: (layout?: LayoutType) => (type: DensityType) => (size?: DensitySize | number) => string
	shapeClasses: (radius?: RadiusType) => (shape?: ShapeType) => string
	typographyClasses: (
		typography?: TypographyType
	) => (size?: TypographySize) => (options?: TypographyClassesOptions) => string
}
