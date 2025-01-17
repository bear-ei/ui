import {ForwardedRef, forwardRef, useEffect, useId, useImperativeHandle, useMemo} from 'react'
import {LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent} from 'react-native'
import Animated from 'react-native-reanimated'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useDesktopScrollEvent, useOnStateEvent} from '../../hooks'
import {debounce, runAfterInteractions} from '../../utils'
import {State} from '../Common'
import {
        handleVirtualListData,
        handleVirtualListDataChange,
        handleVirtualListItem,
        handleVirtualListItemUnmount,
        handleVirtualListLayoutChange,
        handleVirtualListLoadEnd,
        handleVirtualListMomentumScrollEnd,
        handleVirtualListScroll,
        handleVirtualListStateChange
} from './Virtual-list-handle'
import {VirtualListBaseProps, VirtualListState} from './Virtual-list.interface'
import {useVirtualListAnimated} from './use-virtual-list-animated.hook'

export const VirtualListBaseInner = <T,>(
        {
                data,
                extraData,
                focusedIndex,
                gap = 0,
                itemSize = 0,
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
                {emptyList, nextItemVisibleEvent, nextScrollEvent, status, virtualListData, visibleRangeData},
                setState
        ] = useImmer<VirtualListState>({layout: {} as LayoutRectangle, status: 'idle'})

        const id = useId()
        const contentSize = virtualListData ? virtualListData.length * (itemSize + gap) - gap : 0
        const onVirtualListVisibleRange = useMemo(
                () => handleVirtualListDataChange(itemSize)(setState),
                [itemSize, setState]
        )

        const onVirtualListScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) =>
                handleVirtualListScroll({onScroll, itemSize})(setState)(event)

        const onVirtualListMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) =>
                handleVirtualListMomentumScrollEnd(onMomentumScrollEnd)(event)

        const onVirtualListData = useMemo(() => handleVirtualListData(setState), [setState])
        const onVirtualListLoadEnd = handleVirtualListLoadEnd(setState)(onLoadEnd)
        const scrollEvent = useDesktopScrollEvent({
                onMomentumScrollEnd: onVirtualListMomentumScrollEnd,
                onScroll: onVirtualListScroll
        })

        const onVirtualListItemUnmount = handleVirtualListItemUnmount(itemSize)(setState)
        const onVirtualListLayoutChange = useMemo(
                () => debounce(handleVirtualListLayoutChange(itemSize)(setState))(50),
                [itemSize, setState]
        )

        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                handleVirtualListStateChange({...options, state})(onVirtualListLayoutChange)(event)

        const onStateEvent = useOnStateEvent({...renderProps, disabled: false, onStateEventChange})
        const itemElements = handleVirtualListItem({
                extraData,
                id,
                itemSize,
                onLoadEnd: onVirtualListLoadEnd,
                onUnmount: onVirtualListItemUnmount,
                renderItem
        })(visibleRangeData)

        const {animatedRef} = useVirtualListAnimated({focusedIndex, itemSize})

        useImperativeHandle(ref, () => (animatedRef?.current ? animatedRef?.current : {}) as Animated.ScrollView, [
                animatedRef
        ])

        useEffect(() => {
                onVirtualListData(data)
        }, [data, onVirtualListData])

        useEffect(() => {
                onVirtualListVisibleRange(virtualListData)
        }, [onVirtualListVisibleRange, virtualListData])

        useEffect(() => {
                runAfterInteractions(nextScrollEvent)()
        }, [nextScrollEvent])

        useEffect(() => {
                runAfterInteractions(nextItemVisibleEvent)()
        }, [nextItemVisibleEvent])

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
                itemSize,
                onStateEvent,
                ref: animatedRef,
                status
        })
}

export const VirtualListBase = forwardRef(VirtualListBaseInner) as typeof VirtualListBaseInner
