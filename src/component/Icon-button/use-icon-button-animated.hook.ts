import {useEffect, useMemo} from 'react'
import {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hook'
import {
    HandleIconButtonAnimatedTimingOptions,
    HandleIconButtonAnimatedTimingSharedValue,
    UseIconButtonAnimatedOptions
} from './Icon-button.interface'

const handleIconButtonAnimatedTiming =
    ({animatedTiming, type}: HandleIconButtonAnimatedTimingOptions) =>
    ({borderSharedValue, colorSharedValue}: HandleIconButtonAnimatedTimingSharedValue) =>
    (disabled?: boolean) => {
        const toValue = disabled ? 0 : 1

        if (type === 'outlined') {
            animatedTiming()(borderSharedValue)(toValue)
            animatedTiming()(colorSharedValue)(toValue)

            return
        }

        animatedTiming()(colorSharedValue)(toValue)
    }

export const useIconButtonAnimated = ({disabled, type = 'filled'}: UseIconButtonAnimatedOptions) => {
    const animatedValue = disabled ? 0 : 1
    const borderSharedValue = useSharedValue(animatedValue)
    const colorSharedValue = useSharedValue(animatedValue)
    const theme = useTheme()
    const {palette, scheme} = theme.token
    const {convertHexToRGBA} = palette
    const animatedTiming = useAnimatedTiming(theme.token)
    const disabledBackgroundColor = convertHexToRGBA(scheme.onSurface)(0.12)
    const backgroundColorType = {
        filled: {
            inputRange: [0, 1],
            outputRange: [disabledBackgroundColor, convertHexToRGBA(scheme.primary)(1)]
        },
        outlined: {
            inputRange: [0, 1],
            outputRange: [convertHexToRGBA(scheme.primary)(0), convertHexToRGBA(scheme.primary)(0)]
        },
        standard: {
            inputRange: [0, 1],
            outputRange: [convertHexToRGBA(scheme.primary)(0), convertHexToRGBA(scheme.primary)(0)]
        },
        tonal: {
            inputRange: [0, 1],
            outputRange: [disabledBackgroundColor, convertHexToRGBA(scheme.secondaryContainer)(1)]
        },
        active: {
            inputRange: [0, 1],
            outputRange: [convertHexToRGBA(scheme.primary)(0), convertHexToRGBA(scheme.primary)(0)]
        }
    }

    const borderWidth = theme.adaptSize(1)
    const contentUnderlayAnimatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            colorSharedValue.value,
            backgroundColorType[type].inputRange,
            backgroundColorType[type].outputRange
        ),
        ...(type === 'outlined' && {
            borderColor: interpolateColor(borderSharedValue.value, [0, 1], [disabledBackgroundColor, scheme.outline]),
            borderStyle: 'solid',
            borderWidth
        })
    }))

    const onIconButtonAnimatedTiming = useMemo(
        () => handleIconButtonAnimatedTiming({animatedTiming, type})({borderSharedValue, colorSharedValue}),
        [animatedTiming, borderSharedValue, colorSharedValue, type]
    )

    useEffect(() => {
        onIconButtonAnimatedTiming(disabled)
    }, [disabled, onIconButtonAnimatedTiming, type])

    return {contentUnderlayAnimatedStyle}
}
