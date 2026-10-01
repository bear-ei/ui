import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'
import type {TypographyClassesOptions} from './classes.interface'
import {SHAPE, SIZE, TYPOGRAPHY, type ShapeType, type Size, type TypographyType} from '../../theme'

const SHAPE_TYPE = {
	[SHAPE.EXTRA_LARGE_BOTTOM]: 'rounded-t-[--shape-none] rounded-b-[--shape-extra-large]',
	[SHAPE.EXTRA_LARGE_END]: 'rounded-l-[--shape-none] rounded-r-[--shape-extra-large]',
	[SHAPE.EXTRA_LARGE_START]: 'rounded-l-[--shape-extra-large] rounded-r-[--shape-none]',
	[SHAPE.EXTRA_LARGE_TOP]: 'rounded-t-[--shape-extra-large] rounded-b-[--shape-none]',
	[SHAPE.EXTRA_LARGE]: 'rounded-[--shape-extra-large]',
	[SHAPE.EXTRA_SMALL_BOTTOM]: 'rounded-t-[--shape-none] rounded-b-[--shape-extra-small]',
	[SHAPE.EXTRA_SMALL_END]: 'rounded-l-none rounded-r-[--shape-extra-small]',
	[SHAPE.EXTRA_SMALL_START]: 'rounded-l-[--shape-extra-small] rounded-r-[--shape-none]',
	[SHAPE.EXTRA_SMALL_TOP]: 'rounded-t-[--shape-extra-small] rounded-b-[--shape-none]',
	[SHAPE.EXTRA_SMALL]: 'rounded-[--shape-extra-small]',
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
	[SIZE.EXTRA_LARGE]: 'h-[--density-control-extra-large] w-[--density-control-extra-large]',
	[SIZE.EXTRA_SMALL]: 'h-[--density-control-extra-small] w-[--density-control-extra-small]',
	[SIZE.LARGE]: 'h-[--density-control-large] w-[--density-control-large]',
	[SIZE.MEDIUM]: 'h-[--density-control-medium] w-[--density-control-medium]',
	[SIZE.SMALL]: 'h-[--density-control-small] w-[--density-control-small]'
}

export const classesName = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
export const densityClasses = (size: Size | number = SIZE.MEDIUM) =>
	typeof size === 'number' ? '' : DENSITY_CONTROL[size]

export const shapeClasses = (shape: ShapeType = SHAPE.NONE) => SHAPE_TYPE[shape]
export const typographyClasses =
	(typography: TypographyType = TYPOGRAPHY.BODY) =>
	(rawSize: Exclude<Size, 'NONE'> = SIZE.MEDIUM) =>
	(
		{
			colorClasses = 'text-[--color-on-surface]',
			fontFamilyClasses = 'font-[family-name:var(--font-family)]'
		} = {} as TypographyClassesOptions
	) => {
		const typographySize = {
			[SIZE.EXTRA_LARGE]: SIZE.LARGE,
			[SIZE.EXTRA_SMALL]: SIZE.SMALL,
			[SIZE.LARGE]: SIZE.LARGE,
			[SIZE.MEDIUM]: SIZE.MEDIUM,
			[SIZE.SMALL]: SIZE.SMALL
		}

		const size = typographySize[rawSize]

		return clsx(TYPOGRAPHY_TYPE[typography][size], fontFamilyClasses, colorClasses)
	}
