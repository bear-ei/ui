import type {ForwardedRef} from 'react'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo} from 'react'
import type {LayoutRectangle} from 'react-native'
import Animated from 'react-native-reanimated'
import {useImmer} from 'use-immer'
import type {ProcessStateEventChangeOptions, StateEvent} from '../../hooks'
import {useDesktopScrollEvent, useStateEvent} from '../../hooks'
import {createHandler, createHandlerFinal, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, type State} from '../Common'
import {useVirtualListAnimated} from './use-virtual-list-animated.hook'
import {
	handleVirtualListData,
	handleVirtualListDataChange,
	handleVirtualListLayoutChange,
	handleVirtualListLoadEnd,
	handleVirtualListMomentumScrollEnd,
	handleVirtualListScroll,
	handleVirtualListStateChange,
	handleVirtualListUnmount
} from './Virtual-list-handle'
import type {VirtualListBaseProps, VirtualListState} from './Virtual-list.interface'
import {renderVirtualListItem} from './Virtual-list.render'

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
		...renderVirtualListProps
	}: VirtualListBaseProps<T>,
	ref: ForwardedRef<Animated.ScrollView>
) => {
	const [
		{
			emptyList: isEmptyList,
			layout,
			nextCloseEvent,
			nextScrollEvent,
			startIndex,
			status,
			virtualListData,
			visibleRangeData
		},
		setState
	] = useImmer<VirtualListState>({layout: {} as LayoutRectangle, status: COMPONENT_STATUS.IDLE, startIndex: 0})

	const id = useId()
	const contentSize = (virtualListData ?? data ?? []).length * (itemSize + gap) - gap
	const onVirtualListVisibleRanges = useMemo(
		() => createHandler(handleVirtualListDataChange(itemSize))(setState)(),
		[itemSize, setState]
	)

	const onVirtualListScroll = useMemo(
		() => createHandler(handleVirtualListScroll({onScroll, itemSize}))(setState)(),
		[itemSize, onScroll, setState]
	)

	const onVirtualListMomentumScrollEnd = useMemo(
		() => createHandlerFinal(handleVirtualListMomentumScrollEnd(onMomentumScrollEnd))(),
		[onMomentumScrollEnd]
	)

	const onVirtualListData = useMemo(() => createHandler(handleVirtualListData)(setState)(), [setState])
	const onVirtualListLoadEnd = useMemo(
		() => createHandler(handleVirtualListLoadEnd(onLoadEnd))(setState)(),
		[onLoadEnd, setState]
	)

	const scrollEvent = useDesktopScrollEvent({
		onMomentumScrollEnd: onVirtualListMomentumScrollEnd,
		onScroll: onVirtualListScroll
	})

	const onVirtualListUnmount = useMemo(
		() => createHandler(handleVirtualListUnmount({itemSize, enableAutoSelect, onClose}))(setState)(),
		[enableAutoSelect, itemSize, onClose, setState]
	)

	const onVirtualListLayoutChange = useMemo(
		() => createHandler(handleVirtualListLayoutChange(itemSize))(setState)({debounceMillisecond: 50}),
		[itemSize, setState]
	)

	const onStateEventChange = useCallback(
		(options: ProcessStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
			handleVirtualListStateChange({...options, state})(onVirtualListLayoutChange)(event),
		[onVirtualListLayoutChange]
	)

	const interactionHandlers = useStateEvent({...renderVirtualListProps, disabled: false, onStateEventChange})
	const {animatedRef, contentAnimatedStyle} = useVirtualListAnimated({focusedIndex, itemSize, contentSize})
	const itemElements = useMemo(
		() =>
			renderVirtualListItem({
				extraData,
				id,
				itemSize: itemSize + gap,
				onLoadEnd: onVirtualListLoadEnd,
				onUnmount: onVirtualListUnmount,
				renderItem,
				startIndex
			})(visibleRangeData),
		[
			extraData,
			gap,
			id,
			itemSize,
			onVirtualListLoadEnd,
			onVirtualListUnmount,
			renderItem,
			startIndex,
			visibleRangeData
		]
	)

	useImperativeHandle(ref, () => (animatedRef?.current ?? {}) as Animated.ScrollView, [animatedRef])

	useEffect(() => {
		onVirtualListData(data)
	}, [data, onVirtualListData])

	useEffect(() => {
		onVirtualListVisibleRanges(virtualListData)
	}, [onVirtualListVisibleRanges, virtualListData])

	useEffect(() => {
		runAfterInteractions(nextScrollEvent)()
	}, [nextScrollEvent])

	useEffect(() => {
		runAfterInteractions(nextCloseEvent)()
	}, [nextCloseEvent])

	if (status === COMPONENT_STATUS.IDLE) {
		return <></>
	}

	return renderVirtualList({
		...renderVirtualListProps,
		...scrollEvent,
		contentAnimatedStyle,
		contentSize,
		emptyList: isEmptyList,
		id,
		interactionHandlers,
		itemElements,
		itemSize,
		layout,
		ref: animatedRef,
		status
	})
}

export const VirtualListBase = forwardRef(VirtualListBaseInner) as <T>(
	props: VirtualListBaseProps<T> & {ref?: ForwardedRef<Animated.ScrollView>}
) => ReturnType<typeof VirtualListBaseInner>
