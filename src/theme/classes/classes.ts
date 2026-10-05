import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'
import {LAYOUT, type LayoutType} from '../../constants'
import {DENSITY_TYPE, type DensityType} from '../density'
import {SHAPE, type ShapeType} from '../shape'
import {TYPOGRAPHY, type TypographyType} from '../typography'
import type {TypographyClassesOptions} from './classes.interface'
import {SIZE} from '../theme.enum'
import type {Size} from '../theme.interface'

const SHAPE_TYPE = {
	[SHAPE.X_LARGE_BOTTOM]: 'rounded-t-[--shape-none] rounded-b-[--shape-extra-large]',
	[SHAPE.X_LARGE_END]: 'rounded-l-[--shape-none] rounded-r-[--shape-extra-large]',
	[SHAPE.X_LARGE_START]: 'rounded-l-[--shape-extra-large] rounded-r-[--shape-none]',
	[SHAPE.X_LARGE_TOP]: 'rounded-t-[--shape-extra-large] rounded-b-[--shape-none]',
	[SHAPE.X_LARGE]: 'rounded-[--shape-extra-large]',
	[SHAPE.X_SMALL_BOTTOM]: 'rounded-t-[--shape-none] rounded-b-[--shape-extra-small]',
	[SHAPE.X_SMALL_END]: 'rounded-l-none rounded-r-[--shape-extra-small]',
	[SHAPE.X_SMALL_START]: 'rounded-l-[--shape-extra-small] rounded-r-[--shape-none]',
	[SHAPE.X_SMALL_TOP]: 'rounded-t-[--shape-extra-small] rounded-b-[--shape-none]',
	[SHAPE.X_SMALL]: 'rounded-[--shape-extra-small]',
	[SHAPE.FULL_BOTTOM]: 'rounded-t-[--shape-none] rounded-b-[--shape-full]',
	[SHAPE.FULL_END]: 'rounded-l-none rounded-r-[--shape-full]',
	[SHAPE.FULL_START]: 'rounded-l-[--shape-full] rounded-r-[--shape-none]',
	[SHAPE.FULL_TOP]: 'rounded-t-[--shape-full] rounded-b-[--shape-none]',
	[SHAPE.FULL]: 'rounded-[--shape-full]',
	[SHAPE.LARGE_BOTTOM]: 'rounded-t-[--shape-none] rounded-b-[--shape-large]',
	[SHAPE.LARGE_END]: 'rounded-l-[--shape-none] rounded-r-[--shape-large]',
	[SHAPE.LARGE_START]: 'rounded-l-[--shape-large] rounded-r-[--shape-none]',
	[SHAPE.LARGE_TOP]: 'rounded-t-[--shape-large] rounded-b-[--shape-none]',
	[SHAPE.LARGE]: 'rounded-[--shape-large]',
	[SHAPE.MEDIUM_BOTTOM]: 'rounded-t-[--shape-none] rounded-b-[--shape-medium]',
	[SHAPE.MEDIUM_END]: 'rounded-l-[--shape-none] rounded-r-[--shape-medium]',
	[SHAPE.MEDIUM_START]: 'rounded-l-[--shape-medium] rounded-r-[--shape-none]',
	[SHAPE.MEDIUM_TOP]: 'rounded-t-[--shape-medium] rounded-b-[--shape-none]',
	[SHAPE.MEDIUM]: 'rounded-[--shape-medium]',
	[SHAPE.NONE]: 'rounded-[--shape-none]',
	[SHAPE.SMALL_BOTTOM]: 'rounded-t-[--shape-none] rounded-b-[--shape-small]',
	[SHAPE.SMALL_END]: 'rounded-l-[--shape-none] rounded-r-[--shape-small]',
	[SHAPE.SMALL_START]: 'rounded-l-[--shape-small] rounded-r-[--shape-none]',
	[SHAPE.SMALL_TOP]: 'rounded-t-[--shape-small] rounded-b-[--shape-none]',
	[SHAPE.SMALL]: 'rounded-[--shape-small]',
	[SHAPE.TINY_SMALL_BOTTOM]: 'rounded-t-[--shape-none] rounded-b-[--shape-tiny-small]',
	[SHAPE.TINY_SMALL_END]: 'rounded-l-[--shape-none] rounded-r-[--shape-tiny-small]',
	[SHAPE.TINY_SMALL_START]: 'rounded-l-[--shape-tiny-small] rounded-r-[--shape-none]',
	[SHAPE.TINY_SMALL_TOP]: 'rounded-t-[--shape-tiny-small] rounded-b-[--shape-none]',
	[SHAPE.TINY_SMALL]: 'rounded-[--shape-tiny-small]'
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
	[SIZE.NONE]: 'h-[--density-control-none] w-[--density-control-none]',
	[SIZE.X_LARGE]: 'h-[--density-control-extra-large] w-[--density-control-extra-large]',
	[SIZE.X_SMALL]: 'h-[--density-control-extra-small] w-[--density-control-extra-small]',
	[SIZE.LARGE]: 'h-[--density-control-large] w-[--density-control-large]',
	[SIZE.MEDIUM]: 'h-[--density-control-medium] w-[--density-control-medium]',
	[SIZE.SMALL]: 'h-[--density-control-small] w-[--density-control-small]'
}

