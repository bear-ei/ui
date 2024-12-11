import {useEffect, useMemo} from 'react'
import {InteractionManager} from 'react-native'
import {AnimatableValue, SharedValue, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../../hooks'
import {UseVirtualListItemAnimatedOptions} from './Virtual-list-item.interface'

const handleVirtualListItemAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (topSharedValue: SharedValue<AnimatableValue>) => (value: number) =>
                animatedTiming({duration: 'short2'})(topSharedValue)(value)

export const useVirtualListItemAnimated = ({top = 0}: UseVirtualListItemAnimatedOptions) => {
        const theme = useTheme()
        const animatedTiming = useAnimatedTiming(theme.token)
        const topSharedValue = useSharedValue(top)
        const containerAnimatedStyle = useAnimatedStyle(() => ({
                top: topSharedValue.value
        }))

        const onVirtualListItemAnimatedTiming = useMemo(
                () => handleVirtualListItemAnimatedTiming(animatedTiming)(topSharedValue),
                [animatedTiming, topSharedValue]
        )

        useEffect(() => {
                InteractionManager.runAfterInteractions(() => onVirtualListItemAnimatedTiming(top))
        }, [onVirtualListItemAnimatedTiming, top])

        return {containerAnimatedStyle}
}
