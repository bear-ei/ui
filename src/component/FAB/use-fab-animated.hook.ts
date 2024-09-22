import {useEffect, useMemo} from 'react'
import {AnimatableValue, SharedValue, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../hook'
import {UseFABAnimatedOptions} from './FAB.interface'

const processFABAnimatedTiming =
    (animatedTiming: AnimatedTiming) => (colorSharedValue: SharedValue<AnimatableValue>) => (disabled?: boolean) =>
        animatedTiming()(colorSharedValue)(disabled ? 0 : 1)

export const useFABAnimated = ({disabled, type = 'primary'}: UseFABAnimatedOptions) => {
    const colorSharedValue = useSharedValue(disabled ? 0 : 1)
    const theme = useTheme()
    const {palette, scheme} = theme.token
    const {convertHexToRGBA} = palette
    const animatedTiming = useAnimatedTiming(theme.token)
    const disabledBackgroundColor = convertHexToRGBA(scheme.onSurface)(0.12)
    const disabledColor = convertHexToRGBA(scheme.onSurface)(0.38)
    const backgroundColorType = {
        surface: {
            inputRange: [0, 1],
            outputRange: [disabledBackgroundColor, convertHexToRGBA(scheme.surfaceContainerHigh)(1)]
        },
        primary: {
            inputRange: [0, 1],
            outputRange: [disabledBackgroundColor, convertHexToRGBA(scheme.primaryContainer)(1)]
        },
        secondary: {
            inputRange: [0, 1],
            outputRange: [disabledBackgroundColor, convertHexToRGBA(scheme.secondaryContainer)(1)]
        },
        tertiary: {
            inputRange: [0, 1],
            outputRange: [disabledBackgroundColor, convertHexToRGBA(scheme.tertiaryContainer)(1)]
        }
    }

    const colorType = {
        surface: {
            inputRange: [0, 1],
            outputRange: [disabledColor, convertHexToRGBA(scheme.primary)(1)]
        },
        primary: {
            inputRange: [0, 1],
            outputRange: [disabledColor, convertHexToRGBA(scheme.onPrimaryContainer)(1)]
        },
        secondary: {
            inputRange: [0, 1],
            outputRange: [disabledColor, convertHexToRGBA(scheme.onSecondaryContainer)(1)]
        },
        tertiary: {
            inputRange: [0, 1],
            outputRange: [disabledColor, convertHexToRGBA(scheme.onTertiaryContainer)(1)]
        }
    }

    const contentUnderlayAnimatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            colorSharedValue.value,
            backgroundColorType[type].inputRange,
            backgroundColorType[type].outputRange
        )
    }))

    const labelTextAnimatedStyle = useAnimatedStyle(() => ({
        color: interpolateColor(colorSharedValue.value, colorType[type].inputRange, colorType[type].outputRange)
    }))

    const onFABAnimatedTiming = useMemo(
        () => processFABAnimatedTiming(animatedTiming)(colorSharedValue),
        [animatedTiming, colorSharedValue]
    )

    useEffect(() => {
        onFABAnimatedTiming(disabled)
    }, [disabled, onFABAnimatedTiming])

    return {contentUnderlayAnimatedStyle, labelTextAnimatedStyle}
}
