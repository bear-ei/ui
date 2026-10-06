import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'
import {LAYOUT, type LayoutType} from '../../constants'
import {DENSITY_TYPE, type DensityType} from '../density'
import {RADIUS, SHAPE, type RadiusType, type ShapeType} from '../shape'
import {TYPOGRAPHY, type TypographySize, type TypographyType} from '../typography'
import type {TypographyClassesOptions} from './classes.interface'
import {SIZE} from '../theme.enum'
import type {Size} from '../theme.interface'

const SHAPE_TYPE = {
	[RADIUS.XX_LARGE]: {
		[SHAPE.ALL]: 'rounded-[--radius-xx-large]',
		[SHAPE.TOP]: 'rounded-t-[--radius-xx-large] rounded-b-[--radius-none]',
		[SHAPE.BOTTOM]: 'rounded-t-[--radius-none] rounded-b-[--radius-xx-large]',
		[SHAPE.START]: 'rounded-l-[--radius-xx-large] rounded-r-[--radius-none]',
		[SHAPE.END]: 'rounded-l-[--radius-none] rounded-r-[--radius-xx-large]'
	},
	[RADIUS.XX_SMALL]: {
		[SHAPE.ALL]: 'rounded-[--radius-xx-small]',
		[SHAPE.TOP]: 'rounded-t-[--radius-xx-small] rounded-b-[--radius-none]',
		[SHAPE.BOTTOM]: 'rounded-t-[--radius-none] rounded-b-[--radius-xx-small]',
		[SHAPE.START]: 'rounded-l-[--radius-xx-small] rounded-r-[--radius-none]',
		[SHAPE.END]: 'rounded-l-[--radius-none] rounded-r-[--radius-xx-small]'
	},
	[RADIUS.FULL]: {
		[SHAPE.ALL]: 'rounded-[--radius-full]',
		[SHAPE.TOP]: 'rounded-t-[--radius-full] rounded-b-[--radius-none]',
		[SHAPE.BOTTOM]: 'rounded-t-[--radius-none] rounded-b-[--radius-full]',
		[SHAPE.START]: 'rounded-l-[--radius-full] rounded-r-[--radius-none]',
		[SHAPE.END]: 'rounded-l-[--radius-none] rounded-r-[--radius-full]'
	},
	[RADIUS.X_LARGE]: {
		[SHAPE.ALL]: 'rounded-[--radius-x-large]',
		[SHAPE.TOP]: 'rounded-t-[--radius-x-large] rounded-b-[--radius-none]',
		[SHAPE.BOTTOM]: 'rounded-t-[--radius-none] rounded-b-[--radius-x-large]',
		[SHAPE.START]: 'rounded-l-[--radius-x-large] rounded-r-[--radius-none]',
		[SHAPE.END]: 'rounded-l-[--radius-none] rounded-r-[--radius-x-large]'
	},
	[RADIUS.X_SMALL]: {
		[SHAPE.ALL]: 'rounded-[--radius-x-small]',
		[SHAPE.TOP]: 'rounded-t-[--radius-x-small] rounded-b-[--radius-none]',
		[SHAPE.BOTTOM]: 'rounded-t-[--radius-none] rounded-b-[--radius-x-small]',
		[SHAPE.START]: 'rounded-l-[--radius-x-small] rounded-r-[--radius-none]',
		[SHAPE.END]: 'rounded-l-[--radius-none] rounded-r-[--radius-x-small]'
	},
	[RADIUS.LARGE]: {
		[SHAPE.ALL]: 'rounded-[--radius-large]',
		[SHAPE.TOP]: 'rounded-t-[--radius-large] rounded-b-[--radius-none]',
		[SHAPE.BOTTOM]: 'rounded-t-[--radius-none] rounded-b-[--radius-large]',
		[SHAPE.START]: 'rounded-l-[--radius-large] rounded-r-[--radius-none]',
		[SHAPE.END]: 'rounded-l-[--radius-none] rounded-r-[--radius-large]'
	},
	[RADIUS.MEDIUM]: {
		[SHAPE.ALL]: 'rounded-[--radius-medium]',
		[SHAPE.TOP]: 'rounded-t-[--radius-medium] rounded-b-[--radius-none]',
		[SHAPE.BOTTOM]: 'rounded-t-[--radius-none] rounded-b-[--radius-medium]',
		[SHAPE.START]: 'rounded-l-[--radius-medium] rounded-r-[--radius-none]',
		[SHAPE.END]: 'rounded-l-[--radius-none] rounded-r-[--radius-medium]'
	},
	[RADIUS.NONE]: {
		[SHAPE.ALL]: 'rounded-[--radius-none]',
		[SHAPE.TOP]: 'rounded-t-[--radius-none] rounded-b-[--radius-none]',
		[SHAPE.BOTTOM]: 'rounded-t-[--radius-none] rounded-b-[--radius-none]',
		[SHAPE.START]: 'rounded-l-[--radius-none] rounded-r-[--radius-none]',
		[SHAPE.END]: 'rounded-l-[--radius-none] rounded-r-[--radius-none]'
	},
	[RADIUS.SMALL]: {
		[SHAPE.ALL]: 'rounded-[--radius-small]',
		[SHAPE.TOP]: 'rounded-t-[--radius-small] rounded-b-[--radius-none]',
		[SHAPE.BOTTOM]: 'rounded-t-[--radius-none] rounded-b-[--radius-small]',
		[SHAPE.START]: 'rounded-l-[--radius-small] rounded-r-[--radius-none]',
		[SHAPE.END]: 'rounded-l-[--radius-none] rounded-r-[--radius-small]'
	}
}

