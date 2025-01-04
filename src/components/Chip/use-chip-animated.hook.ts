import {useCallback, useEffect, useMemo} from 'react'
import {interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {handleChipAnimatedTiming} from './Chip-handle'
import {UseChipAnimatedOptions} from './Chip.interface'

export const useChipAnimated = ({disabled, type = 'assist', active, elevated, chipStyle}: UseChipAnimatedOptions) => {
        const theme = useTheme()
        const {scheme, opacity, palette} = theme.token
        const {convertHexToRGBA} = palette
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const animatedValue = disabled ? 0 : 1
        const borderSharedValue = useSharedValue(elevated || active ? 2 : animatedValue)
        const colorSharedValue = useSharedValue(active ? 2 : animatedValue)
        const filterIconContainerWidthSharedValue = useSharedValue(active ? 1 : 0)
        const disabledBackgroundColor =
                elevated ?
                        convertHexToRGBA(scheme.onSurface)(opacity.level2)
                :       convertHexToRGBA(scheme.primary)(opacity.level0)

        const disabledColor = convertHexToRGBA(scheme.onSurface)(opacity.level5)
        const elevatedBackgroundColor =
                elevated ?
                        convertHexToRGBA(scheme.surfaceContainerLow)(opacity.level10)
                :       convertHexToRGBA(scheme.primary)(opacity.level0)

        const filledBackgroundColor = convertHexToRGBA(scheme.surfaceContainerHigh)(opacity.level10)
        const backgroundColorType = {
                input: {
                        inputRange: [0, 1, 2],
                        outputRange: [
                                disabledBackgroundColor,
                                convertHexToRGBA(scheme.primary)(opacity.level0),
                                convertHexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                inputFilled: {
                        inputRange: [0, 1, 2],
                        outputRange: [
                                disabledBackgroundColor,
                                chipStyle === 'filled' ? filledBackgroundColor : elevatedBackgroundColor,
                                convertHexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                assist: {
                        inputRange: [0, 1, 2],
                        outputRange: [
                                disabledBackgroundColor,
                                chipStyle === 'filled' ? filledBackgroundColor : elevatedBackgroundColor,
                                convertHexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                filter: {
                        inputRange: [0, 1, 2],
                        outputRange: [
                                disabledBackgroundColor,
                                chipStyle === 'filled' ? filledBackgroundColor : elevatedBackgroundColor,
                                convertHexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                suggestion: {
                        inputRange: [0, 1, 2],
                        outputRange: [
                                disabledBackgroundColor,
                                chipStyle === 'filled' ? filledBackgroundColor : elevatedBackgroundColor,
                                convertHexToRGBA(scheme.primary)(opacity.level0)
                        ]
                }
        }

        const colorType = {
                input: {
                        inputRange: [0, 1, 2],
                        outputRange: [
                                convertHexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                                convertHexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                                convertHexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
                        ]
                },
                inputFilled: {
                        inputRange: [0, 1, 2],
                        outputRange: [
                                convertHexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                                convertHexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                                convertHexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
                        ]
                },
                assist: {
                        inputRange: [0, 1, 2],
                        outputRange: [
                                disabledColor,
                                convertHexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                                convertHexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
                        ]
                },
                filter: {
                        inputRange: [0, 1, 2],
                        outputRange: [
                                disabledColor,
                                convertHexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                                convertHexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
                        ]
                },
                suggestion: {
                        inputRange: [0, 1, 2],
                        outputRange: [
                                disabledColor,
                                convertHexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                                convertHexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
                        ]
                }
        }

        const borderInputRange = useMemo(() => [0, 1, 2], [])
        const borderColorOutputRange = [
                disabledBackgroundColor,
                chipStyle === 'outlined' ?
                        convertHexToRGBA(scheme.outline)(opacity.level10)
                :       convertHexToRGBA(scheme.surface)(opacity.level10),
                convertHexToRGBA(scheme.outline)(opacity.level0)
        ]

        const borderWidthOutputRange = [
                theme.adaptSize(theme.token.spacing.extraSmall / 4),
                chipStyle === 'outlined' ?
                        theme.adaptSize(theme.token.spacing.extraSmall / 4)
                :       theme.adaptSize(theme.token.spacing.none),
                theme.adaptSize(theme.token.spacing.none)
        ]

        const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
                backgroundColor: interpolateColor(
                        colorSharedValue.value,
                        backgroundColorType[type].inputRange,
                        backgroundColorType[type].outputRange
                ),
                borderColor: interpolateColor(borderSharedValue.value, borderInputRange, borderColorOutputRange),
                borderStyle: 'solid',
                borderWidth: interpolate(borderSharedValue.value, borderInputRange, borderWidthOutputRange)
        }))

        const labelTextAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(colorSharedValue.value, colorType[type].inputRange, colorType[type].outputRange)
        }))

        const filterIconContainerWidthOutputRange = [
                theme.adaptSize(theme.token.spacing.none),
                theme.adaptSize(
                        theme.token.spacing.extraSmall * 6 + -1.5 * theme.adaptSize(theme.token.spacing.extraSmall)
                )
        ]

        const filterIconContainerAnimatedStyle = useAnimatedStyle(() => ({
                width: interpolate(
                        filterIconContainerWidthSharedValue.value,
                        [0, 1],
                        filterIconContainerWidthOutputRange
                )
        }))

        const onChipAnimatedTiming = useCallback(
                () =>
                        handleChipAnimatedTiming({
                                animatedTiming,
                                borderInputRange,
                                disabled,
                                active,
                                elevated
                        })(type)({
                                borderSharedValue,
                                colorSharedValue,
                                filterIconContainerWidthSharedValue
                        }),
                [
                        active,
                        animatedTiming,
                        borderInputRange,
                        borderSharedValue,
                        colorSharedValue,
                        disabled,
                        elevated,
                        filterIconContainerWidthSharedValue,
                        type
                ]
        )

        useEffect(() => {
                onChipAnimatedTiming()
        }, [onChipAnimatedTiming])

        return {
                backgroundUnderlayAnimatedStyle,
                filterIconContainerAnimatedStyle,
                labelTextAnimatedStyle
        }
}
