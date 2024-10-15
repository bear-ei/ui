import {useEffect, useMemo} from 'react'
import {AnimatableValue, SharedValue, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../../hooks'
import {UseVirtualListItemAnimatedOptions} from './Virtual-list-item.interface'

const handleVirtualListItemAnimated =
    (animatedTiming: AnimatedTiming) => (topSharedValue: SharedValue<AnimatableValue>) => (value: number) =>
        animatedTiming({duration: 'short2'})(topSharedValue)(value)

export const useVirtualListItemAnimated = ({top = 0}: UseVirtualListItemAnimatedOptions) => {
    const theme = useTheme()
    const animatedTiming = useAnimatedTiming(theme.token)
    const topSharedValue = useSharedValue(top)
    const containerAnimatedStyle = useAnimatedStyle(() => ({top: topSharedValue.value}))
    const onVirtualListItemAnimated = useMemo(
        () => handleVirtualListItemAnimated(animatedTiming)(topSharedValue),
        [animatedTiming, topSharedValue]
    )

    useEffect(() => {
        onVirtualListItemAnimated(top)
    }, [onVirtualListItemAnimated, top])

    return {containerAnimatedStyle}
}
