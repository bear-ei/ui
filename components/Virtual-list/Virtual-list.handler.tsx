import {COMPONENT_STATUS, EVENT_NAME, EventName, LAYOUT, LayoutRectangle} from '@/constants'
import {AnimateSharedValueTo, HandleStateEventChangeOptions, StateEvent} from '@/hooks'
import type {WritableDraft} from 'immer'
import type {LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent} from 'react-native'
import {Platform} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {ListData} from '../List'
import type {
        CloseVirtualListOptions,
        HandleDragEndOptions,
        HandleDragStartOptions,
        HandleDragUpdateOptions,
        HandleVirtualListDragEndOptions,
        HandleVirtualListDragUpdateOptions,
        HandleVirtualListScrollOptions,
        OnDragEndOptions,
        TriggerVirtualListCloseOptions,
        UpdateVirtualListLayoutOptions,
        VirtualListData,
        VirtualListState
} from './Virtual-list.interface'

const calculateVirtualListVisibilityRange =
        ({itemSize = 0, layoutType}: UpdateVirtualListLayoutOptions) =>
        (draft: WritableDraft<VirtualListState>) =>
        (scrollOffset?: number) => {
                if (!(draft.layout.height || draft.layout.width)) {
                        return
                }

                const nextScrollOffset = scrollOffset ?? draft.scrollOffset ?? 0
                const baseStartIndex = Math.max(0, Math.floor(nextScrollOffset / itemSize))
                const dataSize = draft.virtualListData?.length ?? 0
                const windowSize = Math.max(
                        layoutType === LAYOUT.VERTICAL ? draft.layout.height : draft.layout.width,
                        0
                )

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

                draft.emptyList = !draft.virtualListData?.length
                draft.endIndex = endIndex
                draft.scrollOffset = nextScrollOffset
                draft.startIndex = startIndex
                draft.visibleRangeData = draft.virtualListData
                        ?.sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
                        .slice(startIndex, endIndex)

                if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
                        draft.status = draft.virtualListData ? COMPONENT_STATUS.SUCCEEDED : COMPONENT_STATUS.LOADING
                }
        }

