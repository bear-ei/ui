import {ForwardedRef, forwardRef, useEffect, useId, useImperativeHandle, useMemo} from 'react'
import {LayoutRectangle} from 'react-native'
import Animated from 'react-native-reanimated'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useDesktopScrollEvent, useOnStateEvent} from '../../hooks'
import {debounce, runAfterInteractions} from '../../utils'
import {State} from '../Common'
import {
        handleVirtualListClose,
        handleVirtualListData,
        handleVirtualListDataChange,
        handleVirtualListItem,
        handleVirtualListLayoutChange,
        handleVirtualListLoadEnd,
        handleVirtualListMomentumScrollEnd,
        handleVirtualListScroll,
        handleVirtualListStateChange,
        handleVirtualListUnmount
} from './Virtual-list-handle'
import {VirtualListBaseProps, VirtualListState} from './Virtual-list.interface'
import {useVirtualListAnimated} from './use-virtual-list-animated.hook'

export const VirtualListBaseInner = <T,>(
        {
                data = [],
                enableAutoSelect,
                extraData,
                focusedIndex,
                gap = 0,
                itemSize = 0,
                onClose,
                onLoadEnd,
                onMomentumScrollEnd,
                onScroll,
                render,
                renderItem,
                ...renderProps
        }: VirtualListBaseProps<T>,
        ref: ForwardedRef<Animated.ScrollView>
) => {
        const [{emptyList, nextScrollEvent, startIndex, status, virtualListData, visibleRangeData}, setState] =
                useImmer<VirtualListState>({layout: {} as LayoutRectangle, status: 'idle', startIndex: 0})

        const id = useId()
        const contentSize = useMemo(
                () => (virtualListData ?? data).length * (itemSize + gap) - gap,
                [virtualListData, data, itemSize, gap]
        )

        const {animatedRef, contentAnimatedStyle} = useVirtualListAnimated({focusedIndex, itemSize, contentSize})
        const onVirtualListVisibleRange = useMemo(
                () => handleVirtualListDataChange(itemSize)(setState),
                [itemSize, setState]
        )

        const onVirtualListScroll = useMemo(
                () => handleVirtualListScroll({onScroll, itemSize})(setState),
                [itemSize, onScroll, setState]
        )

        const onVirtualListClose = handleVirtualListClose({enableAutoSelect, onClose})(setState)
        const onVirtualListMomentumScrollEnd = handleVirtualListMomentumScrollEnd(onMomentumScrollEnd)
        const onVirtualListData = useMemo(() => handleVirtualListData(setState), [setState])
        const onVirtualListLoadEnd = handleVirtualListLoadEnd(setState)(onLoadEnd)
        const scrollEvent = useDesktopScrollEvent({
                onMomentumScrollEnd: onVirtualListMomentumScrollEnd,
                onScroll: onVirtualListScroll
        })

        const onVirtualListUnmount = handleVirtualListUnmount(itemSize)(setState)
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
                onClose: onVirtualListClose,
                onLoadEnd: onVirtualListLoadEnd,
                onUnmount: onVirtualListUnmount,
                renderItem,
                startIndex
        })(visibleRangeData)

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

        if (status === 'idle') {
                return <></>
        }

        return render({
                ...renderProps,
                ...scrollEvent,
                contentAnimatedStyle,
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
