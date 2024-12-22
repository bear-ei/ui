import {useCallback, useEffect, useMemo} from 'react'
import {SharedValue, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../hooks'
import {
        ChipType,
        HandleChipAnimatedTimingOptions,
        HandleChipAnimatedTimingSharedValue,
        UseChipAnimatedOptions
} from './Chip.interface'

const handleChipBorderAnimatedTiming = ({
        animatedTiming,
        borderInputRange,
        disabled
}: HandleChipAnimatedTimingOptions) => {
        const value = disabled ? 0 : borderInputRange[borderInputRange.length - 2]

        return (borderSharedValue: SharedValue<number>) => (active?: boolean) => {
                const toValue = active && !disabled ? 2 : value

                return animatedTiming()(borderSharedValue)(toValue)
        }
}

const handleChipFilterIcon =
        (animatedTiming: AnimatedTiming) =>
        (filterIconContainerWidthSharedValue: SharedValue<number>) =>
        (active?: boolean) => {
                const toValue = active ? 1 : 0

                animatedTiming()(filterIconContainerWidthSharedValue)(toValue)
        }

const handleChipAnimatedTiming = ({
        active,
        animatedTiming,
        borderInputRange,
        disabled,
        elevated
}: HandleChipAnimatedTimingOptions) => {
        const toValue = disabled ? 0 : 1

        return (type: ChipType) =>
                ({
                        borderSharedValue,
                        colorSharedValue,
                        filterIconContainerWidthSharedValue
                }: HandleChipAnimatedTimingSharedValue) => {
                        const borderAnimatedTiming = handleChipBorderAnimatedTiming({
                                animatedTiming,
                                borderInputRange,
                                disabled
                        })(borderSharedValue)

                        if (typeof active === 'boolean') {
                                borderAnimatedTiming(active)

                                if (type === 'filter') {
                                        handleChipFilterIcon(animatedTiming)(filterIconContainerWidthSharedValue)(
                                                active
                                        )
                                }
                        }

                        animatedTiming()(colorSharedValue)(toValue)

                        if (typeof elevated === 'boolean') {
                                borderAnimatedTiming(elevated)
                        }
                }
}

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

        const contentUnderlayAnimatedStyle = useAnimatedStyle(() => ({
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
                contentUnderlayAnimatedStyle,
                filterIconContainerAnimatedStyle,
                labelTextAnimatedStyle
        }
}
