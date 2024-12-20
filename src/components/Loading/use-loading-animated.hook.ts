import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../hooks'
import {HandleLoadingAnimatedTimingOptions} from './Loading.interface'

const handleLoadingAnimatedTiming =
        (animatedTiming: AnimatedTiming) =>
        ({containerSharedValue, rippleSharedValue}: HandleLoadingAnimatedTimingOptions) =>
        (value: number) => {
                animatedTiming({repeat: -1, duration: 1500})(containerSharedValue)(value)
                animatedTiming({repeat: -1, duration: 1500})(rippleSharedValue)(value)
        }

export const useLoadingAnimated = () => {
        const theme = useTheme()
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const containerSharedValue = useSharedValue(0)
        const rippleSharedValue = useSharedValue(0)
        const containerAnimatedStyle = useAnimatedStyle(() => ({
                transform: [
                        {rotate: `${interpolate(containerSharedValue.value, [0, 1, 2], [0, 180, 360])}deg`},
                        {scale: interpolate(containerSharedValue.value, [0, 1, 2], [1, 0.9, 1])}
                ]
        }))

        const rippleAnimatedStyle = useAnimatedStyle(() => ({
                opacity: interpolate(rippleSharedValue.value, [0, 1, 2], [0.8, 0.4, 0]),
                transform: [{scale: interpolate(rippleSharedValue.value, [0, 1, 2], [0.8, 1.2, 1.6])}]
        }))

        const onLoadingAnimatedTiming = useMemo(
                () => handleLoadingAnimatedTiming(animatedTiming)({containerSharedValue, rippleSharedValue}),
                [animatedTiming, containerSharedValue, rippleSharedValue]
        )

        useEffect(() => {
                onLoadingAnimatedTiming(2)
        }, [onLoadingAnimatedTiming])

        return {containerAnimatedStyle, rippleAnimatedStyle}
}
