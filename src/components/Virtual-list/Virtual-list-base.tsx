import {WritableDraft} from 'immer'
import {ForwardedRef, forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {
    LayoutChangeEvent,
    LayoutRectangle,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    ScrollView
} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useDesktopScrollEvent, useOnStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import {EventName, State} from '../Common'
import {RenderVirtualListItemInfo, RenderVirtualListItemOptions, VirtualListItem} from './Virtual-list-item'
import {
    HandleVirtualListLayoutOptions,
    HandleVirtualListScrollOptions,
    InitialVirtualListState,
    VirtualListBaseProps,
    VirtualListData
} from './Virtual-list.interface'

const checkAllNumber = (array: unknown[]) => array.every(item => typeof item === 'number')
const handleVirtualListVisibleRange =
    (itemSize = 0) =>
    (draft: WritableDraft<InitialVirtualListState>) =>
    (scrollOffset?: number) => {
        if (!checkAllNumber([draft.layout.height, draft.layout.width])) {
            return
        }

        const nextScrollOffset = scrollOffset ?? draft.scrollOffset ?? 0
        const baseStartIndex = Math.max(0, Math.floor((nextScrollOffset ?? 0) / itemSize))
        const dataSize = draft.virtualListData?.length ?? 0
        const windowSize = Math.max(draft.layout.height, 0)
        const visibleItemCount = Math.ceil(windowSize / itemSize)
        const extraItem = 16
        const endIndex = Math.min(dataSize, baseStartIndex + visibleItemCount + extraItem)
        const startIndex = Math.max(0, baseStartIndex - extraItem)

        draft.endIndex = endIndex
        draft.scrollOffset = nextScrollOffset
        draft.startIndex = startIndex
        draft.visibleRangeData = draft.virtualListData?.slice(startIndex, endIndex) ?? []
    }

const createNextLoadEndCallback = (onLoadEnd?: (value?: string) => void) => () => onLoadEnd?.()
const handleVirtualListLayout =
    ({itemSize, onLoadEnd}: HandleVirtualListLayoutOptions) =>
    (setState: Updater<InitialVirtualListState>) =>
    (layout: LayoutRectangle) => {
        setState(draft => {
            if (['web', 'macos', 'windows'].includes(Platform.OS) && draft.layout.height) {
                return
            }

            draft.layout.height = layout.height
            draft.layout.width = layout.width
            ;[draft.virtualListData, draft.virtualListData?.length].some(Boolean) &&
                (draft.nextLoadEndCallback = createNextLoadEndCallback(onLoadEnd))

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

        eventName && nextEvent[eventName]?.()
    }

const createNextScrollEvent =
    (onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void) =>
    (event: NativeSyntheticEvent<NativeScrollEvent>) =>
    () =>
        onScroll?.(event)

const handleVirtualListScroll =
    ({onScroll, itemSize = 0}: HandleVirtualListScrollOptions) =>
    (setState: Updater<InitialVirtualListState>) =>
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const {contentSize, layoutMeasurement, contentOffset} = event.nativeEvent
        const scrollOffset = event.nativeEvent.contentOffset.y
        const hitBottom = contentSize.height - layoutMeasurement.height - contentOffset.y < 1

        !hitBottom &&
            contentOffset.y > 0 &&
            setState(draft => {
                handleVirtualListVisibleRange(itemSize)(draft)(scrollOffset)
                draft.nextScrollEvent = createNextScrollEvent(onScroll)(event)
            })
    }

const handleVirtualListMomentumScrollEnd =
    (onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void) =>
    (event: NativeSyntheticEvent<NativeScrollEvent>) =>
        onMomentumScrollEnd?.(event)

const createVisibleRangeDataFilter =
    (value: string) =>
    ({indexKey}: VirtualListData) =>
        indexKey !== value

const handleVirtualListItemUnmount =
    (itemSize = 0) =>
    (setState: Updater<InitialVirtualListState>) =>
    (value?: string) => {
        if (value) {
            setState(draft => {
                draft.virtualListData = draft.virtualListData?.filter(createVisibleRangeDataFilter(value))

                handleVirtualListVisibleRange(itemSize)(draft)()
            })
        }
    }

const handleVirtualListDataInit = (setState: Updater<InitialVirtualListState>) => (data?: VirtualListData[]) =>
    setState(draft => {
        const contentVisible = !!data?.length
        draft.contentVisible = contentVisible

        contentVisible && (draft.virtualListData = data)
        draft.status = 'succeeded'
    })

const handleVirtualListContentVisible =
    (setState: Updater<InitialVirtualListState>) => (data?: VirtualListData[]) => (value?: boolean) => {
        !value &&
            setState(draft => {
                draft.virtualListData = data
            })
    }

const createVisibleRangeDataFindIndex =
    (value: string) =>
    ({indexKey}: VirtualListData) =>
        indexKey === value

const handleVirtualListLoadEnd =
    (setState: Updater<InitialVirtualListState>) => (onLoadEnd?: (value?: string) => void) => (value?: string) => {
        value &&
            setState(draft => {
                const visibleRangeDataIndex = draft.visibleRangeData?.findIndex(createVisibleRangeDataFindIndex(value))

                ;(draft.visibleRangeData?.length ?? 0) - 1 === visibleRangeDataIndex &&
                    visibleRangeDataIndex !== -1 &&
                    onLoadEnd?.(value)
            })
    }

const handleVirtualListDataChange =
    (itemSize = 0) =>
    (setState: Updater<InitialVirtualListState>) =>
    (virtualListData?: VirtualListData[]) => {
        virtualListData &&
            setState(draft => {
                handleVirtualListVisibleRange(itemSize)(draft)()
            })
    }

const renderVirtualListItem =
    <T,>({renderItem, ...virtualListItemProps}: RenderVirtualListItemOptions<T>) =>
    (startIndex = 0) =>
    (data?: VirtualListData[]) =>
        data?.map((item, index) => (
            <VirtualListItem
                {...virtualListItemProps}
                index={index}
                item={item as Record<string, unknown>}
                key={`${((item as Record<string, unknown>)?.indexKey as string) ?? index}`}
                renderItem={
                    renderItem as (options: RenderVirtualListItemInfo<Record<string, unknown>>) => React.JSX.Element
                }
                startIndex={startIndex}
            />
        ))

export const VirtualListBaseInner = <T,>(
    {
        data,
        extraData,
        itemSize = 0,
        listEmptyComponent,
        onLoadEnd,
        onMomentumScrollEnd,
        onScroll,
        render,
        renderItem,
        ...renderProps
    }: VirtualListBaseProps<T>,
    ref: ForwardedRef<ScrollView>
) => {
    const [
        {visibleRangeData, startIndex, virtualListData, status, nextScrollEvent, nextLoadEndCallback, contentVisible},
        setState
    ] = useImmer<InitialVirtualListState>({
        contentVisible: undefined,
        endIndex: undefined,
        layout: {} as LayoutRectangle,
        nextLoadEndCallback: undefined,
        nextScrollEvent: undefined,
        startIndex: undefined,
        status: 'idle',
        virtualListData: undefined,
        visibleRangeData: undefined
    })

    const id = useId()
    const contentSize = virtualListData ? virtualListData.length * itemSize : 0
    const scrollViewRef = useRef<ScrollView>(null)
    const onVirtualListVisibleRange = useMemo(
        () => handleVirtualListDataChange(itemSize)(setState),
        [itemSize, setState]
    )

    const onVirtualListScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) =>
        handleVirtualListScroll({onScroll, itemSize})(setState)(event)

    const onVirtualListMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) =>
        handleVirtualListMomentumScrollEnd(onMomentumScrollEnd)(event)

    const onVirtualListLoadEnd = handleVirtualListLoadEnd(setState)(onLoadEnd)
    const onVirtualListDataInit = useMemo(() => handleVirtualListDataInit(setState), [setState])
    const onVirtualListContentVisible = handleVirtualListContentVisible(setState)(data)
    const scrollEvent = useDesktopScrollEvent({
        onMomentumScrollEnd: onVirtualListMomentumScrollEnd,
        onScroll: onVirtualListScroll
    })

    const onVirtualListLayout = useMemo(
        () => debounce(handleVirtualListLayout({itemSize, onLoadEnd})(setState))(150),
        [itemSize, onLoadEnd, setState]
    )

    const onVirtualListItemUnmount = handleVirtualListItemUnmount(itemSize)(setState)
    const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
        handleVirtualListStateChange({...options, state})(onVirtualListLayout)(event)

    const onStateEvent = useOnStateEvent({...renderProps, disabled: false, onStateEventChange})
    const itemElements = renderVirtualListItem({
        extraData,
        itemSize,
        onLoadEnd: onVirtualListLoadEnd,
        onUnmount: onVirtualListItemUnmount,
        renderItem
    })(startIndex)(visibleRangeData)

    useImperativeHandle(ref, () => (scrollViewRef?.current ? scrollViewRef?.current : {}) as ScrollView, [])

    useEffect(() => {
        onVirtualListDataInit(data)
    }, [data, onVirtualListDataInit])

    useEffect(() => {
        onVirtualListVisibleRange(virtualListData)
    }, [onVirtualListVisibleRange, virtualListData])

    useEffect(() => {
        nextScrollEvent?.()
    }, [nextScrollEvent])

    useEffect(() => {
        nextLoadEndCallback?.()
    }, [nextLoadEndCallback])

    if (status === 'idle') {
        return <></>
    }

    return render({
        ...renderProps,
        ...scrollEvent,
        contentSize,
        contentVisible,
        id,
        itemElements,
        listEmptyComponent,
        onContentVisible: onVirtualListContentVisible,
        onStateEvent,
        ref: scrollViewRef
    })
}

export const VirtualListBase = forwardRef(VirtualListBaseInner) as typeof VirtualListBaseInner
