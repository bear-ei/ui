import {useAnimatedTiming, useTheme} from '@/hooks'
import {hexToRGBA} from '@bearei/theme-token'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {FAB_TYPE} from './FAB.enum'
import {animateFAB} from './FAB.handler'
import type {UseFABAnimatedOptions} from './FAB.interface'

export const useFABAnimated = ({disabled, type = FAB_TYPE.PRIMARY}: UseFABAnimatedOptions) => {
        const colorSharedValue = useSharedValue(disabled ? 0 : 1)
        const theme = useTheme()
        const {scheme, opacity} = theme.token
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
        const disabledBackgroundColor = hexToRGBA(scheme.onSurface)(opacity.level2.opacity)
        const disabledColor = hexToRGBA(scheme.onSurface)(opacity.level5.opacity)
        const backgroundColorType = useMemo(
                () => ({
                        [FAB_TYPE.SURFACE]: {
                                inputRanges: [0, 1],
                                outputRanges: [
                                        disabledBackgroundColor,
                                        hexToRGBA(scheme.surfaceContainerHigh)(opacity.level10.opacity)
                                ]
                        },
                        [FAB_TYPE.PRIMARY]: {
                                inputRanges: [0, 1],
                                outputRanges: [
                                        disabledBackgroundColor,
                                        hexToRGBA(scheme.primaryContainer)(opacity.level10.opacity)
                                ]
                        },
                        [FAB_TYPE.SECONDARY]: {
                                inputRanges: [0, 1],
                                outputRanges: [
                                        disabledBackgroundColor,
                                        hexToRGBA(scheme.secondaryContainer)(opacity.level10.opacity)
                                ]
                        },
                        [FAB_TYPE.TERTIARY]: {
                                inputRanges: [0, 1],
                                outputRanges: [
                                        disabledBackgroundColor,
                                        hexToRGBA(scheme.tertiaryContainer)(opacity.level10.opacity)
                                ]
                        }
                }),
                [
                        disabledBackgroundColor,
                        opacity.level10.opacity,
                        scheme.primaryContainer,
                        scheme.secondaryContainer,
                        scheme.surfaceContainerHigh,
                        scheme.tertiaryContainer
                ]
        )

        const colorType = useMemo(
                () => ({
                        [FAB_TYPE.SURFACE]: {
                                inputRanges: [0, 1],
                                outputRanges: [disabledColor, hexToRGBA(scheme.primary)(opacity.level10.opacity)]
                        },
                        [FAB_TYPE.PRIMARY]: {
                                inputRanges: [0, 1],
                                outputRanges: [
                                        disabledColor,
                                        hexToRGBA(scheme.onPrimaryContainer)(opacity.level10.opacity)
                                ]
                        },
                        [FAB_TYPE.SECONDARY]: {
                                inputRanges: [0, 1],
                                outputRanges: [
                                        disabledColor,
                                        hexToRGBA(scheme.onSecondaryContainer)(opacity.level10.opacity)
                                ]
                        },
                        [FAB_TYPE.TERTIARY]: {
                                inputRanges: [0, 1],
                                outputRanges: [
                                        disabledColor,
                                        hexToRGBA(scheme.onTertiaryContainer)(opacity.level10.opacity)
                                ]
                        }
                }),
                [
                        disabledColor,
                        opacity.level10.opacity,
                        scheme.onPrimaryContainer,
                        scheme.onSecondaryContainer,
                        scheme.onTertiaryContainer,
                        scheme.primary
                ]
        )

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

        const runAnimate = useMemo(
                () => animateFAB(animateSharedValueTo)(colorSharedValue),
                [animateSharedValueTo, colorSharedValue]
        )

        useEffect(() => {
                runAnimate(disabled)
        }, [runAnimate, disabled])

        useEffect(() => () => cancelAnimation(colorSharedValue), [colorSharedValue])

        return {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle}
}
