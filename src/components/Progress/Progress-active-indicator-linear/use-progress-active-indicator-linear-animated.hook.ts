import {COMPONENT_STATUS} from '@/constants'
import {useAnimatedTiming, useTheme} from '@/hooks'
import {debounce} from '@/utils'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {animateProgressActiveIndicatorLinear} from './Progress-active-indicator-linear.handler'
import type {UseProgressActiveIndicatorLinearAnimatedOptions} from './Progress-active-indicator-linear.interface'

export const useProgressActiveIndicatorLinearAnimated = ({
        defaultValue = 0,
        status,
        value
}: UseProgressActiveIndicatorLinearAnimatedOptions) => {
        const scaleXSharedValue = useSharedValue(defaultValue)
        const theme = useTheme()
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
        const contentAnimatedStyle = useAnimatedStyle(() => ({transform: [{scaleX: scaleXSharedValue.value}]}))
        const runAnimate = useMemo(
                () => debounce(animateProgressActiveIndicatorLinear(animateSharedValueTo)(scaleXSharedValue))(50),
                [animateSharedValueTo, scaleXSharedValue]
        )

        useEffect(() => {
                if (status === COMPONENT_STATUS.SUCCEEDED) {
                        runAnimate(value)
                }
        }, [runAnimate, status, value])

        useEffect(
                () => () => {
                        requestIdleCallback(() => cancelAnimation(scaleXSharedValue))
                },
                [scaleXSharedValue]
        )

        return {contentAnimatedStyle}
}
