import {useEffect, useMemo} from 'react'
import {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {handleFABAnimatedTiming} from './FAB-handle'
import {UseFABAnimatedOptions} from './FAB.interface'

export const useFABAnimated = ({disabled, type = 'primary'}: UseFABAnimatedOptions) => {
        const colorSharedValue = useSharedValue(disabled ? 0 : 1)
        const theme = useTheme()
        const {palette, scheme, opacity} = theme.token
        const {convertHexToRGBA} = palette
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const disabledBackgroundColor = convertHexToRGBA(scheme.onSurface)(opacity.level2)
        const disabledColor = convertHexToRGBA(scheme.onSurface)(opacity.level5)
        const backgroundColorType = {
                surface: {
                        inputRange: [0, 1],
                        outputRange: [
                                disabledBackgroundColor,
                                convertHexToRGBA(scheme.surfaceContainerHigh)(opacity.level10)
                        ]
                },
                primary: {
                        inputRange: [0, 1],
                        outputRange: [
                                disabledBackgroundColor,
                                convertHexToRGBA(scheme.primaryContainer)(opacity.level10)
                        ]
                },
                secondary: {
                        inputRange: [0, 1],
                        outputRange: [
                                disabledBackgroundColor,
                                convertHexToRGBA(scheme.secondaryContainer)(opacity.level10)
                        ]
                },
                tertiary: {
                        inputRange: [0, 1],
                        outputRange: [
                                disabledBackgroundColor,
                                convertHexToRGBA(scheme.tertiaryContainer)(opacity.level10)
                        ]
                }
        }

        const colorType = {
                surface: {
                        inputRange: [0, 1],
                        outputRange: [disabledColor, convertHexToRGBA(scheme.primary)(opacity.level10)]
                },
                primary: {
                        inputRange: [0, 1],
                        outputRange: [disabledColor, convertHexToRGBA(scheme.onPrimaryContainer)(opacity.level10)]
                },
                secondary: {
                        inputRange: [0, 1],
                        outputRange: [disabledColor, convertHexToRGBA(scheme.onSecondaryContainer)(opacity.level10)]
                },
                tertiary: {
                        inputRange: [0, 1],
                        outputRange: [disabledColor, convertHexToRGBA(scheme.onTertiaryContainer)(opacity.level10)]
                }
        }

        const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
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
                () => handleFABAnimatedTiming(animatedTiming)(colorSharedValue),
                [animatedTiming, colorSharedValue]
        )

        useEffect(() => {
                onFABAnimatedTiming(disabled)
        }, [disabled, onFABAnimatedTiming])

        return {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle}
}