const DENSITY_INLINE = {
	[SIZE.NONE]: 'h-[--density-inline-none] w-[--density-inline-none]',
	[SIZE.X_LARGE]: 'h-[--density-inline-extra-large] w-[--density-inline-extra-large]',
	[SIZE.X_SMALL]: 'h-[--density-inline-extra-small] w-[--density-inline-extra-small]',
	[SIZE.LARGE]: 'h-[--density-inline-large] w-[--density-inline-large]',
	[SIZE.MEDIUM]: 'h-[--density-inline-medium] w-[--density-inline-medium]',
	[SIZE.SMALL]: 'h-[--density-inline-small] w-[--density-inline-small]'
}

const DENSITY_INSET = {
	[LAYOUT.HORIZONTAL]: {
		[SIZE.NONE]: 'pl-[--density-inset-none] pr-[--density-inset-none]',
		[SIZE.X_LARGE]: 'pl-[--density-inset-extra-large] pr-[--density-inset-extra-large]',
		[SIZE.X_SMALL]: 'pl-[--density-inset-extra-small] pr-[--density-inset-extra-small]',
		[SIZE.LARGE]: 'pl-[--density-inset-large] pr-[--density-inset-large]',
		[SIZE.MEDIUM]: 'pl-[--density-inset-medium] pr-[--density-inset-medium]',
		[SIZE.SMALL]: 'pl-[--density-inset-small] pr-[--density-inset-small]'
	},
	[LAYOUT.VERTICAL]: {
		[SIZE.NONE]: 'pt-[--density-inset-none] pb-[--density-inset-none]',
		[SIZE.X_LARGE]: 'pt-[--density-inset-extra-large] pb-[--density-inset-extra-large]',
		[SIZE.X_SMALL]: 'pt-[--density-inset-extra-small] pb-[--density-inset-extra-small]',
		[SIZE.LARGE]: 'pt-[--density-inset-large] pb-[--density-inset-large]',
		[SIZE.MEDIUM]: 'pt-[--density-inset-medium] pb-[--density-inset-medium]',
		[SIZE.SMALL]: 'pt-[--density-inset-small] pb-[--density-inset-small]'
	}
}

const DENSITY_SPACING = {
	[LAYOUT.HORIZONTAL]: {
		[SIZE.NONE]: 'ml-[--density-spacing-none] mr-[--density-spacing-none]',
		[SIZE.X_LARGE]: 'ml-[--density-spacing-extra-large] mr-[--density-spacing-extra-large]',
		[SIZE.X_SMALL]: 'ml-[--density-spacing-extra-small] mr-[--density-spacing-extra-small]',
		[SIZE.LARGE]: 'ml-[--density-spacing-large] mr-[--density-spacing-large]',
		[SIZE.MEDIUM]: 'ml-[--density-spacing-medium] mr-[--density-spacing-medium]',
		[SIZE.SMALL]: 'ml-[--density-spacing-small] mr-[--density-spacing-small]'
	},
	[LAYOUT.VERTICAL]: {
		[SIZE.NONE]: 'mt-[--density-spacing-none] mb-[--density-spacing-none]',
		[SIZE.X_LARGE]: 'mt-[--density-spacing-extra-large] mb-[--density-spacing-extra-large]',
		[SIZE.X_SMALL]: 'mt-[--density-spacing-extra-small] mb-[--density-spacing-extra-small]',
		[SIZE.LARGE]: 'mt-[--density-spacing-large] mb-[--density-inset-large]',
		[SIZE.MEDIUM]: 'mt-[--density-spacing-medium] mb-[--density-inset-medium]',
		[SIZE.SMALL]: 'mt-[--density-spacing-small] mb-[--density-inset-small]'
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

const shapeClasses = (shape: ShapeType = SHAPE.NONE) => SHAPE_TYPE[shape]
const typographyClasses =
	(typography: TypographyType = TYPOGRAPHY.BODY) =>
	(rawSize: Exclude<Size, 'NONE'> = SIZE.MEDIUM) =>
	(
		{
			colorClasses = 'text-[--color-on-surface]',
			fontFamilyClasses = 'font-[family-name:var(--font-family)]'
		} = {} as TypographyClassesOptions
	) => {
		const typographySize = {
			[SIZE.X_LARGE]: SIZE.LARGE,
			[SIZE.X_SMALL]: SIZE.SMALL,
			[SIZE.LARGE]: SIZE.LARGE,
			[SIZE.MEDIUM]: SIZE.MEDIUM,
			[SIZE.SMALL]: SIZE.SMALL
		}

		const size = typographySize[rawSize]

		return clsx(TYPOGRAPHY_TYPE[typography][size], fontFamilyClasses, colorClasses)
	}

export {classesName, densityClasses, shapeClasses, typographyClasses}
