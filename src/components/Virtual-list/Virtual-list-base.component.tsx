import {WritableDraft} from 'immer'
import {ForwardedRef, forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {LayoutChangeEvent, LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent, Platform} from 'react-native'
import Animated from 'react-native-reanimated'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useDesktopScrollEvent, useOnStateEvent} from '../../hooks'
import {EventName, State} from '../Common'
import {RenderVirtualListItemInfo, RenderVirtualListItemOptions, VirtualListItem} from './Virtual-list-item'
import {
        HandleVirtualListScrollOptions,
        VirtualListBaseProps,
        VirtualListData,
        VirtualListState
} from './Virtual-list.interface'

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
                draft.startIndex = startIndex

                const nextVisibleRangeData = (draft.virtualListData ?? []).slice(startIndex, endIndex)

                draft.emptyList = !draft.virtualListData?.length
                draft.visibleRangeData = nextVisibleRangeData
                draft.status = 'succeeded'
        }

const handleVirtualListLayout =
        (itemSize = 0) =>
        (setState: Updater<VirtualListState>) =>
        (layout: LayoutRectangle) => {
                setState(draft => {
                        if (['web', 'macos', 'windows'].includes(Platform.OS) && draft.layout.height) {
                                return
                        }

                        draft.layout.height = layout.height
                        draft.layout.width = layout.width

                        handleVirtualListVisibleRange(itemSize)(draft)()
                })
        }

const handleVirtualListStateChange =
        ({eventName}: OnStateEventChangeOptions) =>
        (onVirtualListLayout: (layout: LayoutRectangle) => void) =>
        (event: StateEvent) => {
                const nextEvent = {
                        layout: () => onVirtualListLayout((event as LayoutChangeEvent).nativeEvent.layout)
                } as Record<EventName, () => void>

                if (eventName) {
                        nextEvent[eventName]?.()
                }
        }

const handleNextScrollEvent =
        (onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void) =>
        (event: NativeSyntheticEvent<NativeScrollEvent>) =>
        () =>
                onScroll?.(event)

const handleVirtualListScroll =
        ({onScroll, itemSize}: HandleVirtualListScrollOptions) =>
        (setState: Updater<VirtualListState>) =>
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
                const {contentSize, layoutMeasurement, contentOffset} = event.nativeEvent
                const hitBottom = contentSize.height - layoutMeasurement.height - contentOffset.y < 1
                const scrollOffset = event.nativeEvent.contentOffset.y

                if (!hitBottom && contentOffset.y > 0) {
                        setState(draft => {
                                handleVirtualListVisibleRange(itemSize)(draft)(scrollOffset)
                                draft.nextScrollEvent = handleNextScrollEvent(onScroll)(event)
                        })
                }
        }

const handleVirtualListMomentumScrollEnd =
        (onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void) =>
        (event: NativeSyntheticEvent<NativeScrollEvent>) =>
                onMomentumScrollEnd?.(event)

const handleVisibleRangeDataFilter =
        (value: string) =>
        ({indexKey}: VirtualListData) =>
                indexKey !== value

const handleVirtualListItemUnmount =
        (itemSize = 0) =>
        (setState: Updater<VirtualListState>) =>
        (value?: string) => {
                if (!value) {
                        return
                }

                setState(draft => {
                        const nextVirtualListData = draft.virtualListData?.filter(handleVisibleRangeDataFilter(value))

                        draft.virtualListData = nextVirtualListData

                        handleVirtualListVisibleRange(itemSize)(draft)()
                })
        }

const handleVirtualListDataInit = (setState: Updater<VirtualListState>) => (data?: VirtualListData[]) =>
        setState(draft => {
                draft.virtualListData = data
                draft.status = 'loading'
        })

const findVisibleRangeDataIndex =
        (value: string) =>
        ({indexKey}: VirtualListData) =>
                indexKey === value

const handleVirtualListLoadEnd =
        (setState: Updater<VirtualListState>) => (onLoadEnd?: (value?: string) => void) => (value?: string) => {
                const handleLoadEnd = () => onLoadEnd?.(value)

                if (value) {
                        setState(draft => {
                                const visibleRangeDataIndex = draft.visibleRangeData?.findIndex(
                                        findVisibleRangeDataIndex(value)
                                )

                                const loadEnd =
                                        (draft.visibleRangeData?.length ?? 0) - 1 === visibleRangeDataIndex &&
                                        visibleRangeDataIndex !== -1

                                if (loadEnd) {
                                        draft.nextLoadEndEvent = handleLoadEnd
                                }
                        })

                        return
                }

                onLoadEnd?.(value)
        }

const handleVirtualListDataChange =
        (itemSize = 0) =>
        (setState: Updater<VirtualListState>) =>
        (virtualListData?: VirtualListData[]) => {
                if (virtualListData) {
                        setState(draft => {
                                if (draft.layout.height) {
                                        handleVirtualListVisibleRange(itemSize)(draft)()
                                }
                        })
                }
        }

