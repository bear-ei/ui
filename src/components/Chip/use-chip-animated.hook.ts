import {useCallback, useEffect, useMemo} from 'react'
import {interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {handleChipAnimatedTiming} from './Chip-handle'
import {UseChipAnimatedOptions} from './Chip.interface'

export const useChipAnimated = ({disabled, type = 'assist', active, elevated, chipStyle}: UseChipAnimatedOptions) => {
        const theme = useTheme()
        const {scheme, opacity, palette} = theme.token
        const {hexToRGBA} = palette
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const animatedValue = disabled ? 0 : 1
        const borderSharedValue = useSharedValue(elevated || active ? 2 : animatedValue)
        const colorSharedValue = useSharedValue(active ? 2 : animatedValue)
        const filterIconLayoutWidthSharedValue = useSharedValue(active ? 1 : 0)
        const disabledBackgroundColor =
                elevated ? hexToRGBA(scheme.onSurface)(opacity.level2) : hexToRGBA(scheme.primary)(opacity.level0)

        const disabledColor = hexToRGBA(scheme.onSurface)(opacity.level5)
        const elevatedBackgroundColor =
                elevated ?
                        hexToRGBA(scheme.surfaceContainerLow)(opacity.level10)
                :       hexToRGBA(scheme.primary)(opacity.level0)

        const filledBackgroundColor = hexToRGBA(scheme.surfaceContainerHigh)(opacity.level10)
        const backgroundColorType = {
                input: {
                        inputRanges: [0, 1, 2],
                        outputRanges: [
                                disabledBackgroundColor,
                                hexToRGBA(scheme.primary)(opacity.level0),
                                hexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                inputFilled: {
                        inputRanges: [0, 1, 2],
                        outputRanges: [
                                disabledBackgroundColor,
                                chipStyle === 'filled' ? filledBackgroundColor : elevatedBackgroundColor,
                                hexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                assist: {
                        inputRanges: [0, 1, 2],
                        outputRanges: [
                                disabledBackgroundColor,
                                chipStyle === 'filled' ? filledBackgroundColor : elevatedBackgroundColor,
                                hexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                filter: {
                        inputRanges: [0, 1, 2],
                        outputRanges: [
                                disabledBackgroundColor,
                                chipStyle === 'filled' ? filledBackgroundColor : elevatedBackgroundColor,
                                hexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                suggestion: {
                        inputRanges: [0, 1, 2],
                        outputRanges: [
                                disabledBackgroundColor,
                                chipStyle === 'filled' ? filledBackgroundColor : elevatedBackgroundColor,
                                hexToRGBA(scheme.primary)(opacity.level0)
                        ]
                }
        }

        const colorType = {
                input: {
                        inputRanges: [0, 1, 2],
                        outputRanges: [
                                hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                                hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                                hexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
                        ]
                },
                inputFilled: {
                        inputRanges: [0, 1, 2],
                        outputRanges: [
                                hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                                hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                                hexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
                        ]
                },
                assist: {
                        inputRanges: [0, 1, 2],
                        outputRanges: [
                                disabledColor,
                                hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                                hexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
                        ]
                },
                filter: {
                        inputRanges: [0, 1, 2],
                        outputRanges: [
                                disabledColor,
                                hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                                hexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
                        ]
                },
                suggestion: {
                        inputRanges: [0, 1, 2],
                        outputRanges: [
                                disabledColor,
                                hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                                hexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
                        ]
                }
        }

        const borderInputRanges = useMemo(() => [0, 1, 2], [])
        const borderColorOutputRanges = [
                disabledBackgroundColor,
                chipStyle === 'outlined' ?
                        hexToRGBA(scheme.outline)(opacity.level10)
                :       hexToRGBA(scheme.surface)(opacity.level10),
                hexToRGBA(scheme.outline)(opacity.level0)
        ]

        const borderWidthOutputRanges = [
                theme.adaptSize(theme.token.spacing.extraSmall / 4),
                chipStyle === 'outlined' ?
                        theme.adaptSize(theme.token.spacing.extraSmall / 4)
                :       theme.adaptSize(theme.token.spacing.none),
                theme.adaptSize(theme.token.spacing.none)
        ]

        const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
                backgroundColor: interpolateColor(
                        colorSharedValue.value,
                        backgroundColorType[type].inputRanges,
                        backgroundColorType[type].outputRanges
                ),
                borderColor: interpolateColor(borderSharedValue.value, borderInputRanges, borderColorOutputRanges),
                borderStyle: 'solid',
                borderWidth: interpolate(borderSharedValue.value, borderInputRanges, borderWidthOutputRanges)
        }))

        const labelTextAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(
                        colorSharedValue.value,
                        colorType[type].inputRanges,
                        colorType[type].outputRanges
                )
        }))

        const filterIconLayoutWidthOutputRanges = [
                theme.adaptSize(theme.token.spacing.none),
                theme.adaptSize(
                        theme.token.spacing.extraSmall * 6 + -1.5 * theme.adaptSize(theme.token.spacing.extraSmall)
                )
        ]

        const filterIconLayoutAnimatedStyle = useAnimatedStyle(() => ({
                width: interpolate(filterIconLayoutWidthSharedValue.value, [0, 1], filterIconLayoutWidthOutputRanges)
        }))

        const onChipAnimatedTiming = useCallback(
                () =>
                        handleChipAnimatedTiming({
                                animatedTiming,
                                borderInputRanges,
                                disabled,
                                active,
                                elevated
                        })(type)({
                                borderSharedValue,
                                colorSharedValue,
                                filterIconLayoutWidthSharedValue
                        }),
                [
                        active,
                        animatedTiming,
                        borderInputRanges,
                        borderSharedValue,
                        colorSharedValue,
                        disabled,
                        elevated,
                        filterIconLayoutWidthSharedValue,
                        type
                ]
        )

        useEffect(() => {
                onChipAnimatedTiming()
        }, [onChipAnimatedTiming])

        return {
                backgroundUnderlayAnimatedStyle,
                filterIconLayoutAnimatedStyle,
                labelTextAnimatedStyle
        }
}
