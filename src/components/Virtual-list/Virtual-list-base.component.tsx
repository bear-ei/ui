import type {ForwardedRef} from 'react'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo} from 'react'
import type {LayoutRectangle} from 'react-native'
import Animated from 'react-native-reanimated'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useDesktopScrollEvent, useInteractionStateEvent} from '../../hooks'
import {createStableHandler, createStableHandlerWithState, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, type State} from '../Common'
import {useVirtualListAnimated} from './use-virtual-list-animated.hook'
import {
	checkVirtualListLoadEnd,
	handleVirtualListStateChange,
	triggerVirtualListMomentumScrollEnd,
	unmountVirtualList,
	updateVirtualListData,
	updateVirtualListLayout,
	updateVirtualListOnScroll,
	updateVirtualListVisibilityRangeData
} from './Virtual-list.handle'
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
		onClose: rawOnClose,
		onLoadEnd: rawOnLoadEnd,
		onMomentumScrollEnd: rawOnMomentumScrollEnd,
		onScroll: rawOnScroll,
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
	const runUpdateVirtualListVisibilityRangeData = useMemo(
		() => createStableHandlerWithState(updateVirtualListVisibilityRangeData(itemSize))(setState)(),
		[itemSize, setState]
	)

	const onScroll = useMemo(
		() =>
			createStableHandlerWithState(updateVirtualListOnScroll({onScroll: rawOnScroll, itemSize}))(
				setState
			)(),
		[itemSize, rawOnScroll, setState]
	)

	const onMomentumScrollEnd = useMemo(
		() => createStableHandler(triggerVirtualListMomentumScrollEnd(rawOnMomentumScrollEnd))(),
		[rawOnMomentumScrollEnd]
	)

	const runUpdateVirtualListData = useMemo(
		() => createStableHandlerWithState(updateVirtualListData)(setState)(),
		[setState]
	)
	const onLoadEnd = useMemo(
		() => createStableHandlerWithState(checkVirtualListLoadEnd(rawOnLoadEnd))(setState)(),
		[rawOnLoadEnd, setState]
	)

	const scrollEvent = useDesktopScrollEvent({onMomentumScrollEnd, onScroll})
	const onUnmount = useMemo(
		() =>
			createStableHandlerWithState(
				unmountVirtualList({itemSize, enableAutoSelect, onClose: rawOnClose})
			)(setState)(),
		[enableAutoSelect, itemSize, rawOnClose, setState]
	)

	const onLayoutChange = useMemo(
		() =>
			createStableHandlerWithState(updateVirtualListLayout(itemSize))(setState)({
				debounceMillisecond: 50
			}),
		[itemSize, setState]
	)

	const onStateEventChange = useCallback(
		(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
			handleVirtualListStateChange({...options, state})(onLayoutChange)(event),
		[onLayoutChange]
	)

	const interactionHandlers = useInteractionStateEvent({
		...renderVirtualListProps,
		disabled: false,
		onStateEventChange
	})

	const {animatedRef, contentAnimatedStyle} = useVirtualListAnimated({focusedIndex, itemSize, contentSize})
	const itemElements = useMemo(
		() =>
			renderVirtualListItem({
				extraData,
				id,
				itemSize: itemSize + gap,
				onLoadEnd,
				onUnmount,
				renderItem,
				startIndex
			})(visibleRangeData),
		[extraData, gap, id, itemSize, onLoadEnd, onUnmount, renderItem, startIndex, visibleRangeData]
	)

	useImperativeHandle(ref, () => (animatedRef?.current ?? {}) as Animated.ScrollView, [animatedRef])

	useEffect(() => {
		runUpdateVirtualListData(data)
	}, [runUpdateVirtualListData, data])

	useEffect(() => {
		runUpdateVirtualListVisibilityRangeData(virtualListData)
	}, [runUpdateVirtualListVisibilityRangeData, virtualListData])

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
