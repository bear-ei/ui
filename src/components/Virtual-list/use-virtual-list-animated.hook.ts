import Animated, {scrollTo, useAnimatedRef, useDerivedValue, useSharedValue} from 'react-native-reanimated'
import {UseVirtualListScrollAnimatedOptions} from './Virtual-list.interface'

export const useVirtualListAnimated = ({focusedIndex = 0, itemSize = 0}: UseVirtualListScrollAnimatedOptions) => {
        const animatedRef = useAnimatedRef<Animated.ScrollView>()
        const scrollY = useSharedValue(0)

        useDerivedValue(() => scrollTo(animatedRef, focusedIndex * itemSize, scrollY.value, true))

        return {animatedRef}
}
