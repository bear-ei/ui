import {WritableDraft} from 'immer'
import {LayoutChangeEvent, LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent, Platform} from 'react-native'
import {Updater} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent} from '../../hooks'
import {EventName} from '../Common'
import {HandleVirtualListItemOptions, RenderVirtualListItemInfo, VirtualListItem} from './Virtual-list-item'
import {HandleVirtualListScrollOptions, VirtualListData, VirtualListState} from './Virtual-list.interface'

const handleVirtualListVisibleRange =
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

                draft.endIndex = endIndex
                draft.scrollOffset = nextScrollOffset

                const nextVisibleRangeData = (draft.virtualListData ?? []).slice(startIndex, endIndex)

                draft.emptyList = !draft.virtualListData?.length
                draft.visibleRangeData = nextVisibleRangeData
                draft.status = 'succeeded'
        }

export const handleVirtualListLayoutChange =
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

                        handleVirtualListVisibleRange(itemSize)(draft)()
                })
        }

export const handleVirtualListStateChange =
        ({eventName}: OnStateEventChangeOptions) =>
        (onVirtualListLayoutChange: (layout: LayoutRectangle) => void) =>
        (event: StateEvent) => {
                const nextEvent = {
                        layout: () => onVirtualListLayoutChange((event as LayoutChangeEvent).nativeEvent.layout)
                } as Record<EventName, () => void>

                if (eventName) {
                        nextEvent[eventName]?.()
                }
        }

export const handleVirtualListScroll = ({onScroll, itemSize}: HandleVirtualListScrollOptions) => {
        const handleNextScrollEvent = (event: NativeSyntheticEvent<NativeScrollEvent>) => () => onScroll?.(event)

        return (setState: Updater<VirtualListState>) => (event: NativeSyntheticEvent<NativeScrollEvent>) => {
                const {contentSize, layoutMeasurement, contentOffset} = event.nativeEvent
                const hitBottom = contentSize.height - layoutMeasurement.height - contentOffset.y < 1
                const scrollOffset = event.nativeEvent.contentOffset.y

                if (!hitBottom && contentOffset.y > 0) {
                        setState(draft => {
                                draft.nextScrollEvent = handleNextScrollEvent(event)
                                handleVirtualListVisibleRange(itemSize)(draft)(scrollOffset)
                        })
                }
        }
}

export const handleVirtualListMomentumScrollEnd =
        (onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void) =>
        (event: NativeSyntheticEvent<NativeScrollEvent>) =>
                onMomentumScrollEnd?.(event)

export const handleVirtualListItemUnmount = (itemSize = 0) => {
        const handleVisibleRangeDataFilter =
                (value: string) =>
                ({indexKey}: VirtualListData) =>
                        indexKey !== value

        return (setState: Updater<VirtualListState>) => (value?: string) => {
                if (!value) {
                        return
                }

                setState(draft => {
                        const nextVirtualListData = draft.virtualListData?.filter(handleVisibleRangeDataFilter(value))

                        draft.virtualListData = nextVirtualListData

                        handleVirtualListVisibleRange(itemSize)(draft)()
                })
        }
}

export const handleVirtualListData = (setState: Updater<VirtualListState>) => (data?: VirtualListData[]) =>
        setState(draft => {
                draft.virtualListData = data
                draft.status = 'loading'
        })

export const handleVirtualListLoadEnd = (setState: Updater<VirtualListState>) => {
        const findVisibleRangeDataIndex =
                (value: string) =>
                ({indexKey}: VirtualListData) =>
                        indexKey === value

        return (onLoadEnd?: (value?: string) => void) => (value?: string) => {
                if (value) {
                        setState(draft => {
                                const visibleRangeDataIndex = draft.visibleRangeData?.findIndex(
                                        findVisibleRangeDataIndex(value)
                                )

                                const loadEnd =
                                        (draft.visibleRangeData?.length ?? 0) - 1 === visibleRangeDataIndex &&
                                        visibleRangeDataIndex !== -1

                                if (loadEnd) {
                                        onLoadEnd?.(value)
                                }
                        })

                        return
                }

                onLoadEnd?.(value)
        }
}

export const handleVirtualListDataChange =
        (itemSize = 0) =>
        (setState: Updater<VirtualListState>) =>
        (virtualListData?: VirtualListData[]) =>
                virtualListData &&
                setState(draft => {
                        if (draft.layout.height) {
                                handleVirtualListVisibleRange(itemSize)(draft)()
                        }
                })

export const handleVirtualListItem =
        <T,>({renderItem, onLoadEnd, id, ...virtualListItemProps}: HandleVirtualListItemOptions<T>) =>
        (data?: VirtualListData[]) => {
                if (data?.length === 0) {
                        onLoadEnd?.()

                        return
                }

                return data?.map((item, index) => (
                        <VirtualListItem
                                {...virtualListItemProps}
                                index={index}
                                item={item as Record<string, unknown>}
                                key={`${((item as Record<string, unknown>)?.indexKey as string) ?? index}`}
                                onLoadEnd={onLoadEnd}
                                testID={`virtualList__virtualListItem--${id}`}
                                renderItem={
                                        renderItem as (
                                                options: RenderVirtualListItemInfo<Record<string, unknown>>
                                        ) => JSX.Element
                                }
                        />
                ))
        }
