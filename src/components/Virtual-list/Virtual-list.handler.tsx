import type {WritableDraft} from 'immer'
import type {LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent} from 'react-native'
import {Platform} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimateSharedValueTo, HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {COMPONENT_STATUS, EVENT_NAME, LAYOUT, type EventName, type LayoutRectangle} from '../Common'
import type {ListData} from '../List'
import type {
	TriggerVirtualListCloseOptions,
	UnmountVirtualListOptions,
	UpdateVirtualListLayoutOptions,
	UpdateVirtualListOnScrollOptions,
	VirtualListData,
	VirtualListState
} from './Virtual-list.interface'

const calculateVirtualListVisibilityRange =
	({itemSize = 0, layout}: UpdateVirtualListLayoutOptions) =>
	(draft: WritableDraft<VirtualListState>) =>
	(scrollOffset?: number) => {
		if (!(draft.layout.height || draft.layout.width)) {
			return
		}

		const nextScrollOffset = scrollOffset ?? draft.scrollOffset ?? 0
		const baseStartIndex = Math.max(0, Math.floor(nextScrollOffset / itemSize))
		const dataSize = draft.virtualListData?.length ?? 0
		const windowSize = Math.max(layout === LAYOUT.VERTICAL ? draft.layout.height : draft.layout.width, 0)
		const visibleItemCount = Math.ceil(windowSize / itemSize)
		const bufferItemCount = Math.max(20, Math.floor(visibleItemCount / 2))
		const endIndex = Math.min(dataSize, baseStartIndex + visibleItemCount + bufferItemCount)
		const startIndex = Math.max(0, baseStartIndex - bufferItemCount)
		const isScrollOffsetRedundant =
			typeof scrollOffset === 'number' &&
			draft.startIndex === startIndex &&
			draft.endIndex === endIndex

		if (isScrollOffsetRedundant) {
			return
		}

		const nextVisibleRangeData = draft.virtualListData?.slice(startIndex, endIndex)

		draft.emptyList = !draft.virtualListData?.length
		draft.endIndex = endIndex
		draft.scrollOffset = nextScrollOffset
		draft.startIndex = startIndex
		draft.visibleRangeData = nextVisibleRangeData

		if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
			draft.status = draft.virtualListData ? COMPONENT_STATUS.SUCCEEDED : COMPONENT_STATUS.LOADING
		}
	}

export const updateVirtualListLayout =
	({itemSize, layout}: UpdateVirtualListLayoutOptions) =>
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

			calculateVirtualListVisibilityRange({itemSize, layout})(draft)()
		})
	}

export const handleVirtualListStateChange =
	({eventName}: HandleStateEventChangeOptions) =>
	(onVirtualListLayoutChange: (layout: LayoutRectangle) => void) =>
	(event: StateEvent) => {
		const nextEvent = {
			[EVENT_NAME.LAYOUT]: () =>
				onVirtualListLayoutChange(
					(event as LayoutChangeEvent).nativeEvent.layout as LayoutRectangle
				)
		} as Record<EventName, () => void>

		if (!eventName) {
			return
		}

		nextEvent[eventName]?.()
	}

export const updateVirtualListOnScroll = ({
	endReachedThreshold = 0.1,
	itemSize,
	layout,
	onEndReached,
	onScroll
}: UpdateVirtualListOnScrollOptions) => {
	const createNextScrollEvent = (event: NativeSyntheticEvent<NativeScrollEvent>) => () => onScroll?.(event)

	return (setState: Updater<VirtualListState>) => (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const {contentSize, layoutMeasurement, contentOffset} = event.nativeEvent
		const scrollOffset = layout === LAYOUT.VERTICAL ? contentOffset.y : contentOffset.x
		const distanceFromEnd =
			layout === LAYOUT.VERTICAL ?
				contentSize.height - layoutMeasurement.height - scrollOffset
			:	contentSize.width - layoutMeasurement.width - scrollOffset

		const thresholdDistance =
			layout === LAYOUT.VERTICAL ?
				layoutMeasurement.height * endReachedThreshold
			:	layoutMeasurement.width * endReachedThreshold

		const isHitBottom = distanceFromEnd <= thresholdDistance

		const nextEndReachedEvent = () => onEndReached?.()

		setState(draft => {
			draft.nextScrollEvent = createNextScrollEvent(event)

			if (isHitBottom || scrollOffset <= 0) {
				draft.nextEndReachedEvent = nextEndReachedEvent
			}

			calculateVirtualListVisibilityRange({itemSize, layout})(draft)(scrollOffset)
		})
	}
}

