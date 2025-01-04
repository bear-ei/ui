import {useEffect, useMemo} from 'react'
import {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {handleIconButtonAnimatedTiming} from './Icon-button-handle'
import {UseIconButtonAnimatedOptions} from './Icon-button.interface'

export const useIconButtonAnimated = ({disabled, type = 'filled'}: UseIconButtonAnimatedOptions) => {
        const animatedValue = disabled ? 0 : 1
        const borderSharedValue = useSharedValue(animatedValue)
        const colorSharedValue = useSharedValue(animatedValue)
        const theme = useTheme()
        const {palette, scheme, opacity} = theme.token
        const {convertHexToRGBA} = palette
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const disabledBackgroundColor = convertHexToRGBA(scheme.onSurface)(opacity.level2)
        const backgroundColorType = {
                filled: {
                        inputRange: [0, 1],
                        outputRange: [disabledBackgroundColor, convertHexToRGBA(scheme.primary)(opacity.level10)]
                },
                outlined: {
                        inputRange: [0, 1],
                        outputRange: [
                                convertHexToRGBA(scheme.primary)(opacity.level0),
                                convertHexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                standard: {
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
                                convertHexToRGBA(scheme.secondaryContainer)(opacity.level10)
                        ]
                },
                active: {
                        inputRange: [0, 1],
                        outputRange: [
                                convertHexToRGBA(scheme.primary)(opacity.level0),
                                convertHexToRGBA(scheme.primary)(opacity.level0)
                        ]
                }
        }

        const borderWidth = theme.adaptSize(theme.token.spacing.extraSmall / 4)
        const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
                backgroundColor: interpolateColor(
                        colorSharedValue.value,
                        backgroundColorType[type].inputRange,
                        backgroundColorType[type].outputRange
                ),
                ...(type === 'outlined' && {
                        borderColor: interpolateColor(
                                borderSharedValue.value,
                                [0, 1],
                                [disabledBackgroundColor, scheme.outline]
                        ),
                        borderStyle: 'solid',
                        borderWidth
                })
        }))

        const onIconButtonAnimatedTiming = useMemo(
                () =>
                        handleIconButtonAnimatedTiming({animatedTiming, type})({
                                borderSharedValue,
                                colorSharedValue
                        }),
                [animatedTiming, borderSharedValue, colorSharedValue, type]
        )

        useEffect(() => {
                onIconButtonAnimatedTiming(disabled)
        }, [disabled, onIconButtonAnimatedTiming, type])

        return {backgroundUnderlayAnimatedStyle}
}
