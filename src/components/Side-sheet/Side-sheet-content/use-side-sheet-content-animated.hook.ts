import {useEffect, useMemo} from 'react'
import {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {handleSideSheetContentVisibleAnimatedTiming} from './Side-sheet-content-handle'
import {UseSideSheetContentAnimatedOptions} from './Side-sheet-content.interface'

export const useSideSheetContentAnimated = ({type = 'standard', visible}: UseSideSheetContentAnimatedOptions) => {
        const animatedValue = visible ? 1 : 0
        const theme = useTheme()
        const {palette, scheme, opacity} = theme.token
        const {convertHexToRGBA} = palette
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const backgroundColorSharedValue = useSharedValue(animatedValue)
        const standard = ['standard', 'standardContainer'].includes(type)
        const containerBackgroundColorOutputRange = [
                convertHexToRGBA(scheme.scrim)(opacity.level0),
                standard ?
                        convertHexToRGBA(scheme.scrim)(opacity.level0)
                :       convertHexToRGBA(scheme.scrim)(opacity.level4)
        ]

        const containerAnimatedStyle = useAnimatedStyle(() => ({
                backgroundColor: interpolateColor(
                        backgroundColorSharedValue.value,
                        [0, 1],
                        containerBackgroundColorOutputRange
                )
        }))

        const onSideSheetContentVisibleAnimatedTiming = useMemo(
                () => handleSideSheetContentVisibleAnimatedTiming(animatedTiming)(backgroundColorSharedValue),
                [animatedTiming, backgroundColorSharedValue]
        )

        useEffect(() => {
                onSideSheetContentVisibleAnimatedTiming(visible)
        }, [onSideSheetContentVisibleAnimatedTiming, visible])

        return {containerAnimatedStyle}
}
