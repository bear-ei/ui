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
import {AnimatedTiming, useAnimatedTiming} from '../../hook'
import {UseElevationAnimatedOptions} from './Elevation.interface'

const handleElevationAnimatedTiming =
    (animatedTiming: AnimatedTiming) => (shadowSharedValue: SharedValue<AnimatableValue>) => (level: number) =>
        animatedTiming()(shadowSharedValue)(level)

export const useElevationAnimated = ({level = 0}: UseElevationAnimatedOptions) => {
    const shadowSharedValue = useSharedValue(level)
    const theme = useTheme()
    const {elevation} = theme.token
    const animatedTiming = useAnimatedTiming(theme.token)
    const shadowOpacityOutputRange = [
        elevation.level0.shadowOpacity,
        elevation.level1.shadowOpacity,
        elevation.level2.shadowOpacity,
        elevation.level3.shadowOpacity,
        elevation.level4.shadowOpacity,
        elevation.level5.shadowOpacity
    ]

    const shadowAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(shadowSharedValue.value, [0, 1, 2, 3, 4, 5], shadowOpacityOutputRange, Extrapolation.CLAMP)
    }))

    const onElevationAnimatedTiming = useMemo(
        () => handleElevationAnimatedTiming(animatedTiming)(shadowSharedValue),
        [animatedTiming, shadowSharedValue]
    )

    useEffect(() => {
        onElevationAnimatedTiming(level)
    }, [level, onElevationAnimatedTiming])

    return shadowAnimatedStyle
}