/**
 * TODO: Refactoring to use the react-native-reanimated API
 */
const handleVirtualListFocusedIndexScroll =
        (ref: React.RefObject<Animated.ScrollView>) => (itemSize: number) => (focusedIndex?: number) => {
                if (typeof focusedIndex === 'number') {
                        ref.current?.scrollTo({y: focusedIndex * itemSize, animated: true})
                }
        }

const renderVirtualListItem =
        <T,>({renderItem, onLoadEnd, ...virtualListItemProps}: RenderVirtualListItemOptions<T>) =>
        (startIndex = 0) =>
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
                                renderItem={
                                        renderItem as (
                                                options: RenderVirtualListItemInfo<Record<string, unknown>>
                                        ) => JSX.Element
                                }
                                startIndex={startIndex}
                        />
                ))
        }

export const VirtualListBaseInner = <T,>(
        {
                data,
                extraData,
                focusedIndex,
                itemSize = 0,
                loading,
                loadingComponent,
                onLoadEnd,
                onMomentumScrollEnd,
                onScroll,
                render,
                renderItem,
                ...renderProps
        }: VirtualListBaseProps<T>,
        ref: ForwardedRef<Animated.ScrollView>
) => {
        const [
                {emptyList, nextLoadEndEvent, nextScrollEvent, startIndex, status, virtualListData, visibleRangeData},
                setState
        ] = useImmer<VirtualListState>({
                emptyList: undefined,
                endIndex: undefined,
                layout: {} as LayoutRectangle,
                nextLoadEndEvent: undefined,
                nextScrollEvent: undefined,
                startIndex: undefined,
                status: 'idle',
                virtualListData: undefined,
                visibleRangeData: undefined
        })

        const contentSize = virtualListData ? virtualListData.length * itemSize : 0
        const id = useId()
        const scrollViewRef = useRef<Animated.ScrollView>(null)
        const onVirtualListVisibleRange = useMemo(
                () => handleVirtualListDataChange(itemSize)(setState),
                [itemSize, setState]
        )

        const onVirtualListScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) =>
                handleVirtualListScroll({onScroll, itemSize})(setState)(event)

        const onVirtualListMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) =>
                handleVirtualListMomentumScrollEnd(onMomentumScrollEnd)(event)

        const onVirtualListDataInit = useMemo(() => handleVirtualListDataInit(setState), [setState])
        const onVirtualListLoadEnd = handleVirtualListLoadEnd(setState)(onLoadEnd)
        const onVirtualListFocusedIndexScroll = useMemo(
                () => handleVirtualListFocusedIndexScroll(scrollViewRef)(itemSize),
                [itemSize]
        )

        const scrollEvent = useDesktopScrollEvent({
                onMomentumScrollEnd: onVirtualListMomentumScrollEnd,
                onScroll: onVirtualListScroll
        })

        const onVirtualListItemUnmount = handleVirtualListItemUnmount(itemSize)(setState)
        const onVirtualListLayout = useMemo(() => handleVirtualListLayout(itemSize)(setState), [itemSize, setState])
        const onStateEventChange = useCallback(
                (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                        handleVirtualListStateChange({...options, state})(onVirtualListLayout)(event),
                [onVirtualListLayout]
        )

        const onStateEvent = useOnStateEvent({
                ...renderProps,
                disabled: false,
                onStateEventChange
        })

        const itemElements = renderVirtualListItem({
                extraData,
                itemSize,
                onLoadEnd: onVirtualListLoadEnd,
                onUnmount: onVirtualListItemUnmount,
                renderItem
        })(startIndex)(visibleRangeData)

        useImperativeHandle(
                ref,
                () => (scrollViewRef?.current ? scrollViewRef?.current : {}) as Animated.ScrollView,
                []
        )

        useEffect(() => {
                onVirtualListDataInit(data)
        }, [data, onVirtualListDataInit])

        useEffect(() => {
                onVirtualListVisibleRange(virtualListData)
        }, [onVirtualListVisibleRange, virtualListData])

        useEffect(() => {
                onVirtualListFocusedIndexScroll(focusedIndex)
        }, [focusedIndex, onVirtualListFocusedIndexScroll])

        useEffect(() => {
                nextScrollEvent?.()
        }, [nextScrollEvent])

        useEffect(() => {
                nextLoadEndEvent?.()
        }, [nextLoadEndEvent])

        if (status === 'idle') {
                return <></>
        }

        return render({
                ...renderProps,
                ...scrollEvent,
                contentSize,
                emptyList,
                id,
                itemElements,
                loading,
                loadingComponent,
                onStateEvent,
                ref: scrollViewRef,
                status
        })
}

export const VirtualListBase = forwardRef(VirtualListBaseInner) as typeof VirtualListBaseInner
