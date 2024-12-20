import {useEffect, useMemo} from 'react'
import {SharedValue, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../../hooks'
import {UseProgressActiveIndicatorLinearAnimatedOptions} from './Progress-active-indicator-linear.interface'

const handleProgressActiveIndicatorLinearAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (widthSharedValue: SharedValue<number>) => (value?: number) => {
                if (typeof value === 'number') {
                        animatedTiming()(widthSharedValue)(value)
                }
        }

const handleOutputRange = (width: number) => (increment: number) => {
        const actualIncrement = width * (increment / 100)

        return Array.from({length: Math.ceil(width / actualIncrement) + 1}, (_, index) =>
                Math.round(index * actualIncrement)
        )
}

export const useProgressActiveIndicatorLinearAnimated = ({
        containerLayout,
        defaultValue = 0,
        increment = 1,
        value
}: UseProgressActiveIndicatorLinearAnimatedOptions) => {
        const widthSharedValue = useSharedValue(defaultValue)
        const theme = useTheme()
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const outputRange = Array.from(handleOutputRange(containerLayout.width)(increment))
        const inputRange = outputRange.map((_value, index) => index)
        const containerAnimatedStyle = useAnimatedStyle(() => ({
                width: interpolate(widthSharedValue.value, inputRange, outputRange)
        }))

        const onProgressActiveIndicatorLinearAnimatedTiming = useMemo(
                () => handleProgressActiveIndicatorLinearAnimatedTiming(animatedTiming)(widthSharedValue),
                [animatedTiming, widthSharedValue]
        )

        useEffect(() => {
                onProgressActiveIndicatorLinearAnimatedTiming(value)
        }, [onProgressActiveIndicatorLinearAnimatedTiming, value])

        return {containerAnimatedStyle}
}
