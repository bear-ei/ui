import {useEffect, useMemo} from 'react'
import {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {handleButtonAnimatedTiming} from './Button-handle'
import {UseButtonAnimatedOptions} from './Button.interface'

export const useButtonAnimated = ({disabled, eventName, type = 'filled', error}: UseButtonAnimatedOptions) => {
        const theme = useTheme()
        const {palette, scheme, spacing, opacity} = theme.token
        const {convertHexToRGBA} = palette
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const animatedValue = useMemo(() => (disabled ? 0 : 1), [disabled])
        const borderSharedValue = useSharedValue(animatedValue)
        const colorSharedValue = useSharedValue(animatedValue)
        const disabledBackgroundColor = convertHexToRGBA(scheme.onSurface)(opacity.level2)
        const disabledColor = convertHexToRGBA(scheme.onSurface)(opacity.level5)
        const backgroundColorType = {
                elevated: {
                        inputRange: [0, 1],
                        outputRange: [
                                disabledBackgroundColor,
                                convertHexToRGBA(scheme.surfaceContainerLow)(opacity.level10)
                        ]
                },
                filled: {
                        inputRange: [0, 1],
                        outputRange: [
                                disabledBackgroundColor,
                                error ?
                                        convertHexToRGBA(scheme.error)(opacity.level10)
                                :       convertHexToRGBA(scheme.primary)(opacity.level10)
                        ]
                },
                outlined: {
                        inputRange: [0, 1],
                        outputRange: [
                                convertHexToRGBA(scheme.primary)(opacity.level0),
                                convertHexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                text: {
                        inputRange: [0, 1],
                        outputRange: [
                                convertHexToRGBA(scheme.primary)(opacity.level0),
                                convertHexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                link: {
                        inputRange: [0, 1],
                        outputRange: [
                                convertHexToRGBA(scheme.primary)(opacity.level0),
                                convertHexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                tonal: {
                        inputRange: [0, 1],
                        outputRange: [
                                disabledBackgroundColor,
                                error ?
                                        convertHexToRGBA(scheme.errorContainer)(opacity.level10)
                                :       convertHexToRGBA(scheme.secondaryContainer)(opacity.level10)
                        ]
                }
        }

        const colorType = {
                elevated: {
                        inputRange: [0, 1],
                        outputRange: [
                                disabledColor,
                                error ?
                                        convertHexToRGBA(scheme.error)(opacity.level10)
                                :       convertHexToRGBA(scheme.primary)(opacity.level10)
                        ]
                },
                filled: {
                        inputRange: [0, 1],
                        outputRange: [
                                disabledColor,
                                error ?
                                        convertHexToRGBA(scheme.onError)(opacity.level10)
                                :       convertHexToRGBA(scheme.onPrimary)(opacity.level10)
                        ]
                },
                outlined: {
                        inputRange: [0, 1],
                        outputRange: [
                                disabledColor,
                                error ?
                                        convertHexToRGBA(scheme.error)(opacity.level10)
                                :       convertHexToRGBA(scheme.primary)(opacity.level10)
                        ]
                },
                text: {
                        inputRange: [0, 1],
                        outputRange: [
                                disabledColor,
                                error ?
                                        convertHexToRGBA(scheme.error)(opacity.level10)
                                :       convertHexToRGBA(scheme.primary)(opacity.level10)
                        ]
                },
                link: {
                        inputRange: [0, 1],
                        outputRange: [
                                disabledColor,
                                error ?
                                        convertHexToRGBA(scheme.error)(opacity.level10)
                                :       convertHexToRGBA(scheme.primary)(opacity.level10)
                        ]
                },
                tonal: {
                        inputRange: [0, 1],
                        outputRange: [
                                disabledColor,
                                error ?
                                        convertHexToRGBA(scheme.onErrorContainer)(opacity.level10)
                                :       convertHexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
                        ]
                }
        }

        const borderColorInputRange = useMemo(() => [0, 1, 2], [])
        const borderColorOutputRange = [
                disabledBackgroundColor,
                convertHexToRGBA(scheme.outline)(opacity.level10),
                convertHexToRGBA(scheme.primary)(opacity.level10)
        ]

        const notBackgroundColor = ['text', 'link'].includes(type)
        const notBorderColor = type !== 'outlined'
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
                        borderColor: interpolateColor(
                                borderSharedValue.value,
                                borderColorInputRange,
                                borderColorOutputRange
                        ),
                        borderStyle: 'solid',
                        borderWidth
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
