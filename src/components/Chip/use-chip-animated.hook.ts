import {useCallback, useEffect, useMemo} from 'react'
import {
    AnimatableValue,
    SharedValue,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../hooks'
import {
    ChipType,
    HandleChipAnimatedTimingOptions,
    HandleChipAnimatedTimingSharedValue,
    UseChipAnimatedOptions
} from './Chip.interface'

const handleChipBorderAnimated = ({animatedTiming, borderInputRange, disabled}: HandleChipAnimatedTimingOptions) => {
    const value = disabled ? 0 : borderInputRange[borderInputRange.length - 2]

    return (borderSharedValue: SharedValue<AnimatableValue>) => (active?: boolean) => {
        const toValue = active && !disabled ? 2 : value

        return animatedTiming()(borderSharedValue)(toValue)
    }
}

const handleChipFilterIcon =
    (animatedTiming: AnimatedTiming) =>
    (filterIconContainerWidthSharedValue: SharedValue<AnimatableValue>) =>
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
            const borderAnimated = handleChipBorderAnimated({animatedTiming, borderInputRange, disabled})(
                borderSharedValue
            )

            if (typeof active === 'boolean') {
                borderAnimated(active)

                if (type === 'filter') {
                    handleChipFilterIcon(animatedTiming)(filterIconContainerWidthSharedValue)(active)
                }
            }

            animatedTiming()(colorSharedValue)(toValue)
            borderAnimated(elevated)
        }
}

export const useChipAnimated = ({disabled, type = 'assist', active, elevated}: UseChipAnimatedOptions) => {
    const theme = useTheme()
    const {palette, scheme} = theme.token
    const {convertHexToRGBA} = palette
    const animatedTiming = useAnimatedTiming(theme.token)
    const animatedValue = disabled ? 0 : 1
    const borderSharedValue = useSharedValue(elevated || active ? 2 : animatedValue)
    const colorSharedValue = useSharedValue(active ? 2 : animatedValue)
    const disabledBackgroundColor = convertHexToRGBA(scheme.onSurface)(0.12)
    const disabledColor = convertHexToRGBA(scheme.onSurface)(0.38)
    const filterIconContainerWidthSharedValue = useSharedValue(active ? 1 : 0)
    const backgroundColorType = {
        input: {
            inputRange: [0, 1, 2],
            outputRange: [
                convertHexToRGBA(scheme.primary)(0),
                convertHexToRGBA(scheme.primary)(0),
                convertHexToRGBA(scheme.primary)(0)
            ]
        },
        inputFilled: {
            inputRange: [0, 1, 2],
            outputRange: [
                convertHexToRGBA(scheme.primary)(0),
                elevated ? convertHexToRGBA(scheme.surfaceContainerLow)(1) : convertHexToRGBA(scheme.primary)(0),
                convertHexToRGBA(scheme.primary)(0)
            ]
        },
        assist: {
            inputRange: [0, 1, 2],
            outputRange: [
                disabledBackgroundColor,
                elevated ? convertHexToRGBA(scheme.surfaceContainerLow)(1) : convertHexToRGBA(scheme.primary)(0),
                convertHexToRGBA(scheme.primary)(0)
            ]
        },
        filter: {
            inputRange: [0, 1, 2],
            outputRange: [
                disabledBackgroundColor,
                elevated ? convertHexToRGBA(scheme.surfaceContainerLow)(1) : convertHexToRGBA(scheme.primary)(0),
                convertHexToRGBA(scheme.primary)(0)
            ]
        },
        suggestion: {
            inputRange: [0, 1, 2],
            outputRange: [
                disabledBackgroundColor,
                elevated ? convertHexToRGBA(scheme.surfaceContainerLow)(1) : convertHexToRGBA(scheme.primary)(0),
                convertHexToRGBA(scheme.primary)(0)
            ]
        }
    }

    const colorType = {
        input: {
            inputRange: [0, 1, 2],
            outputRange: [
                convertHexToRGBA(scheme.onSurfaceVariant)(1),
                convertHexToRGBA(scheme.onSurfaceVariant)(1),
                convertHexToRGBA(scheme.onSecondaryContainer)(1)
            ]
        },
        inputFilled: {
            inputRange: [0, 1, 2],
            outputRange: [
                convertHexToRGBA(scheme.onSurfaceVariant)(1),
                convertHexToRGBA(scheme.onSurfaceVariant)(1),
                convertHexToRGBA(scheme.onSecondaryContainer)(1)
            ]
        },
        assist: {
            inputRange: [0, 1, 2],
            outputRange: [
                disabledColor,
                convertHexToRGBA(scheme.onSurfaceVariant)(1),
                convertHexToRGBA(scheme.onSecondaryContainer)(1)
            ]
        },
        filter: {
            inputRange: [0, 1, 2],
            outputRange: [
                disabledColor,
                convertHexToRGBA(scheme.onSurfaceVariant)(1),
                convertHexToRGBA(scheme.onSecondaryContainer)(1)
            ]
        },
        suggestion: {
            inputRange: [0, 1, 2],
            outputRange: [
                disabledColor,
                convertHexToRGBA(scheme.onSurfaceVariant)(1),
                convertHexToRGBA(scheme.onSecondaryContainer)(1)
            ]
        }
    }

    const borderInputRange = useMemo(() => [0, 1, 2], [])
    const borderColorOutputRange = [
        disabledBackgroundColor,
        convertHexToRGBA(scheme.outline)(1),
        convertHexToRGBA(scheme.outline)(0)
    ]

    const borderWidthOutputRange = [
        theme.adaptSize(theme.token.spacing.extraSmall / 4),
        theme.adaptSize(theme.token.spacing.extraSmall / 4),
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
        theme.adaptSize(theme.token.spacing.extraSmall * 6 + -1.5 * theme.adaptSize(theme.token.spacing.extraSmall))
    ]

    const filterIconContainerAnimatedStyle = useAnimatedStyle(() => ({
        width: interpolate(filterIconContainerWidthSharedValue.value, [0, 1], filterIconContainerWidthOutputRange)
    }))

    const onChipAnimatedTiming = useCallback(
        () =>
            handleChipAnimatedTiming({animatedTiming, borderInputRange, disabled, active, elevated})(type)({
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