const TYPOGRAPHY_TYPE = {
	[TYPOGRAPHY.DISPLAY]: {
		[SIZE.LARGE]:
			'text-[length:var(--typography-display-large-size)] h-[--typography-display-large-height] leading-[--typography-display-large-line-height] tracking-[--typography-display-large-letter-spacing] --typography-display-large-style font-[--typography-display-large-weight]',
		[SIZE.MEDIUM]:
			'text-[length:var(--typography-display-medium-size)] h-[--typography-display-medium-height] leading-[--typography-display-medium-line-height] tracking-[--typography-display-medium-letter-spacing] --typography-display-medium-style font-[--typography-display-medium-weight]',
		[SIZE.SMALL]:
			'text-[length:var(--typography-display-small-size)] h-[--typography-display-small-height] leading-[--typography-display-small-line-height] tracking-[--typography-display-small-letter-spacing] --typography-display-small-style font-[--typography-display-small-weight]'
	},
	[TYPOGRAPHY.HEADLINE]: {
		[SIZE.LARGE]:
			'text-[--typography-headline-large-size] h-[--typography-headline-large-height] leading-[--typography-headline-large-line-height] tracking-[--typography-headline-large-letter-spacing] --typography-headline-large-style font-[--typography-headline-large-weight]',
		[SIZE.MEDIUM]:
			'text-[--typography-headline-medium-size] h-[--typography-headline-medium-height] leading-[--typography-headline-medium-line-height] tracking-[--typography-headline-medium-letter-spacing] --typography-headline-medium-style font-[--typography-headline-medium-weight]',
		[SIZE.SMALL]:
			'text-[--typography-headline-small-size] h-[--typography-headline-small-height] leading-[--typography-headline-small-line-height] tracking-[--typography-headline-small-letter-spacing] --typography-headline-small-style font-[--typography-headline-small-weight]'
	},
	[TYPOGRAPHY.TITLE]: {
		[SIZE.LARGE]:
			'text-[length:var(--typography-title-large-size)] h-[--typography-title-large-height] leading-[--typography-title-large-line-height] tracking-[--typography-title-large-letter-spacing] --typography-title-large-style font-[--typography-title-large-weight]',
		[SIZE.MEDIUM]:
			'text-[length:var(--typography-title-medium-size)] h-[--typography-title-medium-height] leading-[--typography-title-medium-line-height] tracking-[--typography-title-medium-letter-spacing] --typography-title-medium-style font-[--typography-title-medium-weight]',
		[SIZE.SMALL]:
			'text-[length:var(--typography-title-small-size)] h-[--typography-title-small-height] leading-[--typography-title-small-line-height] tracking-[--typography-title-small-letter-spacing] --typography-title-small-style font-[--typography-title-small-weight]'
	},
	[TYPOGRAPHY.BODY]: {
		[SIZE.LARGE]:
			'text-[length:var(--typography-body-large-size)] h-[--typography-body-large-height] leading-[--typography-body-large-line-height] tracking-[--typography-body-large-letter-spacing] --typography-body-large-style font-[--typography-body-large-weight]',
		[SIZE.MEDIUM]:
			'text-[length:var(--typography-body-medium-size)] h-[--typography-body-medium-height] leading-[--typography-body-medium-line-height] tracking-[--typography-body-medium-letter-spacing] --typography-body-medium-style font-[--typography-body-medium-weight]',
		[SIZE.SMALL]:
			'text-[length:var(--typography-body-small-size)] h-[--typography-body-small-height] leading-[--typography-body-small-line-height] tracking-[--typography-body-small-letter-spacing] --typography-body-small-style font-[--typography-body-small-weight]'
	},
	[TYPOGRAPHY.LABEL]: {
		[SIZE.LARGE]:
			'text-[length:var(--typography-label-large-size)] h-[--typography-label-large-height] leading-[--typography-label-large-line-height] tracking-[--typography-label-large-letter-spacing] --typography-label-large-style font-[--typography-label-large-weight]',
		[SIZE.MEDIUM]:
			'text-[length:var(--typography-label-medium-size)] h-[--typography-label-medium-height] leading-[--typography-label-medium-line-height] tracking-[--typography-label-medium-letter-spacing] --typography-label-medium-style font-[--typography-label-medium-weight]',
		[SIZE.SMALL]:
			'text-[length:var(--typography-label-small-size)] h-[--typography-label-small-height] leading-[--typography-label-small-line-height] tracking-[--typography-label-small-letter-spacing] --typography-label-small-style font-[--typography-label-small-weight]'
	}
}

