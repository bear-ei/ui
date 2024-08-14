import {useEffect, useMemo} from 'react'
import {
    AnimatableValue,
    Extrapolation,
    SharedValue,
    interpolate,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../../hooks'
import {UseProgressActiveIndicatorAnimatedOptions} from './Progress-active-indicator.interface'

const handleProgressActiveIndicatorAnimatedTiming =
    (animatedTiming: AnimatedTiming) => (widthSharedValue: SharedValue<AnimatableValue>) => (value?: number) =>
        typeof value === 'number' && animatedTiming()(widthSharedValue)(Math.floor(value * 100))

const processOutputRange = (width: number) => (increment: number) => {
    const actualIncrement = width * (increment / 100)

    return Array.from({length: Math.ceil(width / actualIncrement) + 1}, (_, index) =>
        Math.round(index * actualIncrement)
    )
}

export const useProgressActiveIndicatorAnimated = ({
    containerLayout,
    defaultValue = 0,
    increment = 10,
    value
}: UseProgressActiveIndicatorAnimatedOptions) => {
    const widthSharedValue = useSharedValue(defaultValue)
    const theme = useTheme()
    const animatedTiming = useAnimatedTiming(theme.token)
    const outputRange = Array.from(processOutputRange(containerLayout.width)(increment))
    const inputRange = outputRange.map((_value, index) => index)
    const animatedStyle = useAnimatedStyle(() => ({
        width: interpolate(widthSharedValue.value, inputRange, outputRange, Extrapolation.CLAMP)
    }))

    const onProgressActiveIndicatorAnimatedTiming = useMemo(
        () => handleProgressActiveIndicatorAnimatedTiming(animatedTiming)(widthSharedValue),
        [animatedTiming, widthSharedValue]
    )

    useEffect(() => {
        onProgressActiveIndicatorAnimatedTiming(value)
    }, [onProgressActiveIndicatorAnimatedTiming, value])

    return animatedStyle
}
