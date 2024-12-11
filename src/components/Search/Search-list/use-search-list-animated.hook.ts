import {useEffect, useMemo} from 'react'
import {InteractionManager} from 'react-native'
import {AnimatableValue, SharedValue, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../../hooks'
import {UseSearchListAnimatedOptions} from './Search-list.interface'

const handleSearchListAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (heightSharedValue: SharedValue<AnimatableValue>) => (visible?: boolean) =>
                animatedTiming({
                        duration: visible ? 'medium3' : 'short3',
                        easing: visible ? 'emphasizedDecelerate' : 'emphasizedAccelerate'
                })(heightSharedValue)(visible ? 1 : 0)

export const useSearchListAnimated = ({visible, containerLayout}: UseSearchListAnimatedOptions) => {
        const heightSharedValue = useSharedValue(visible ? 1 : 0)
        const theme = useTheme()
        const {spacing} = theme.token
        const animatedTiming = useAnimatedTiming(theme.token)
        const heightOutputRange = [
                theme.adaptSize(spacing.none),
                theme.adaptSize(spacing.extraSmall * 80 + (containerLayout.height ?? 0))
        ]

        const containerAnimatedStyle = useAnimatedStyle(() => ({
                height: interpolate(heightSharedValue.value, [0, 1], heightOutputRange)
        }))

        const onSearchListAnimatedTiming = useMemo(
                () => handleSearchListAnimatedTiming(animatedTiming)(heightSharedValue),
                [animatedTiming, heightSharedValue]
        )

        useEffect(() => {
                InteractionManager.runAfterInteractions(() => onSearchListAnimatedTiming(visible))
        }, [onSearchListAnimatedTiming, visible])

        return {containerAnimatedStyle}
}
