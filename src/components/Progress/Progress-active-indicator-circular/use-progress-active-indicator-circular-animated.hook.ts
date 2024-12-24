import {useEffect, useMemo} from 'react'
import {interpolate, SharedValue, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../../hooks'

const handleProgressActiveIndicatorCircularAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (contentSharedValue: SharedValue<number>) => (value: number) =>
                animatedTiming({repeat: -1, duration: 1500})(contentSharedValue)(value)

export const useProgressActiveIndicatorCircularAnimated = () => {
        const theme = useTheme()
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const iconSharedValue = useSharedValue(0)
        const iconAnimatedStyle = useAnimatedStyle(() => ({
                transform: [{rotate: `${interpolate(iconSharedValue.value, [0, 1, 2], [0, 180, 360])}deg`}]
        }))

        const onProgressActiveIndicatorCircularAnimatedTiming = useMemo(
                () => handleProgressActiveIndicatorCircularAnimatedTiming(animatedTiming)(iconSharedValue),
                [animatedTiming, iconSharedValue]
        )

        useEffect(() => {
                onProgressActiveIndicatorCircularAnimatedTiming(2)
        }, [onProgressActiveIndicatorCircularAnimatedTiming])

        return {iconAnimatedStyle}
}
