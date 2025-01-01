import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {handleElevationAnimatedTiming} from './Elevation-handle'
import {UseElevationAnimatedOptions} from './Elevation.interface'

export const useElevationAnimated = ({level = 0}: UseElevationAnimatedOptions) => {
        const shadowSharedValue = useSharedValue(level)
        const theme = useTheme()
        const {elevation} = theme.token
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const shadowOpacityOutputRange = [
                elevation.level0.shadowOpacity,
                elevation.level1.shadowOpacity,
                elevation.level2.shadowOpacity,
                elevation.level3.shadowOpacity,
                elevation.level4.shadowOpacity,
                elevation.level5.shadowOpacity
        ]

        const shadowAnimatedStyle = useAnimatedStyle(() => ({
                opacity: interpolate(shadowSharedValue.value, [0, 1, 2, 3, 4, 5], shadowOpacityOutputRange)
        }))

        const onElevationAnimatedTiming = useMemo(
                () => handleElevationAnimatedTiming(animatedTiming)(shadowSharedValue),
                [animatedTiming, shadowSharedValue]
        )

        useEffect(() => {
                onElevationAnimatedTiming(level)
        }, [level, onElevationAnimatedTiming])

        return {shadowAnimatedStyle}
}