const DENSITY_CONTROL = {
	[SIZE.LARGE]: 'h-[--density-control-large] w-[--density-control-large]',
	[SIZE.MEDIUM]: 'h-[--density-control-medium] w-[--density-control-medium]',
	[SIZE.NONE]: 'h-[--density-control-none] w-[--density-control-none]',
	[SIZE.SMALL]: 'h-[--density-control-small] w-[--density-control-small]',
	[SIZE.X_LARGE]: 'h-[--density-control-x-large] w-[--density-control-x-large]',
	[SIZE.X_SMALL]: 'h-[--density-control-x-small] w-[--density-control-x-small]',
	[SIZE.XX_LARGE]: 'h-[--density-control-xx-large] w-[--density-control-xx-large]'
}

const DENSITY_INLINE = {
	[SIZE.LARGE]: 'h-[--density-inline-large] w-[--density-inline-large]',
	[SIZE.MEDIUM]: 'h-[--density-inline-medium] w-[--density-inline-medium]',
	[SIZE.NONE]: 'h-[--density-inline-none] w-[--density-inline-none]',
	[SIZE.SMALL]: 'h-[--density-inline-small] w-[--density-inline-small]',
	[SIZE.X_LARGE]: 'h-[--density-inline-x-large] w-[--density-inline-x-large]',
	[SIZE.X_SMALL]: 'h-[--density-inline-x-small] w-[--density-inline-x-small]',
	[SIZE.XX_LARGE]: 'h-[--density-inline-xx-large] w-[--density-inline-xx-large]'
}

const DENSITY_INSET = {
	[LAYOUT.HORIZONTAL]: {
		[SIZE.LARGE]: 'pl-[--density-inset-large] pr-[--density-inset-large]',
		[SIZE.MEDIUM]: 'pl-[--density-inset-medium] pr-[--density-inset-medium]',
		[SIZE.NONE]: 'pl-[--density-inset-none] pr-[--density-inset-none]',
		[SIZE.SMALL]: 'pl-[--density-inset-small] pr-[--density-inset-small]',
		[SIZE.X_LARGE]: 'pl-[--density-inset-x-large] pr-[--density-inset-x-large]',
		[SIZE.X_SMALL]: 'pl-[--density-inset-x-small] pr-[--density-inset-x-small]',
		[SIZE.XX_LARGE]: 'pl-[--density-inset-xx-large] pr-[--density-inset-xx-large]'
	},
	[LAYOUT.VERTICAL]: {
		[SIZE.LARGE]: 'pt-[--density-inset-large] pb-[--density-inset-large]',
		[SIZE.MEDIUM]: 'pt-[--density-inset-medium] pb-[--density-inset-medium]',
		[SIZE.NONE]: 'pt-[--density-inset-none] pb-[--density-inset-none]',
		[SIZE.SMALL]: 'pt-[--density-inset-small] pb-[--density-inset-small]',
		[SIZE.X_LARGE]: 'pt-[--density-inset-x-large] pb-[--density-inset-x-large]',
		[SIZE.X_SMALL]: 'pt-[--density-inset-x-small] pb-[--density-inset-x-small]',
		[SIZE.XX_LARGE]: 'pt-[--density-inset-xx-large] pb-[--density-inset-xx-large]'
	}
}

