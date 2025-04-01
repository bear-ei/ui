import {useEffect, useMemo} from 'react'
import {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {handleButtonAnimatedTiming} from './Button-handle'
import {UseButtonAnimatedOptions} from './Button.interface'

export const useButtonAnimated = ({disabled, eventName, type = 'filled', error}: UseButtonAnimatedOptions) => {
        const theme = useTheme()
        const {palette, scheme, spacing, opacity} = theme.token
        const {hexToRGBA} = palette
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const animatedValue = disabled ? 0 : 1
        const borderSharedValue = useSharedValue(animatedValue)
        const colorSharedValue = useSharedValue(animatedValue)
        const disabledBackgroundColor = hexToRGBA(scheme.onSurface)(opacity.level2)
        const disabledColor = hexToRGBA(scheme.onSurface)(opacity.level5)
        const backgroundColorType = {
                elevated: {
                        inputRanges: [0, 1],
                        outputRanges: [disabledBackgroundColor, hexToRGBA(scheme.surfaceContainerLow)(opacity.level10)]
                },
                filled: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                disabledBackgroundColor,
                                error ?
                                        hexToRGBA(scheme.error)(opacity.level10)
                                :       hexToRGBA(scheme.primary)(opacity.level10)
                        ]
                },
                outlined: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                hexToRGBA(scheme.primary)(opacity.level0),
                                hexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                text: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                hexToRGBA(scheme.primary)(opacity.level0),
                                hexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                link: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                hexToRGBA(scheme.primary)(opacity.level0),
                                hexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                tonal: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                disabledBackgroundColor,
                                error ?
                                        hexToRGBA(scheme.errorContainer)(opacity.level10)
                                :       hexToRGBA(scheme.secondaryContainer)(opacity.level10)
                        ]
                }
        }

        const colorType = {
                elevated: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                disabledColor,
                                error ?
                                        hexToRGBA(scheme.error)(opacity.level10)
                                :       hexToRGBA(scheme.primary)(opacity.level10)
                        ]
                },
                filled: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                disabledColor,
                                error ?
                                        hexToRGBA(scheme.onError)(opacity.level10)
                                :       hexToRGBA(scheme.onPrimary)(opacity.level10)
                        ]
                },
                outlined: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                disabledColor,
                                error ?
                                        hexToRGBA(scheme.error)(opacity.level10)
                                :       hexToRGBA(scheme.primary)(opacity.level10)
                        ]
                },
                text: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                disabledColor,
                                error ?
                                        hexToRGBA(scheme.error)(opacity.level10)
                                :       hexToRGBA(scheme.primary)(opacity.level10)
                        ]
                },
                link: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                disabledColor,
                                error ?
                                        hexToRGBA(scheme.error)(opacity.level10)
                                :       hexToRGBA(scheme.primary)(opacity.level10)
                        ]
                },
                tonal: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                disabledColor,
                                error ?
                                        hexToRGBA(scheme.onErrorContainer)(opacity.level10)
                                :       hexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
                        ]
                }
        }

        const borderColorInputRanges = useMemo(() => [0, 1, 2], [])
        const borderColorOutputRanges = [
                disabledBackgroundColor,
                hexToRGBA(scheme.outline)(opacity.level10),
                hexToRGBA(scheme.primary)(opacity.level10)
        ]

        const notBackgroundColor = ['text', 'link'].includes(type)
        const notBorderColor = type !== 'outlined'
        const borderWidth = theme.adaptSize(spacing.extraSmall / 4)
        const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
                ...(!notBackgroundColor && {
                        backgroundColor: interpolateColor(
                                colorSharedValue.value,
                                backgroundColorType[type].inputRanges,
                                backgroundColorType[type].outputRanges
                        )
                }),
                ...(!notBorderColor && {
                        borderColor: interpolateColor(
                                borderSharedValue.value,
                                borderColorInputRanges,
                                borderColorOutputRanges
                        ),
                        borderStyle: 'solid',
                        borderWidth
                })
        }))

        const labelTextAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(
                        colorSharedValue.value,
                        colorType[type].inputRanges,
                        colorType[type].outputRanges
                )
        }))

        const onButtonAnimatedTiming = useMemo(
                () =>
                        handleButtonAnimatedTiming({animatedTiming, borderColorInputRanges, type, disabled})({
                                borderSharedValue,
                                colorSharedValue
                        }),
                [animatedTiming, borderColorInputRanges, borderSharedValue, colorSharedValue, disabled, type]
        )

        useEffect(() => {
                onButtonAnimatedTiming(eventName)
        }, [eventName, onButtonAnimatedTiming])

        return {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle}
}
