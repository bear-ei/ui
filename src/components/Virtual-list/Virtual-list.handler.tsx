import type {WritableDraft} from 'immer'
import type {LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTimingFactory, HandleInteractionStateChangeOptions, InteractionEvent} from '../../hooks'
import type {
	CalculateVirtualListVisibleRangeOptions,
	CloseVirtualListOptions,
	HandleVirtualListDragEndOptions,
	HandleVirtualListDragStartOptions,
	HandleVirtualListDragUpdateOptions,
	HandleVirtualListScrollOptions,
	VirtualListDragEvent,
	TriggerVirtualListCloseOptions,
	UpdateVirtualListLayoutOptions,
	VirtualListItemData,
	VirtualListState
} from './Virtual-list.interface'

import {COMPONENT_STATUS, EVENT_NAME, ORIENTATION, type MeasuredLayoutRectangle} from '../../constants'
import {ANIMATED_TIMING} from '../../theme'
import {extractDragEventPayload} from './extract-drag-event-payload.utils'

const calculateVirtualListVisibleRange = (
	draft: WritableDraft<VirtualListState>,
	{itemSize = 0, orientation, scrollOffsetRef}: UpdateVirtualListLayoutOptions,
	{force, scrollDelta = 0, scrollOffset}: CalculateVirtualListVisibleRangeOptions = {}
) => {
	if (!(draft.layout.height || draft.layout.width)) {
		return
	}

	const nextScrollOffset = scrollOffset ?? scrollOffsetRef?.current ?? draft.scrollOffset ?? 0
	const baseStartIndex = Math.max(0, Math.floor(nextScrollOffset / itemSize))
	const dataSize = draft.virtualListData?.length ?? 0
	const viewportSize = Math.max(
		orientation === ORIENTATION.VERTICAL ? (draft.layout.height ?? 0) : (draft.layout.width ?? 0),
		0
	)

	const visibleItemCount = Math.ceil(viewportSize / itemSize)
	const bufferItemCount = Math.max(20, Math.floor(visibleItemCount / 2))
	const deltaItemCount = itemSize > 0 ? Math.ceil((Math.abs(scrollDelta) / itemSize) * 2) : 0
	const extraBufferItemCount = Math.min(deltaItemCount, visibleItemCount + bufferItemCount)
	const isScrollingForward = scrollDelta >= 0
	const endIndex = Math.min(
		dataSize,
		baseStartIndex + visibleItemCount + bufferItemCount + (isScrollingForward ? extraBufferItemCount : 0)
	)

	const startIndex = Math.max(0, baseStartIndex - bufferItemCount - (isScrollingForward ? 0 : extraBufferItemCount))
	const isRangeUnchanged = draft.startIndex === startIndex && draft.endIndex === endIndex

	if (isRangeUnchanged && !force) {
		return
	}

	draft.emptyList = !draft.virtualListData?.length
	draft.endIndex = endIndex
	draft.scrollOffset = nextScrollOffset
	draft.startIndex = startIndex

	const virtualListData = draft.virtualListData ?? []
	const isDataAscending = virtualListData.every(
		(item, index) => index === 0 || (virtualListData[index - 1].index ?? 0) <= (item.index ?? 0)
	)

	const sortedData =
		isDataAscending ? virtualListData : [...virtualListData].sort((a, b) => (a.index ?? 0) - (b.index ?? 0))

	draft.visibleRangeData = sortedData.slice(startIndex, endIndex)

	if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
		draft.status = draft.virtualListData ? COMPONENT_STATUS.SUCCEEDED : COMPONENT_STATUS.LOADING
	}
}

export const updateVirtualListLayout =
	(setState: Updater<VirtualListState>, {itemSize, orientation, scrollOffsetRef}: UpdateVirtualListLayoutOptions) =>
	({height = 0, left, top, width = 0}: Partial<MeasuredLayoutRectangle>) => {
		setState(draft => {
			if (!(width > 0 || height > 0)) {
				return
			}

			const {height: prevHeight, width: prevWidth} = draft.layout
			const isUpdateLayout = prevWidth !== width || prevHeight !== height

			draft.layout.left = left
			draft.layout.top = top

			if (isUpdateLayout) {
				draft.layout.height = height
				draft.layout.width = width

				calculateVirtualListVisibleRange(draft, {itemSize, orientation, scrollOffsetRef})
			}
		})
	}

