import {COMPONENT_STATUS} from '@/constants'
import {useAnimatedTiming, useTheme} from '@/hooks'
import {EASING} from '@bearei/theme-token'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedProps, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {
        animateProgressActiveIndicatorCircular,
        computeProgressStrokeDashoffset
} from './Progress-active-indicator-circular.handler'
import type {UseProgressActiveIndicatorCircularAnimatedOptions} from './Progress-active-indicator-circular.interface'

export const useProgressActiveIndicatorCircularAnimated = ({
        circumference,
        enableAnimated,
        status
}: UseProgressActiveIndicatorCircularAnimatedOptions) => {
        const theme = useTheme()
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const animateSharedValueTo = useMemo(
                () => animatedTiming({repeat: 0, duration: 2000, easing: EASING.LINEAR}),
                [animatedTiming]
        )

        const circleSharedValue = useSharedValue(0)
        const containerSharedValue = useSharedValue(0)
        const containerAnimatedStyle = useAnimatedStyle(() => ({
                transform: [{rotate: `${interpolate(containerSharedValue.value, [0, 1, 2], [0, 360, 720])}deg`}]
        }))

        const circleStrokeDashoffsetOutputRanges = [
                computeProgressStrokeDashoffset(circumference)(0.1),
                computeProgressStrokeDashoffset(circumference)(0.8),
                computeProgressStrokeDashoffset(circumference)(0.1)
        ]

        const circleAnimatedProps = useAnimatedProps(() => ({
                strokeDashoffset: interpolate(circleSharedValue.value, [0, 1, 2], circleStrokeDashoffsetOutputRanges)
        }))

        const runAnimate = useMemo(
                () =>
                        animateProgressActiveIndicatorCircular(animateSharedValueTo)({
                                circleSharedValue,
                                containerSharedValue
                        }),
                [animateSharedValueTo, circleSharedValue, containerSharedValue]
        )

        useEffect(() => {
                if (status === COMPONENT_STATUS.SUCCEEDED) {
                        runAnimate(enableAnimated)
                }
        }, [enableAnimated, runAnimate, status])

        useEffect(
                () => () => {
                        cancelAnimation(circleSharedValue)
                        cancelAnimation(containerSharedValue)
                },
                [circleSharedValue, containerSharedValue]
        )

        return {containerAnimatedStyle, circleAnimatedProps}
}
