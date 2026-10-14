import type {NativeScrollEvent, NativeSyntheticEvent} from 'react-native'
import type {HandleDesktopScrollOptions} from './use-desktop-scroll-event.interface'

export const handleDesktopScroll =
	({momentumScrollEndTimer, onMomentumScrollEnd, onScroll}: HandleDesktopScrollOptions) =>
	(event: NativeSyntheticEvent<NativeScrollEvent>) => {
		onScroll?.(event)

		if (!onMomentumScrollEnd) {
			return
		}

		if (momentumScrollEndTimer.current) {
			clearTimeout(momentumScrollEndTimer.current)
			momentumScrollEndTimer.current = null
		}

		momentumScrollEndTimer.current = setTimeout(() => onMomentumScrollEnd?.(event), 150)
	}
