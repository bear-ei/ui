import {createShape, createTypography, SHAPE, Size, SIZE, TYPOGRAPHY} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {ShapeType, TypographyType} from './Common.interface'

export const commonShapeClasses = (shape = SHAPE.NONE as ShapeType) => createShape()[shape]
export const commonTypographyClasses =
        (typography = TYPOGRAPHY.BODY as TypographyType) =>
        (size = SIZE.MEDIUM as Size) =>
                clsx(createTypography()[typography][size], 'font-sans')