export const updateVirtualListLayout =
        ({itemSize, layoutType}: UpdateVirtualListLayoutOptions) =>
        (setState: Updater<VirtualListState>) =>
        ({width, height, left, top}: LayoutRectangle) => {
                setState(draft => {
                        if (['web', 'macos', 'windows'].includes(Platform.OS) && draft.layout.height) {
                                return
                        }

                        const {width: prevWidth, height: prevHeight} = draft.layout
                        const isUpdateLayout = prevWidth !== width || prevHeight !== height

                        draft.layout.left = left
                        draft.layout.top = top

                        if (isUpdateLayout) {
                                draft.layout.height = height
                                draft.layout.width = width

                                calculateVirtualListVisibilityRange({itemSize, layoutType})(draft)()
                        }
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

export const handleVirtualListScroll =
        ({endReachedThreshold = 0.1, itemSize, layoutType, onEndReached, onScroll}: HandleVirtualListScrollOptions) =>
        (setState: Updater<VirtualListState>) =>
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
                const {contentSize, layoutMeasurement, contentOffset} = event.nativeEvent
                const scrollOffset = layoutType === LAYOUT.VERTICAL ? contentOffset.y : contentOffset.x
                const distanceFromEnd =
                        layoutType === LAYOUT.VERTICAL ?
                                contentSize.height - layoutMeasurement.height - scrollOffset
                        :       contentSize.width - layoutMeasurement.width - scrollOffset

                const thresholdDistance =
                        layoutType === LAYOUT.VERTICAL ?
                                layoutMeasurement.height * endReachedThreshold
                        :       layoutMeasurement.width * endReachedThreshold

                const isHitBottom = distanceFromEnd <= thresholdDistance

                setState(draft => {
                        if (onScroll) {
                                draft.nextScrollEvent = () => onScroll?.(event)
                        }

                        if ((isHitBottom || scrollOffset <= 0) && onEndReached) {
                                draft.nextEndReachedEvent = () => onEndReached?.()
                        }

                        calculateVirtualListVisibilityRange({itemSize, layoutType})(draft)(scrollOffset)
                })
        }

const triggerVirtualListClose =
        ({enableAutoSelect, onClose, activeKey}: TriggerVirtualListCloseOptions) =>
        (draft: WritableDraft<VirtualListState>) =>
        (indexKey?: string) => {
                if (enableAutoSelect && indexKey === activeKey && onClose) {
                        const data = (draft.virtualListData ?? []) as ListData[]
                        const datumIndex = data.findIndex((datum: ListData) => datum.indexKey === indexKey)
                        const nextActiveKey = data[datumIndex + 1]?.indexKey ?? data[datumIndex - 1]?.indexKey
                        draft.nextCloseEvent = () => onClose?.({activeKey: nextActiveKey, indexKey})

                        return
                }

                if (onClose) {
                        draft.nextCloseEvent = () => onClose?.({indexKey})
                }
        }

export const closeVirtualList =
        ({activeKey, enableAutoSelect, itemSize = 0, layoutType, onClose}: CloseVirtualListOptions) =>
        (setState: Updater<VirtualListState>) =>
        (indexKey?: string) => {
                if (!indexKey) {
                        return
                }

                setState(draft => {
                        triggerVirtualListClose({enableAutoSelect, onClose, activeKey})(draft)(indexKey)

                        draft.virtualListData = draft.virtualListData
                                ?.filter(item => item.indexKey !== indexKey)
                                .map((item, index) => ({...item, index}))

                        calculateVirtualListVisibilityRange({itemSize, layoutType})(draft)()
                })
        }

export const updateVirtualListData = (setState: Updater<VirtualListState>) => (data?: VirtualListData[]) =>
        setState(draft => {
                draft.status = COMPONENT_STATUS.LOADING
                draft.virtualListData = data?.map((item, index) => ({...item, index}))
        })

export const updateVirtualListVisibilityRangeData =
        ({itemSize, layoutType}: UpdateVirtualListLayoutOptions) =>
        (setState: Updater<VirtualListState>) =>
        (virtualListData?: VirtualListData[]) =>
                virtualListData &&
                setState(draft => {
                        const isCalculate = (draft.layout.height || draft.layout.width) && !draft.dragging

                        if (isCalculate) {
                                calculateVirtualListVisibilityRange({itemSize, layoutType})(draft)()
                        }
                })

export const animateVirtualList =
        (animateSharedValueTo: AnimateSharedValueTo) =>
        (contentSharedValue: SharedValue<number>) =>
        (contentSize: number) =>
                animateSharedValueTo({sharedValue: contentSharedValue})(contentSize)

export const handleVirtualListDragUpdate =
        ({itemSize = 0, layoutType, onDragUpdate}: HandleVirtualListDragUpdateOptions) =>
        (setState: Updater<VirtualListState>) =>
        ({indexKey, event}: HandleDragUpdateOptions) => {
                setState(draft => {
                        if (!(draft.virtualListData && draft.visibleRangeData)) {
                                return
                        }

                        const dragItemAbsolute =
                                layoutType === LAYOUT.HORIZONTAL ?
                                        event.absoluteX - (draft.layout.left ?? 0)
                                :       event.absoluteY - (draft.layout.top ?? 0)

                        const scrollOffset = draft.scrollOffset ?? 0
                        const virtualListData = draft.virtualListData
                        const visibleRangeData = draft.visibleRangeData

                        const updateVisibleRangeData = (itemIndexKey: string) => {
                                if (itemIndexKey === indexKey) {
                                        return
                                }

                                const visibleRangeDraggedIndex = visibleRangeData.findIndex(
                                        item => item.indexKey === indexKey
                                )

                                const visibleRangeOverIndex = visibleRangeData.findIndex(
                                        item => item.indexKey === itemIndexKey
                                )

                                const isUpdateVisibleRangeData =
                                        visibleRangeDraggedIndex !== -1 && visibleRangeOverIndex !== -1

                                if (isUpdateVisibleRangeData) {
                                        ;[
                                                visibleRangeData[visibleRangeDraggedIndex].index,
                                                visibleRangeData[visibleRangeOverIndex].index
                                        ] = [
                                                visibleRangeData[visibleRangeOverIndex].index,
                                                visibleRangeData[visibleRangeDraggedIndex].index
                                        ]

                                        const virtualListDraggedIndex = virtualListData.findIndex(
                                                item => item.indexKey === indexKey
                                        )

                                        const virtualListOverIndex = virtualListData.findIndex(
                                                item => item.indexKey === itemIndexKey
                                        )

                                        ;[
                                                virtualListData[virtualListDraggedIndex].index,
                                                virtualListData[virtualListOverIndex].index
                                        ] = [
                                                virtualListData[virtualListOverIndex].index,
                                                virtualListData[virtualListDraggedIndex].index
                                        ]

                                        if (onDragUpdate) {
                                                draft.nextDragUpdateEvent = () =>
                                                        onDragUpdate?.({indexKey, targetKey: itemIndexKey, event})
                                        }
                                }
                        }

                        for (const {indexKey: itemIndexKey, index = 0} of visibleRangeData) {
                                const itemOffset = itemSize * index - scrollOffset
                                const isOverItem =
                                        dragItemAbsolute > itemOffset && dragItemAbsolute < itemOffset + itemSize

                                if (isOverItem && itemIndexKey) {
                                        updateVisibleRangeData(itemIndexKey)

                                        break
                                }
                        }
                })
        }

export const handleVirtualListDragStart = (setState: Updater<VirtualListState>) => (_options: HandleDragStartOptions) =>
        setState(draft => {
                draft.dragging = true
        })

export const handleVirtualListDragEnd =
        ({setState, ...options}: HandleVirtualListDragEndOptions) =>
        (onDragEnd?: (options: OnDragEndOptions) => void) =>
        ({indexKey, event}: HandleDragEndOptions) =>
                setState(draft => {
                        draft.dragging = false

                        if (onDragEnd) {
                                draft.nextDragEndEvent = () => onDragEnd?.({...options, indexKey, event})
                        }
                })
