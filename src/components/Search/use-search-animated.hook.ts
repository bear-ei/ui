import {useAnimatedTiming, useTheme} from '@/hooks'
import {hexToRGBA} from '@bearei/theme-token'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {animateSearch} from './Search.handler'
import type {UseSearchTextInputAnimatedOptions} from './Search.interface'

export const useSearchAnimated = ({disabled}: UseSearchTextInputAnimatedOptions) => {
        const animatedValue = disabled ? 0 : 1
        const colorSharedValue = useSharedValue(animatedValue)
        const theme = useTheme()
        const {scheme, opacity} = theme.token
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
        const disabledBackgroundColor = hexToRGBA(scheme.onSurface)(opacity.level2)
        const disabledColor = hexToRGBA(scheme.onSurface)(opacity.level5)
        const backgroundSharedValueOutputRanges = [
                disabledBackgroundColor,
                hexToRGBA(scheme.surfaceContainerHigh)(opacity.level10)
        ]

        const contentAnimatedStyle = useAnimatedStyle(() => ({
                backgroundColor: interpolateColor(colorSharedValue.value, [0, 1], backgroundSharedValueOutputRanges)
        }))

        const inputColorSharedValueOutputRanges = [disabledColor, hexToRGBA(scheme.onSurface)(opacity.level10)]
        const inputAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(colorSharedValue.value, [0, 1], inputColorSharedValueOutputRanges)
        }))

        const runAnimate = useMemo(
                () => animateSearch(animateSharedValueTo)(colorSharedValue),
                [animateSharedValueTo, colorSharedValue]
        )

        useEffect(() => {
                runAnimate(disabled)
        }, [runAnimate, disabled])

        useEffect(
                () => () => {
                        requestIdleCallback(() => cancelAnimation(colorSharedValue))
                },
                [colorSharedValue]
        )

        return {contentAnimatedStyle, inputAnimatedStyle}
}