export const handleVirtualListStateChange = (
	event: InteractionEvent,
	onVirtualListLayoutChange: (layout: MeasuredLayoutRectangle) => void,
	{eventName}: HandleInteractionStateChangeOptions
) => {
	if (eventName !== EVENT_NAME.LAYOUT) {
		return
	}

	onVirtualListLayoutChange((event as LayoutChangeEvent).nativeEvent.layout as MeasuredLayoutRectangle)
}

export const handleVirtualListScroll =
	(
		setState: Updater<VirtualListState>,
		{
			endReachedThreshold = 0.1,
			itemSize,
			onEndReached,
			onScroll,
			orientation,
			scrollOffsetRef
		}: HandleVirtualListScrollOptions
	) =>
	(event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const {contentInset, contentOffset, contentSize, layoutMeasurement, targetContentOffset, velocity, zoomScale} =
			event.nativeEvent

		const scrollOffset = orientation === ORIENTATION.VERTICAL ? contentOffset.y : contentOffset.x
		const prevScrollOffset = scrollOffsetRef?.current
		const scrollDelta = typeof prevScrollOffset === 'number' ? scrollOffset - prevScrollOffset : 0

		if (scrollOffsetRef) {
			scrollOffsetRef.current = scrollOffset
		}

		const distanceFromEnd =
			orientation === ORIENTATION.VERTICAL ?
				contentSize.height - layoutMeasurement.height - scrollOffset
			:	contentSize.width - layoutMeasurement.width - scrollOffset

		const thresholdDistance =
			orientation === ORIENTATION.VERTICAL ?
				layoutMeasurement.height * endReachedThreshold
			:	layoutMeasurement.width * endReachedThreshold

		const isHitBottom = distanceFromEnd <= thresholdDistance

		setState(draft => {
			if (onScroll) {
				draft.pendingScrollEvent = {
					contentInset,
					contentOffset,
					contentSize,
					layoutMeasurement,
					targetContentOffset,
					velocity,
					zoomScale
				}
			}

			if ((isHitBottom || scrollOffset <= 0) && onEndReached) {
				draft.pendingEndReachedEvent = true
			}

			calculateVirtualListVisibleRange(draft, {itemSize, orientation}, {scrollDelta, scrollOffset})
		})
	}

const triggerVirtualListClose = (
	draft: WritableDraft<VirtualListState>,
	itemKey: string,
	{activeKey, autoSelectAdjacentOnClose, onClose}: TriggerVirtualListCloseOptions
) => {
	if (autoSelectAdjacentOnClose && itemKey === activeKey && onClose) {
		const data = draft.virtualListData ?? []
		const datumIndex = data.findIndex(datum => datum.itemKey === itemKey)
		const nextActiveKey = data[datumIndex + 1]?.itemKey ?? data[datumIndex - 1]?.itemKey

		draft.pendingCloseEvent = {itemKey, nextActiveKey}

		return
	}

	if (onClose) {
		draft.pendingCloseEvent = {itemKey}
	}
}

export const closeVirtualList =
	(
		setState: Updater<VirtualListState>,
		{
			activeKey,
			autoSelectAdjacentOnClose,
			itemSize = 0,
			onClose,
			orientation,
			scrollOffsetRef
		}: CloseVirtualListOptions
	) =>
	(itemKey?: string) => {
		if (!itemKey) {
			return
		}

		setState(draft => {
			triggerVirtualListClose(draft, itemKey, {activeKey, autoSelectAdjacentOnClose, onClose})

			draft.virtualListData = draft.virtualListData
				?.filter(item => item.itemKey !== itemKey)
				.map((item, index) => ({...item, index}))

			calculateVirtualListVisibleRange(draft, {itemSize, orientation, scrollOffsetRef})
		})
	}

export const updateVirtualListData = (setState: Updater<VirtualListState>) => (data?: VirtualListItemData[]) =>
	setState(draft => {
		draft.status = COMPONENT_STATUS.LOADING
		draft.virtualListData = data?.map((item, index) => ({...item, index}))
	})

