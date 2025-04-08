import {useEffect, useMemo} from 'react'
import {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {handleFABAnimatedTiming} from './FAB-handle'
import {FABType} from './FAB.enum'
import {UseFABAnimatedOptions} from './FAB.interface'

export const useFABAnimated = ({disabled, type = FABType.PRIMARY}: UseFABAnimatedOptions) => {
        const colorSharedValue = useSharedValue(disabled ? 0 : 1)
        const theme = useTheme()
        const {palette, scheme, opacity} = theme.token
        const {hexToRGBA} = palette
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const disabledBackgroundColor = hexToRGBA(scheme.onSurface)(opacity.level2)
        const disabledColor = hexToRGBA(scheme.onSurface)(opacity.level5)
        const backgroundColorType = {
                [FABType.SURFACE]: {
                        inputRanges: [0, 1],
                        outputRanges: [disabledBackgroundColor, hexToRGBA(scheme.surfaceContainerHigh)(opacity.level10)]
                },
                [FABType.PRIMARY]: {
                        inputRanges: [0, 1],
                        outputRanges: [disabledBackgroundColor, hexToRGBA(scheme.primaryContainer)(opacity.level10)]
                },
                [FABType.SECONDARY]: {
                        inputRanges: [0, 1],
                        outputRanges: [disabledBackgroundColor, hexToRGBA(scheme.secondaryContainer)(opacity.level10)]
                },
                [FABType.TERTIARY]: {
                        inputRanges: [0, 1],
                        outputRanges: [disabledBackgroundColor, hexToRGBA(scheme.tertiaryContainer)(opacity.level10)]
                }
        }

        const colorType = {
                [FABType.SURFACE]: {
                        inputRanges: [0, 1],
                        outputRanges: [disabledColor, hexToRGBA(scheme.primary)(opacity.level10)]
                },
                [FABType.PRIMARY]: {
                        inputRanges: [0, 1],
                        outputRanges: [disabledColor, hexToRGBA(scheme.onPrimaryContainer)(opacity.level10)]
                },
                [FABType.SECONDARY]: {
                        inputRanges: [0, 1],
                        outputRanges: [disabledColor, hexToRGBA(scheme.onSecondaryContainer)(opacity.level10)]
                },
                [FABType.TERTIARY]: {
                        inputRanges: [0, 1],
                        outputRanges: [disabledColor, hexToRGBA(scheme.onTertiaryContainer)(opacity.level10)]
                }
        }

        const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
                backgroundColor: interpolateColor(
                        colorSharedValue.value,
                        backgroundColorType[type].inputRanges,
                        backgroundColorType[type].outputRanges
                )
        }))

        const labelTextAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(
                        colorSharedValue.value,
                        colorType[type].inputRanges,
                        colorType[type].outputRanges
                )
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