export const triggerVirtualListMomentumScrollEnd =
	(onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void) =>
	(event: NativeSyntheticEvent<NativeScrollEvent>) =>
		onMomentumScrollEnd?.(event)

const triggerVirtualListClose =
	({enableAutoSelect, onClose, activeKey}: TriggerVirtualListCloseOptions) =>
	(draft: WritableDraft<VirtualListState>) =>
	(indexKey?: string) => {
		if (enableAutoSelect && indexKey === activeKey) {
			const data = (draft.virtualListData ?? []) as ListData[]
			const datumIndex = data.findIndex((datum: ListData) => datum.indexKey === indexKey)
			const nextActiveKey = data[datumIndex + 1]?.indexKey ?? data[datumIndex - 1]?.indexKey
			const nextAutoSelectCloseEvent = () => onClose?.({activeKey: nextActiveKey, indexKey})

			draft.nextCloseEvent = nextAutoSelectCloseEvent

			return
		}

		const nextCloseEvent = () => onClose?.({indexKey})
		draft.nextCloseEvent = nextCloseEvent
	}

export const unmountVirtualList = ({
	activeKey,
	enableAutoSelect,
	itemSize = 0,
	layout,
	onClose
}: UnmountVirtualListOptions) => {
	const filterVirtualListData =
		(key: string) =>
		({indexKey}: VirtualListData) =>
			indexKey !== key

	return (setState: Updater<VirtualListState>) => (indexKey?: string) => {
		if (!indexKey) {
			return
		}

		setState(draft => {
			triggerVirtualListClose({enableAutoSelect, onClose, activeKey})(draft)(indexKey)

			draft.virtualListData = draft.virtualListData?.filter(filterVirtualListData(indexKey))

			calculateVirtualListVisibilityRange({itemSize, layout})(draft)()
		})
	}
}

export const updateVirtualListData = (setState: Updater<VirtualListState>) => (data?: VirtualListData[]) =>
	setState(draft => {
		draft.status = COMPONENT_STATUS.LOADING
		draft.virtualListData = data
	})

export const checkVirtualListLoadEnd = (onLoadEnd?: (indexKey?: string) => void) => {
	const createIndexKeyMatcher =
		(key: string) =>
		({indexKey}: VirtualListData) =>
			indexKey === key

	return (setState: Updater<VirtualListState>) => (indexKey?: string) => {
		if (indexKey) {
			const nextLoadEndEvent = () => onLoadEnd?.(indexKey)

			setState(draft => {
				const visibleRangeDataMatchedIndex = draft.visibleRangeData?.findIndex(
					createIndexKeyMatcher(indexKey)
				)

				const isAtEndOfVisibleRange =
					(draft.visibleRangeData?.length ?? 0) - 1 === visibleRangeDataMatchedIndex &&
					visibleRangeDataMatchedIndex !== -1

				if (isAtEndOfVisibleRange) {
					draft.nextLoadEndEvent = nextLoadEndEvent
				}
			})

			return
		}

		onLoadEnd?.(indexKey)
	}
}

export const updateVirtualListVisibilityRangeData =
	({itemSize, layout}: UpdateVirtualListLayoutOptions) =>
	(setState: Updater<VirtualListState>) =>
	(virtualListData?: VirtualListData[]) =>
		virtualListData &&
		setState(draft => {
			if (draft.layout.height || draft.layout.width) {
				calculateVirtualListVisibilityRange({itemSize, layout})(draft)()
			}
		})

export const animateVirtualList =
	(animateSharedValueTo: AnimateSharedValueTo) =>
	(contentSharedValue: SharedValue<number>) =>
	(contentSize: number) =>
		animateSharedValueTo({sharedValue: contentSharedValue})(contentSize)

export const clearVirtualListEvent =
	(setState: Updater<VirtualListState>) => (eventName: 'close' | 'endReached' | 'loadEnd' | 'scroll') => {
		const event = {
			close: () =>
				setState(draft => {
					draft.nextCloseEvent = undefined
				}),
			endReached: () =>
				setState(draft => {
					draft.nextEndReachedEvent = undefined
				}),
			loadEnd: () =>
				setState(draft => {
					draft.nextLoadEndEvent = undefined
				}),
			scroll: () =>
				setState(draft => {
					draft.nextScrollEvent = undefined
				})
		}

		setTimeout(() => {
			event[eventName]?.()
		}, 0)
	}