const DENSITY_SPACING = {
	[LAYOUT.HORIZONTAL]: {
		[SIZE.LARGE]: 'ml-[--density-spacing-large] mr-[--density-spacing-large]',
		[SIZE.MEDIUM]: 'ml-[--density-spacing-medium] mr-[--density-spacing-medium]',
		[SIZE.NONE]: 'ml-[--density-spacing-none] mr-[--density-spacing-none]',
		[SIZE.SMALL]: 'ml-[--density-spacing-small] mr-[--density-spacing-small]',
		[SIZE.X_LARGE]: 'ml-[--density-spacing-x-large] mr-[--density-spacing-x-large]',
		[SIZE.X_SMALL]: 'ml-[--density-spacing-x-small] mr-[--density-spacing-x-small]',
		[SIZE.XX_LARGE]: 'ml-[--density-inset-xx-large] mr-[--density-inset-xx-large]'
	},
	[LAYOUT.VERTICAL]: {
		[SIZE.LARGE]: 'mt-[--density-spacing-large] mb-[--density-inset-large]',
		[SIZE.MEDIUM]: 'mt-[--density-spacing-medium] mb-[--density-inset-medium]',
		[SIZE.NONE]: 'mt-[--density-spacing-none] mb-[--density-spacing-none]',
		[SIZE.SMALL]: 'mt-[--density-spacing-small] mb-[--density-inset-small]',
		[SIZE.X_LARGE]: 'mt-[--density-spacing-extra-large] mb-[--density-spacing-extra-large]',
		[SIZE.X_SMALL]: 'mt-[--density-spacing-extra-small] mb-[--density-spacing-extra-small]',
		[SIZE.XX_LARGE]: 'mt-[--density-inset-xx-large] mb-[--density-inset-xx-large]'
	}
}

const DENSITY = {
	[DENSITY_TYPE.CONTROL]: DENSITY_CONTROL,
	[DENSITY_TYPE.ICON]: DENSITY_CONTROL,
	[DENSITY_TYPE.INLINE]: DENSITY_INLINE,
	[DENSITY_TYPE.INSET]: DENSITY_INSET,
	[DENSITY_TYPE.LAYOUT]: DENSITY_CONTROL,
	[DENSITY_TYPE.SPACING]: DENSITY_SPACING
}

const classesName = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
const densityClasses =
	(layout: LayoutType = LAYOUT.HORIZONTAL) =>
	(type: DensityType) =>
	(size: Size | number = SIZE.MEDIUM) => {
		if (typeof size === 'number') {
			return ''
		}

		if (([DENSITY_TYPE.INSET, DENSITY_TYPE.SPACING] as readonly DensityType[]).includes(type)) {
			return (DENSITY[type] as typeof DENSITY_SPACING)[layout][size]
		}

		return (DENSITY[type] as typeof DENSITY_CONTROL)[size]
	}

const shapeClasses =
	(radius: RadiusType = RADIUS.NONE) =>
	(shape: ShapeType = SHAPE.ALL) =>
		SHAPE_TYPE[radius][shape]

const typographyClasses =
	(typography: TypographyType = TYPOGRAPHY.BODY) =>
	(size: TypographySize = SIZE.MEDIUM) =>
	(
		{
			colorClasses = 'text-[--color-on-surface]',
			fontFamilyClasses = 'font-[family-name:var(--font-family)]'
		} = {} as TypographyClassesOptions
	) =>
		clsx(TYPOGRAPHY_TYPE[typography][size], fontFamilyClasses, colorClasses)

export {classesName, densityClasses, shapeClasses, typographyClasses}
