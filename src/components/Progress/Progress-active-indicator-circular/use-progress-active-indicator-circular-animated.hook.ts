import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedProps, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {handleProgressActiveIndicatorCircularAnimatedTiming} from './Progress-active-indicator-circular-handle'
import {UseProgressActiveIndicatorCircularAnimatedOptions} from './Progress-active-indicator-circular.interface'

export const useProgressActiveIndicatorCircularAnimated = ({
        circumference
}: UseProgressActiveIndicatorCircularAnimatedOptions) => {
        const theme = useTheme()
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const circleSharedValue = useSharedValue(0)
        const containerSharedValue = useSharedValue(0)
        const containerAnimatedStyle = useAnimatedStyle(() => ({
                transform: [{rotate: `${interpolate(containerSharedValue.value, [0, 1, 2], [0, 360, 720])}deg`}]
        }))

        const circleStrokeDashoffsetOutputRange = [
                circumference * (1 - 0.1),
                circumference * (1 - 0.8),
                circumference * (1 - 0.1)
        ]

        const circleAnimatedProps = useAnimatedProps(() => ({
                strokeDashoffset: interpolate(circleSharedValue.value, [0, 1, 2], circleStrokeDashoffsetOutputRange)
        }))

        const onProgressActiveIndicatorCircularAnimatedTiming = useMemo(
                () =>
                        handleProgressActiveIndicatorCircularAnimatedTiming(animatedTiming)({
                                circleSharedValue,
                                containerSharedValue
                        }),
                [animatedTiming, circleSharedValue, containerSharedValue]
        )

        useEffect(() => {
                onProgressActiveIndicatorCircularAnimatedTiming(2)
        }, [onProgressActiveIndicatorCircularAnimatedTiming])

        return {containerAnimatedStyle, circleAnimatedProps}
}
