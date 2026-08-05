import type {NativeScrollEvent, NativeSyntheticEvent} from 'react-native'
import type {HandleThrottledScrollOptions} from './use-desktop-scroll-event.interface'

export const handleThrottledScroll =
    ({momentumScrollEndTimer, onMomentumScrollEnd, onScroll}: HandleThrottledScrollOptions) =>
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        onScroll?.(event)

        if (!onMomentumScrollEnd) {
            return
        }

        if (momentumScrollEndTimer.current) {
            clearTimeout(momentumScrollEndTimer.current)
        }

        momentumScrollEndTimer.current = setTimeout(() => onMomentumScrollEnd?.(event), 150)
    }
