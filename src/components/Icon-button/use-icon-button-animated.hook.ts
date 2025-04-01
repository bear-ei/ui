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
        const {hexToRGBA} = palette
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const disabledBackgroundColor = hexToRGBA(scheme.onSurface)(opacity.level2)
        const backgroundColorType = {
                filled: {
                        inputRanges: [0, 1],
                        outputRanges: [disabledBackgroundColor, hexToRGBA(scheme.primary)(opacity.level10)]
                },
                outlined: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                hexToRGBA(scheme.primary)(opacity.level0),
                                hexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                standard: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                hexToRGBA(scheme.primary)(opacity.level0),
                                hexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                tonal: {
                        inputRanges: [0, 1],
                        outputRanges: [disabledBackgroundColor, hexToRGBA(scheme.secondaryContainer)(opacity.level10)]
                },
                active: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                hexToRGBA(scheme.primary)(opacity.level0),
                                hexToRGBA(scheme.primary)(opacity.level0)
                        ]
                }
        }

        const borderWidth = theme.adaptSize(theme.token.spacing.extraSmall / 4)
        const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
                backgroundColor: interpolateColor(
                        colorSharedValue.value,
                        backgroundColorType[type].inputRanges,
                        backgroundColorType[type].outputRanges
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
