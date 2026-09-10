import type {ShapeType, TypographyType} from '@/constants'
import {
	createShape,
	createTypography,
	SHAPE,
	SIZE,
	TYPOGRAPHY,
	TYPOGRAPHY_SIZE,
	type Size,
	type TypographySize
} from '@bearei/theme-token'
import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'
import type {TypographyClassesOptions} from './classes.interface'

export const shapeClasses = (shape = SHAPE.NONE as ShapeType) => createShape()[shape]
export const typographyClasses =
	(typography = TYPOGRAPHY.BODY as TypographyType) =>
	(rawSize = TYPOGRAPHY_SIZE.MEDIUM as TypographySize | Size) =>
	(
		{
			colorClasses = 'color-[--color-on-surface]',
			fontFamilyClasses = 'font-[family-name:var(--font-family)]'
		} = {} as TypographyClassesOptions
	) => {
		const typographySize = {
			[SIZE.EXTRA_LARGE]: TYPOGRAPHY_SIZE.LARGE,
			[SIZE.EXTRA_SMALL]: TYPOGRAPHY_SIZE.SMALL,
			[TYPOGRAPHY_SIZE.LARGE]: TYPOGRAPHY_SIZE.LARGE,
			[TYPOGRAPHY_SIZE.MEDIUM]: TYPOGRAPHY_SIZE.MEDIUM,
			[TYPOGRAPHY_SIZE.SMALL]: TYPOGRAPHY_SIZE.SMALL
		}

		const size = typographySize[rawSize]

		return clsx(createTypography()[typography][size], fontFamilyClasses, colorClasses)
	}

export const classesName = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
