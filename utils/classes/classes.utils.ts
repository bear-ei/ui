import {ShapeType, TypographyType} from '@/constants'
import {
        createShape,
        createTypography,
        SHAPE,
        SIZE,
        Size,
        TYPOGRAPHY,
        TYPOGRAPHY_SIZE,
        TypographySize
} from '@bearei/theme-token'
import {clsx} from 'clsx'

export const shapeClasses = (shape = SHAPE.NONE as ShapeType) => createShape()[shape]
export const typographyClasses =
        (typography = TYPOGRAPHY.BODY as TypographyType) =>
        (rawSize = TYPOGRAPHY_SIZE.MEDIUM as TypographySize | Size) =>
        (colorClasses = 'color-[--color-error]') => {
                const typographySize = {
                        [SIZE.EXTRA_LARGE]: TYPOGRAPHY_SIZE.LARGE,
                        [SIZE.EXTRA_SMALL]: TYPOGRAPHY_SIZE.SMALL,
                        [TYPOGRAPHY_SIZE.LARGE]: TYPOGRAPHY_SIZE.LARGE,
                        [TYPOGRAPHY_SIZE.MEDIUM]: TYPOGRAPHY_SIZE.MEDIUM,
                        [TYPOGRAPHY_SIZE.SMALL]: TYPOGRAPHY_SIZE.SMALL
                }

                const size = typographySize[rawSize]

                return clsx(createTypography()[typography][size], 'font-sans', colorClasses)
        }
