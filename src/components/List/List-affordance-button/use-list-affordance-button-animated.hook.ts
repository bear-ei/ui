import {useAnimatedTiming, useTheme} from '@/hooks'
import {hexToRGBA} from '@bearei/theme-token'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {animateListAffordanceButton} from './List-affordance-button.handler'
import type {UseListAffordanceButtonAnimatedOptions} from './List-affordance-button.interface'

export const useListAffordanceButtonAnimated = ({
    backgroundVisible,
    disabled
}: UseListAffordanceButtonAnimatedOptions) => {
    const theme = useTheme()
    const {scheme, opacity} = theme.token
    const animatedTiming = useAnimatedTiming({token: theme.token})
    const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
    const disabledValue = disabled ? 0 : 1
    const animatedValue = backgroundVisible ? 2 : disabledValue
    const colorSharedValue = useSharedValue(animatedValue)
    const disabledBackgroundColor = hexToRGBA(scheme.onSurface)(opacity.level2)
    const disabledColor = hexToRGBA(scheme.onSurface)(opacity.level5)
    const backgroundColorOutputRanges = [
        disabledBackgroundColor,
        hexToRGBA(scheme.primary)(opacity.level0),
        hexToRGBA(scheme.primary)(opacity.level10)
    ]

    const colorOutputRanges = [
        disabledColor,
        hexToRGBA(scheme.onPrimary)(opacity.level10),
        hexToRGBA(scheme.onPrimary)(opacity.level10)
    ]

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
        runAnimate(backgroundVisible ? 2 : disabledValue)
    }, [backgroundVisible, disabledValue, runAnimate])

    useEffect(
        () => () => {
            cancelAnimation(colorSharedValue)
        },
        [colorSharedValue]
    )

    return {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle}
}
