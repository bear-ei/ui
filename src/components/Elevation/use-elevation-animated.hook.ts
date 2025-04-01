import {useEffect, useMemo} from 'react'
import {Platform} from 'react-native'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {DefaultStyle} from 'react-native-reanimated/lib/typescript/hook/commonTypes'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {handleElevationAnimatedTiming} from './Elevation-handle'
import {UseElevationAnimatedOptions} from './Elevation.interface'

export const useElevationAnimated = ({level = 0}: UseElevationAnimatedOptions) => {
        const shadowSharedValue = useSharedValue<number>(level)
        const theme = useTheme()
        const {elevation, palette} = theme.token
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const inputRanges = useMemo(() => [0, 1, 2, 3, 4, 5], [])
        const shadowOpacityOutputRanges = [
                elevation.level0.shadowOpacity,
                elevation.level1.shadowOpacity,
                elevation.level2.shadowOpacity,
                elevation.level3.shadowOpacity,
                elevation.level4.shadowOpacity,
                elevation.level5.shadowOpacity
        ]

        const elevationOutputRanges = [
                elevation.level0.elevation,
                elevation.level1.elevation,
                elevation.level2.elevation,
                elevation.level3.elevation,
                elevation.level4.elevation,
                elevation.level5.elevation
        ]

        const shadowRadiusOutputRanges = [
                theme.adaptSize(elevation.level0.shadowRadius),
                theme.adaptSize(elevation.level1.shadowRadius),
                theme.adaptSize(elevation.level2.shadowRadius),
                theme.adaptSize(elevation.level3.shadowRadius),
                theme.adaptSize(elevation.level4.shadowRadius),
                theme.adaptSize(elevation.level5.shadowRadius)
        ]

        const shadowOffsetXOutputRanges = [
                theme.adaptSize(elevation.level0.shadowOffset.width),
                theme.adaptSize(elevation.level1.shadowOffset.width),
                theme.adaptSize(elevation.level2.shadowOffset.width),
                theme.adaptSize(elevation.level3.shadowOffset.width),
                theme.adaptSize(elevation.level4.shadowOffset.width),
                theme.adaptSize(elevation.level5.shadowOffset.width)
        ]

        const shadowOffsetYOutputRanges = [
                theme.adaptSize(elevation.level0.shadowOffset.height),
                theme.adaptSize(elevation.level1.shadowOffset.height),
                theme.adaptSize(elevation.level2.shadowOffset.height),
                theme.adaptSize(elevation.level3.shadowOffset.height),
                theme.adaptSize(elevation.level4.shadowOffset.height),
                theme.adaptSize(elevation.level5.shadowOffset.height)
        ]

        const shadowAnimatedStyle = useAnimatedStyle(() => {
                const shadowOffsetX = interpolate(shadowSharedValue.value, inputRanges, shadowOffsetXOutputRanges)
                const shadowOffsetY = interpolate(shadowSharedValue.value, inputRanges, shadowOffsetYOutputRanges)
                const shadowOpacity = interpolate(shadowSharedValue.value, inputRanges, shadowOpacityOutputRanges)
                const shadowRadius = interpolate(shadowSharedValue.value, inputRanges, shadowRadiusOutputRanges)
                const shadowColor =
                        Platform.OS === 'web' ?
                                /** Running in JS thread*/
                                palette.hexToRGBA(elevation.shadowColor)(shadowOpacity)
                        :       elevation.shadowColor

                return (
                        Platform.OS === 'web' ?
                                {boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowRadius}px ${shadowColor}`}
                        :       {
                                        elevation: interpolate(
                                                shadowSharedValue.value,
                                                inputRanges,
                                                elevationOutputRanges
                                        ),
                                        shadowColor: shadowColor,
                                        shadowOffset: {height: shadowOffsetY, width: shadowOffsetX},
                                        shadowOpacity: shadowOpacity,
                                        shadowRadius: shadowRadius
                                }) as DefaultStyle
        })

        const onElevationAnimatedTiming = useMemo(
                () => handleElevationAnimatedTiming(animatedTiming)(shadowSharedValue),
                [animatedTiming, shadowSharedValue]
        )

        useEffect(() => {
                onElevationAnimatedTiming(level)
        }, [level, onElevationAnimatedTiming])

        return {shadowAnimatedStyle}
}
