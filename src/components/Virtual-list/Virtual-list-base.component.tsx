import type {ForwardedRef} from 'react'
import {forwardRef, useEffect, useId, useImperativeHandle, useMemo} from 'react'
import type {LayoutRectangle} from 'react-native'
import Animated from 'react-native-reanimated'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useDesktopScrollEvent, useStateEvent} from '../../hooks'
import {debounce, runAfterInteractions} from '../../utils'
import type {State} from '../Common'
import {
	handleVirtualListData,
	handleVirtualListDataChange,
	handleVirtualListLayoutChange,
	handleVirtualListLoadEnd,
	handleVirtualListMomentumScrollEnd,
	handleVirtualListScroll,
	handleVirtualListStateChange,
	handleVirtualListUnmount,
	renderVirtualListItem
} from './Virtual-list-handle'
import type {VirtualListBaseProps, VirtualListState} from './Virtual-list.interface'
import {useVirtualListAnimated} from './use-virtual-list-animated.hook'

export const VirtualListBaseInner = <T,>(
	{
		data,
		enableAutoSelect,
		extraData,
		focusedIndex,
		gap = 0,
		itemSize = 0,
		onClose,
		onLoadEnd,
		onMomentumScrollEnd,
		onScroll,
		renderItem,
		renderVirtualList,
		testID: rawTestID,
		...renderVirtualListProps
	}: VirtualListBaseProps<T>,
	ref: ForwardedRef<Animated.ScrollView>
) => {
	const [
		{
			emptyList,
			layout,
			nextCloseEvent,
			nextScrollEvent,
			startIndex,
			status,
			virtualListData,
			visibleRangeData
		},
		setState
	] = useImmer<VirtualListState>({layout: {} as LayoutRectangle, status: 'idle', startIndex: 0})

	const id = useId()
	const testID = rawTestID ?? id
	const contentSize = useMemo(
		() => (virtualListData ?? data ?? []).length * (itemSize + gap) - gap,
		[virtualListData, data, itemSize, gap]
	)

	const {animatedRef, contentAnimatedStyle} = useVirtualListAnimated({focusedIndex, itemSize, contentSize})
	const onVirtualListVisibleRanges = useMemo(
		() => handleVirtualListDataChange(itemSize)(setState),
		[itemSize, setState]
	)

	const onVirtualListScroll = useMemo(
		() => handleVirtualListScroll({onScroll, itemSize})(setState),
		[itemSize, onScroll, setState]
	)

	const onVirtualListMomentumScrollEnd = handleVirtualListMomentumScrollEnd(onMomentumScrollEnd)
	const onVirtualListData = useMemo(() => handleVirtualListData(setState), [setState])
	const onVirtualListLoadEnd = handleVirtualListLoadEnd(setState)(onLoadEnd)
	const scrollEvent = useDesktopScrollEvent({
		onMomentumScrollEnd: onVirtualListMomentumScrollEnd,
		onScroll: onVirtualListScroll
	})

	const onVirtualListUnmount = handleVirtualListUnmount({itemSize, enableAutoSelect, onClose})(setState)
	const onVirtualListLayoutChange = useMemo(
		() => debounce(handleVirtualListLayoutChange(itemSize)(setState))(50),
		[itemSize, setState]
	)

	const onStateEventChange = (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
		handleVirtualListStateChange({...options, state})(onVirtualListLayoutChange)(event)

	const interactionHandlers = useStateEvent({...renderVirtualListProps, disabled: false, onStateEventChange})
	const itemElements = renderVirtualListItem({
		extraData,
		itemSize: itemSize + gap,
		onLoadEnd: onVirtualListLoadEnd,
		onUnmount: onVirtualListUnmount,
		renderItem,
		startIndex,
		testID
	})(visibleRangeData)

	useImperativeHandle(ref, () => (animatedRef?.current ?? {}) as Animated.ScrollView, [animatedRef])

	useEffect(() => {
		runAfterInteractions(onVirtualListData)(data)
	}, [data, onVirtualListData])

	useEffect(() => {
		runAfterInteractions(onVirtualListVisibleRanges)(virtualListData)
	}, [onVirtualListVisibleRanges, virtualListData])

	useEffect(() => {
		runAfterInteractions(nextScrollEvent)()
	}, [nextScrollEvent])

	useEffect(() => {
		runAfterInteractions(nextCloseEvent)()
	}, [nextCloseEvent])

	if (status === 'idle') {
		return <></>
	}

	return renderVirtualList({
		...renderVirtualListProps,
		...scrollEvent,
		contentAnimatedStyle,
		contentSize,
		emptyList,
		interactionHandlers,
		itemElements,
		itemSize,
		layout,
		ref: animatedRef,
		status,
		testID
	})
}

export const VirtualListBase = forwardRef(VirtualListBaseInner) as typeof VirtualListBaseInner
