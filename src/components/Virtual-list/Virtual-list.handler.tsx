import type {WritableDraft} from 'immer'
import type {LayoutChangeEvent, LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent} from 'react-native'
import {Platform} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimateSharedValueTo, HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {COMPONENT_STATUS, EVENT_NAME, type EventName} from '../Common'
import type {ListData} from '../List'
import type {
	TriggerVirtualListCloseOptions,
	UnmountVirtualListOptions,
	UpdateVirtualListOnScrollOptions,
	VirtualListData,
	VirtualListState
} from './Virtual-list.interface'

const calculateVirtualListVisibilityRange =
	(itemSize = 0) =>
	(draft: WritableDraft<VirtualListState>) =>
	(scrollOffset?: number) => {
		if (!draft.layout.height) {
			return
		}

		const nextScrollOffset = scrollOffset ?? draft.scrollOffset ?? 0
		const baseStartIndex = Math.max(0, Math.floor((nextScrollOffset ?? 0) / itemSize))
		const dataSize = draft.virtualListData?.length ?? 0
		const windowSize = Math.max(draft.layout.height, 0)
		const visibleItemCount = Math.ceil(windowSize / itemSize)
		const extraItem = 32
		const endIndex = Math.min(dataSize, baseStartIndex + visibleItemCount + extraItem)
		const startIndex = Math.max(0, baseStartIndex - extraItem)
		const nextVisibleRangeData = (draft.virtualListData ?? []).slice(startIndex, endIndex)

		draft.emptyList = !draft.virtualListData?.length
		draft.endIndex = endIndex
		draft.scrollOffset = nextScrollOffset
		draft.startIndex = startIndex
		draft.status = COMPONENT_STATUS.SUCCEEDED
		draft.visibleRangeData = nextVisibleRangeData
	}

export const updateVirtualListLayout =
	(itemSize = 0) =>
	(setState: Updater<VirtualListState>) =>
	({width, height}: LayoutRectangle) => {
		setState(draft => {
			if (['web', 'macos', 'windows'].includes(Platform.OS) && draft.layout.height) {
				return
			}

			const {width: prevWidth, height: prevHeight} = draft.layout

			if (prevWidth !== width || prevHeight !== height) {
				draft.layout.height = height
				draft.layout.width = width
			}

			calculateVirtualListVisibilityRange(itemSize)(draft)()
		})
	}

export const handleVirtualListStateChange =
	({eventName}: HandleStateEventChangeOptions) =>
	(onVirtualListLayoutChange: (layout: LayoutRectangle) => void) =>
	(event: StateEvent) => {
		const nextEvent = {
			[EVENT_NAME.LAYOUT]: () =>
				onVirtualListLayoutChange((event as LayoutChangeEvent).nativeEvent.layout)
		} as Record<EventName, () => void>

		if (!eventName) {
			return
		}

		nextEvent[eventName]?.()
	}

export const updateVirtualListOnScroll = ({onScroll, itemSize}: UpdateVirtualListOnScrollOptions) => {
	const createNextScrollEvent = (event: NativeSyntheticEvent<NativeScrollEvent>) => () => onScroll?.(event)

	return (setState: Updater<VirtualListState>) => (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const {contentSize, layoutMeasurement, contentOffset} = event.nativeEvent
		const isHitBottom = contentSize.height - layoutMeasurement.height - contentOffset.y < 1
		const scrollOffset = event.nativeEvent.contentOffset.y

		if (isHitBottom || contentOffset.y <= 0) {
			return
		}

		setState(draft => {
			draft.nextScrollEvent = createNextScrollEvent(event)

			calculateVirtualListVisibilityRange(itemSize)(draft)(scrollOffset)
		})
	}
}

export const triggerVirtualListMomentumScrollEnd =
	(onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void) =>
	(event: NativeSyntheticEvent<NativeScrollEvent>) =>
		onMomentumScrollEnd?.(event)

const triggerVirtualListClose =
	({enableAutoSelect, onClose}: TriggerVirtualListCloseOptions) =>
	(draft: WritableDraft<VirtualListState>) =>
	(indexKey?: string) => {
		if (!enableAutoSelect) {
			const nextCloseEvent = () => onClose?.({indexKey})

			draft.nextCloseEvent = nextCloseEvent

			return
		}

		const data = (draft.virtualListData ?? []) as ListData[]
		const datumIndex = data.findIndex((datum: ListData) => datum.indexKey === indexKey)
		const nextActiveKey = data[datumIndex + 1]?.indexKey ?? data[datumIndex - 1]?.indexKey
		const nextAutoSelectCloseEvent = () => onClose?.({activeKey: nextActiveKey, indexKey})

		draft.nextCloseEvent = nextAutoSelectCloseEvent
	}

export const unmountVirtualList = ({enableAutoSelect, itemSize = 0, onClose}: UnmountVirtualListOptions) => {
	const filterVirtualListData =
		(key: string) =>
		({indexKey}: VirtualListData) =>
			indexKey !== key

	return (setState: Updater<VirtualListState>) => (indexKey?: string) => {
		if (!indexKey) {
			return
		}

		setState(draft => {
			triggerVirtualListClose({enableAutoSelect, onClose})(draft)(indexKey)

			draft.virtualListData = draft.virtualListData?.filter(filterVirtualListData(indexKey))

			calculateVirtualListVisibilityRange(itemSize)(draft)()
		})
	}
}

export const updateVirtualListData = (setState: Updater<VirtualListState>) => (data?: VirtualListData[]) =>
	setState(draft => {
		draft.virtualListData = data
		draft.status = COMPONENT_STATUS.LOADING
	})

export const checkVirtualListLoadEnd = (onLoadEnd?: (indexKey?: string) => void) => {
	const createIndexKeyMatcher =
		(key: string) =>
		({indexKey}: VirtualListData) =>
			indexKey === key

	return (setState: Updater<VirtualListState>) => (indexKey?: string) => {
		if (indexKey) {
			setState(draft => {
				const visibleRangeDataMatchedIndex = draft.visibleRangeData?.findIndex(
					createIndexKeyMatcher(indexKey)
				)

				const isAtEndOfVisibleRange =
					(draft.visibleRangeData?.length ?? 0) - 1 === visibleRangeDataMatchedIndex &&
					visibleRangeDataMatchedIndex !== -1

				if (isAtEndOfVisibleRange) {
					onLoadEnd?.(indexKey)
				}
			})

			return
		}

		onLoadEnd?.(indexKey)
	}
}

export const updateVirtualListVisibilityRangeData =
	(itemSize = 0) =>
	(setState: Updater<VirtualListState>) =>
	(virtualListData?: VirtualListData[]) =>
		virtualListData &&
		setState(draft => {
			if (draft.layout.height) {
				calculateVirtualListVisibilityRange(itemSize)(draft)()
			}
		})

export const animateVirtualList =
	(animateSharedValueTo: AnimateSharedValueTo) =>
	(contentHeightSharedValue: SharedValue<number>) =>
	(contentSize: number) =>
		animateSharedValueTo({sharedValue: contentHeightSharedValue})(contentSize)
