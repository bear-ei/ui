import {useEffect, useMemo} from 'react'
import Animated, {
        scrollTo,
        useAnimatedRef,
        useAnimatedStyle,
        useDerivedValue,
        useSharedValue
} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {handleVirtualListAnimated} from './Virtual-list-handle'
import {UseVirtualListScrollAnimatedOptions} from './Virtual-list.interface'

export const useVirtualListAnimated = ({
        contentSize = 0,
        focusedIndex = 0,
        itemSize = 0
}: UseVirtualListScrollAnimatedOptions) => {
        const theme = useTheme()
        const animatedRef = useAnimatedRef<Animated.ScrollView>()
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const contentHeightSharedValue = useSharedValue(contentSize)
        const scrollY = useSharedValue(0)

        useDerivedValue(() => scrollTo(animatedRef, focusedIndex * itemSize, scrollY.value, true))

        const contentAnimatedStyle = useAnimatedStyle(() => ({minHeight: contentHeightSharedValue.value}))
        const onVirtualListItemAnimated = useMemo(
                () => handleVirtualListAnimated(animatedTiming)(contentHeightSharedValue),
                [animatedTiming, contentHeightSharedValue]
        )

        useEffect(() => {
                onVirtualListItemAnimated(contentSize)
        }, [onVirtualListItemAnimated, contentSize])

        return {animatedRef, contentAnimatedStyle}
}
