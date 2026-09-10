import type {RefObject} from 'react'
import type {ScrollViewProps} from 'react-native'

export type UseDesktopScrollEventOptions = Pick<ScrollViewProps, 'onScroll' | 'onMomentumScrollEnd'>
export interface HandleThrottledScrollOptions extends Pick<ScrollViewProps, 'onScroll' | 'onMomentumScrollEnd'> {
	momentumScrollEndTimer: RefObject<ReturnType<typeof setTimeout> | null>
}
