import {useAnimatedTiming, useTheme} from '@/hooks'
import {hexToRGBA} from '@bearei/theme-token'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {animateListAffordanceButton} from './List-affordance-button.handler'
import type {UseListAffordanceButtonAnimatedOptions} from './List-affordance-button.interface'

export const useListAffordanceButtonAnimated = ({
        disabled,
        backgroundVisible
}: UseListAffordanceButtonAnimatedOptions) => {
        const theme = useTheme()
        const {scheme, opacity} = theme.token
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
        const animatedValue =
                backgroundVisible ? 2
                : disabled ? 0
                : 1

        const colorSharedValue = useSharedValue(animatedValue)
        const disabledBackgroundColor = hexToRGBA(scheme.onSurface)(opacity.level2.opacity)
        const disabledColor = hexToRGBA(scheme.onSurface)(opacity.level5.opacity)
        const backgroundColorOutputRanges = useMemo(
                () => [
                        disabledBackgroundColor,
                        hexToRGBA(scheme.primary)(opacity.level0.opacity),
                        hexToRGBA(scheme.primary)(opacity.level10.opacity)
                ],
                [disabledBackgroundColor, opacity.level0.opacity, opacity.level10.opacity, scheme.primary]
        )

        const colorOutputRanges = useMemo(
                () => [
                        disabledColor,
                        hexToRGBA(scheme.onPrimary)(opacity.level10.opacity),
                        hexToRGBA(scheme.onPrimary)(opacity.level10.opacity)
                ],
                [disabledColor, opacity.level10.opacity, scheme.onPrimary]
        )

        const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
                backgroundColor: interpolateColor(colorSharedValue.value, [0, 1, 2], backgroundColorOutputRanges)
        }))

        const labelTextAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(colorSharedValue.value, [0, 1, 2], colorOutputRanges)
        }))

        const runAnimate = useMemo(
                () => animateListAffordanceButton(animateSharedValueTo)(colorSharedValue),
                [animateSharedValueTo, colorSharedValue]
        )

        useEffect(() => {
                runAnimate(
                        backgroundVisible ? 2
                        : disabled ? 0
                        : 1
                )
        }, [runAnimate, disabled, backgroundVisible])

        useEffect(() => () => cancelAnimation(colorSharedValue), [colorSharedValue])

        return {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle}
}
