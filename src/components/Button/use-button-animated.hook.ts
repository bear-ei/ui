import {useEffect, useMemo} from 'react'
import {AnimatableValue, SharedValue, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {EventName} from '../Common'
import {
    HandleButtonAnimatedTimingOptions,
    HandleButtonAnimatedTimingSharedValue,
    UseButtonAnimatedOptions
} from './Button.interface'

const handleButtonOutlinedAnimated = ({
    animatedTiming,
    borderColorInputRange,
    disabled,
    type
}: HandleButtonAnimatedTimingOptions) => {
    const value = disabled ? 0 : borderColorInputRange[borderColorInputRange.length - 2]

    return (borderSharedValue: SharedValue<AnimatableValue>) => (eventName?: EventName) => {
        const responseEvent =
            type === 'link' ?
                eventName && ['focus', 'hoverIn', 'longPress', 'press', 'pressIn', 'pressOut'].includes(eventName)
            :   eventName === 'focus'

        const toValue = responseEvent ? borderColorInputRange[2] : value

        return animatedTiming()(borderSharedValue)(toValue)
    }
}

const handleButtonAnimatedTiming = ({
    animatedTiming,
    borderColorInputRange,
    disabled,
    type
}: HandleButtonAnimatedTimingOptions) => {
    const toValue = disabled ? 0 : 1

    return ({borderSharedValue, colorSharedValue}: HandleButtonAnimatedTimingSharedValue) =>
        (eventName?: EventName) => {
            if (type && ['link', 'outlined'].includes(type)) {
                handleButtonOutlinedAnimated({animatedTiming, borderColorInputRange, type, disabled})(
                    borderSharedValue
                )(eventName)

                animatedTiming()(colorSharedValue)(toValue)

                return
            }

            animatedTiming()(colorSharedValue)(toValue)
        }
}

export const useButtonAnimated = ({disabled, eventName, type = 'filled'}: UseButtonAnimatedOptions) => {
    const theme = useTheme()
    const {palette, scheme, spacing} = theme.token
    const {convertHexToRGBA} = palette
    const animatedTiming = useAnimatedTiming(theme.token)
    const animatedValue = disabled ? 0 : 1
    const borderSharedValue = useSharedValue(animatedValue)
    const colorSharedValue = useSharedValue(animatedValue)
    const disabledBackgroundColor = convertHexToRGBA(scheme.onSurface)(0.12)
    const disabledColor = convertHexToRGBA(scheme.onSurface)(0.38)
    const backgroundColorType = {
        elevated: {
            inputRange: [0, 1],
            outputRange: [disabledBackgroundColor, convertHexToRGBA(scheme.surfaceContainerLow)(1)]
        },
        filled: {
            inputRange: [0, 1],
            outputRange: [disabledBackgroundColor, convertHexToRGBA(scheme.primary)(1)]
        },
        outlined: {
            inputRange: [0, 1],
            outputRange: [convertHexToRGBA(scheme.primary)(0), convertHexToRGBA(scheme.primary)(0)]
        },
        text: {
            inputRange: [0, 1],
            outputRange: [convertHexToRGBA(scheme.primary)(0), convertHexToRGBA(scheme.primary)(0)]
        },
        link: {
            inputRange: [0, 1],
            outputRange: [convertHexToRGBA(scheme.primary)(0), convertHexToRGBA(scheme.primary)(0)]
        },
        tonal: {
            inputRange: [0, 1],
            outputRange: [disabledBackgroundColor, convertHexToRGBA(scheme.secondaryContainer)(1)]
        }
    }

    const colorType = {
        elevated: {
            inputRange: [0, 1],
            outputRange: [disabledColor, convertHexToRGBA(scheme.primary)(1)]
        },
        filled: {
            inputRange: [0, 1],
            outputRange: [disabledColor, convertHexToRGBA(scheme.onPrimary)(1)]
        },
        outlined: {
            inputRange: [0, 1],
            outputRange: [disabledColor, convertHexToRGBA(scheme.primary)(1)]
        },
        text: {
            inputRange: [0, 1],
            outputRange: [disabledColor, convertHexToRGBA(scheme.primary)(1)]
        },
        link: {
            inputRange: [0, 1],
            outputRange: [disabledColor, convertHexToRGBA(scheme.primary)(1)]
        },
        tonal: {
            inputRange: [0, 1],
            outputRange: [disabledColor, convertHexToRGBA(scheme.onSecondaryContainer)(1)]
        }
    }

    const borderColorInputRange = useMemo(() => [0, 1, 2], [])
    const borderColorOutputRange = [
        type === 'link' ? convertHexToRGBA(scheme.outline)(0) : disabledBackgroundColor,
        type === 'link' ? convertHexToRGBA(scheme.outline)(0) : convertHexToRGBA(scheme.outline)(1),
        scheme.primary
    ]

    const notBackgroundColor = ['text', 'link'].includes(type)
    const notBorderColor = !['outlined', 'link'].includes(type)
    const borderWidth = theme.adaptSize(spacing.extraSmall / 4)
    const contentUnderlayAnimatedStyle = useAnimatedStyle(() => ({
        ...(!notBackgroundColor && {
            backgroundColor: interpolateColor(
                colorSharedValue.value,
                backgroundColorType[type].inputRange,
                backgroundColorType[type].outputRange
            )
        }),
        ...(!notBorderColor && {
            borderColor: interpolateColor(borderSharedValue.value, borderColorInputRange, borderColorOutputRange),
            borderStyle: 'solid',
            ...(type === 'link' ? {borderBottomWidth: borderWidth} : {borderWidth})
        })
    }))

    const labelTextAnimatedStyle = useAnimatedStyle(() => ({
        color: interpolateColor(colorSharedValue.value, colorType[type].inputRange, colorType[type].outputRange)
    }))

    const onButtonAnimatedTiming = useMemo(
        () =>
            handleButtonAnimatedTiming({animatedTiming, borderColorInputRange, type, disabled})({
                borderSharedValue,
                colorSharedValue
            }),
        [animatedTiming, borderColorInputRange, borderSharedValue, colorSharedValue, disabled, type]
    )

    useEffect(() => {
        onButtonAnimatedTiming(eventName)
    }, [eventName, onButtonAnimatedTiming])

    return {contentUnderlayAnimatedStyle, labelTextAnimatedStyle}
}
