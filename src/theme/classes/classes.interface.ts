import type {ClassValue} from 'clsx'

import type {Orientation} from '../../constants'
import type {DensitySize, DensityType} from '../density'
import type {RadiusType, ShapeType} from '../shape'
import type {TypographySize, TypographyType} from '../typography'

export interface TypographyClassesOptions {
	colorClasses?: string
	fontFamilyClasses?: string
}

export interface Classes {
	classNames: (...inputs: ClassValue[]) => string
	densityClasses: (
		type: Exclude<DensityType, 'LAYOUT'>,
		orientation?: Orientation
	) => (size?: Exclude<DensitySize, 'TIGHT' | 'SNUG'> | number) => string

	shapeClasses: (shape?: ShapeType) => (radius?: RadiusType) => string
	typographyClasses: (
		typography?: TypographyType,
		options?: TypographyClassesOptions
	) => (size?: TypographySize) => string
}