export const updateVirtualListVisibleRangeData =
	(setState: Updater<VirtualListState>, {itemSize, orientation, scrollOffsetRef}: UpdateVirtualListLayoutOptions) =>
	(virtualListData?: VirtualListItemData[]) =>
		virtualListData &&
		setState(draft => {
			const shouldRecalculateRange = (draft.layout.height || draft.layout.width) && !draft.dragging

			if (shouldRecalculateRange) {
				calculateVirtualListVisibleRange(draft, {itemSize, orientation, scrollOffsetRef}, {force: true})
			}
		})

export const animateVirtualList = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTimingFactory) => {
	const animateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.STANDARD)

	return (contentSize: number) => animateSharedValueTo(contentSize)
}

export const handleVirtualListDragUpdate =
	(
		setState: Updater<VirtualListState>,
		{itemSize = 0, onDragUpdate, orientation}: HandleVirtualListDragUpdateOptions
	) =>
	({itemKey, ...event}: VirtualListDragEvent) => {
		setState(draft => {
			if (!(draft.virtualListData && draft.visibleRangeData)) {
				return
			}

			const dragItemAbsolute =
				orientation === ORIENTATION.HORIZONTAL ?
					event.absoluteX - (draft.layout.left ?? 0)
				:	event.absoluteY - (draft.layout.top ?? 0)

			const scrollOffset = draft.scrollOffset ?? 0
			const virtualListData = draft.virtualListData
			const visibleRangeData = draft.visibleRangeData
			const updateVisibleRangeData = (itemIndexKey: string) => {
				if (itemIndexKey === itemKey) {
					return
				}

				const visibleRangeDraggedIndex = visibleRangeData.findIndex(item => item.itemKey === itemKey)
				const visibleRangeOverIndex = visibleRangeData.findIndex(item => item.itemKey === itemIndexKey)
				const isUpdateVisibleRangeData = visibleRangeDraggedIndex !== -1 && visibleRangeOverIndex !== -1

				if (isUpdateVisibleRangeData) {
					;[visibleRangeData[visibleRangeDraggedIndex].index, visibleRangeData[visibleRangeOverIndex].index] =
						[
							visibleRangeData[visibleRangeOverIndex].index,
							visibleRangeData[visibleRangeDraggedIndex].index
						]

					const virtualListDraggedIndex = virtualListData.findIndex(item => item.itemKey === itemKey)
					const virtualListOverIndex = virtualListData.findIndex(item => item.itemKey === itemIndexKey)

					;[virtualListData[virtualListDraggedIndex].index, virtualListData[virtualListOverIndex].index] = [
						virtualListData[virtualListOverIndex].index,
						virtualListData[virtualListDraggedIndex].index
					]

					if (onDragUpdate) {
						draft.pendingDragUpdateEvent = {
							...extractDragEventPayload(event),
							itemKey,
							targetKey: itemIndexKey
						}
					}
				}
			}

			for (const {index = 0, itemKey: itemIndexKey} of visibleRangeData) {
				const itemOffset = itemSize * index - scrollOffset
				const isOverItem = dragItemAbsolute > itemOffset && dragItemAbsolute < itemOffset + itemSize

				if (isOverItem && itemIndexKey) {
					updateVisibleRangeData(itemIndexKey)

					break
				}
			}
		})
	}

export const handleVirtualListDragStart =
	(setState: Updater<VirtualListState>, {scrollOffsetRef}: HandleVirtualListDragStartOptions = {}) =>
	(_event: VirtualListDragEvent) =>
		setState(draft => {
			draft.dragging = true
			draft.dragScrollOffset = scrollOffsetRef?.current ?? draft.scrollOffset
		})

export const handleVirtualListDragEnd =
	(
		setState: Updater<VirtualListState>,
		onDragEnd?: (event: VirtualListDragEvent) => void,
		options?: HandleVirtualListDragEndOptions
	) =>
	({itemKey, ...event}: VirtualListDragEvent) =>
		setState(draft => {
			draft.dragging = false

			if (onDragEnd) {
				draft.pendingDragEndEvent = {...options, ...extractDragEventPayload(event), itemKey}
			}
		})
