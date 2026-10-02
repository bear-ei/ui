import type {ClassValue} from 'clsx'
import type {LayoutType} from '../../constants'
import type {DensityType} from '../density'
import type {ShapeType} from '../shape'
import type {TypographyType} from '../typography'
import type {Size} from '../theme.interface'

export interface TypographyClassesOptions {
	colorClasses?: string
	fontFamilyClasses?: string
}

export interface Classes {
	classesName: (...inputs: ClassValue[]) => string
	densityClasses: (layout?: LayoutType) => (type: DensityType) => (size?: Size | number) => string
	shapeClasses: (shape?: ShapeType) => string
	typographyClasses: (
		typography?: TypographyType
	) => (size?: Exclude<Size, 'NONE'>) => (options?: TypographyClassesOptions) => string
}
