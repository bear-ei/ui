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
import {cssInterop} from 'nativewind'
import {TextInput, TextInputProps} from 'react-native'
import Animated, {AnimatedProps} from 'react-native-reanimated'
import {ShapeType, TypographyType} from './common.interface.js'

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

export const AnimatedTextInput = cssInterop(Animated.createAnimatedComponent(TextInput), {
        className: 'style'
}) as React.ComponentClass<AnimatedProps<TextInputProps>, any>
