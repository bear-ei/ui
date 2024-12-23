import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../hooks'
import {HandleLoadingAnimatedTimingOptions} from './Loading.interface'

const handleLoadingAnimatedTiming =
        (animatedTiming: AnimatedTiming) =>
        ({contentSharedValue, rippleSharedValue}: HandleLoadingAnimatedTimingOptions) =>
        (value: number) => {
                animatedTiming({repeat: -1, duration: 1500})(contentSharedValue)(value)
                animatedTiming({repeat: -1, duration: 1500})(rippleSharedValue)(value)
        }

export const useLoadingAnimated = () => {
        const theme = useTheme()
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const contentSharedValue = useSharedValue(0)
        const rippleSharedValue = useSharedValue(0)
        const contentAnimatedStyle = useAnimatedStyle(() => ({
                transform: [{rotate: `${interpolate(contentSharedValue.value, [0, 1, 2], [0, 180, 360])}deg`}]
        }))

        const rippleAnimatedStyle = useAnimatedStyle(() => ({
                opacity: interpolate(
                        rippleSharedValue.value,
                        [0, 1, 2],
                        [theme.token.opacity.level9, theme.token.opacity.level5, theme.token.opacity.level0]
                ),
                transform: [{scale: interpolate(rippleSharedValue.value, [0, 1, 2], [0.8, 1, 1.2])}]
        }))

        const onLoadingAnimatedTiming = useMemo(
                () => handleLoadingAnimatedTiming(animatedTiming)({contentSharedValue, rippleSharedValue}),
                [animatedTiming, contentSharedValue, rippleSharedValue]
        )

        useEffect(() => {
                onLoadingAnimatedTiming(2)
        }, [onLoadingAnimatedTiming])

        return {contentAnimatedStyle, rippleAnimatedStyle}
}
