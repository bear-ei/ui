import type {MutableRefObject} from 'react'
import type {ScrollViewProps} from 'react-native'

export type UseDesktopScrollEventOptions = Pick<ScrollViewProps, 'onScroll' | 'onMomentumScrollEnd'>
export interface HandleThrottledScrollOptions extends Pick<ScrollViewProps, 'onScroll' | 'onMomentumScrollEnd'> {
	momentumScrollEndTimer: MutableRefObject<ReturnType<typeof setTimeout> | null>
}
