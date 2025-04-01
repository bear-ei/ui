import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {handleSearchListAnimatedTiming} from './Search-list-handle'
import {UseSearchListAnimatedOptions} from './Search-list.interface'

/**
 * TODO: Use Layout-animated
 */

export const useSearchListAnimated = ({visible, containerLayout}: UseSearchListAnimatedOptions) => {
        const heightSharedValue = useSharedValue(visible ? 1 : 0)
        const theme = useTheme()
        const {spacing} = theme.token
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const heightOutputRanges = [
                theme.adaptSize(spacing.none),
                theme.adaptSize(spacing.extraSmall * 80 + (containerLayout.height ?? 0))
        ]

        const containerAnimatedStyle = useAnimatedStyle(() => ({
                height: interpolate(heightSharedValue.value, [0, 1], heightOutputRange),
                transform: [{scaleY: interpolate(heightSharedValue.value, [0, 1], [0, 1])}]
        }))

        const onSearchListAnimatedTiming = useMemo(
                () => handleSearchListAnimatedTiming(animatedTiming)(heightSharedValue),
                [animatedTiming, heightSharedValue]
        )

        useEffect(() => {
                onSearchListAnimatedTiming(visible)
        }, [onSearchListAnimatedTiming, visible])

        return {containerAnimatedStyle}
}
