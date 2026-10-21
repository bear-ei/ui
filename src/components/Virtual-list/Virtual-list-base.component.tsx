import type {ForwardedRef, Ref} from 'react'
import {forwardRef, useCallback, useEffect, useId, useMemo, useRef} from 'react'
import type {ScrollView} from 'react-native'
import {useImmer} from 'use-immer'

import {COMPONENT_STATUS, LAYOUT, type LayoutRectangle, type State} from '../../constants'
import {
	type HandleStateEventChangeOptions,
	type StateEvent,
	useDesktopScrollEvent,
	useInteractionStateEvent,
	useMergeRefs,
	usePendingEvent
} from '../../hooks'
import {debounce} from '../../utils'
import {rafSchedule} from '../../utils/raf-schedule/raf-schedule.utils'

import {useVirtualListAnimated} from './use-virtual-list-animated.hook'
import {
	closeVirtualList,
	handleVirtualListDragEnd,
	handleVirtualListDragStart,
	handleVirtualListDragUpdate,
	handleVirtualListScroll,
	handleVirtualListStateChange,
	updateVirtualListData,
	updateVirtualListLayout,
	updateVirtualListVisibleRangeData
} from './Virtual-list.handler'
import type {VirtualListBaseProps, VirtualListData, VirtualListState} from './Virtual-list.interface'
import {RenderVirtualList, RenderVirtualListItem} from './Virtual-list.render'

const VirtualListBaseInner = <T,>(
	{
		activeKey,
		data,
		dependencies,
		draggable,
		enableAutoSelect,
		endReachedThreshold = 0.1,
		focusedIndex,
		gap = 0,
		itemSize: rawItemSize = 0,
		layoutType = LAYOUT.VERTICAL,
		onClose: rawOnClose,
		onDragEnd: rawOnDragEnd,
		onDragUpdate: rawOnDragUpdate,
		onEndReached: rawOnEndReached,
		onLoadEnd,
		onMomentumScrollEnd,
		onScroll: rawOnScroll,
		renderItem,
		shape,
		...renderVirtualListProps
	}: VirtualListBaseProps<T>,
	ref: Ref<ScrollView>
) => {
	const [
		{
			dragScrollOffset,
			emptyList: isEmptyList,
			endIndex,
			layout: containerLayout,
			pendingCloseEvent,
			pendingDragEndEvent,
			pendingDragUpdateEvent,
			pendingEndReachedEvent,
			pendingScrollEvent,
			startIndex,
			status,
			virtualListData,
			visibleRangeData
		},
		setState
	] = useImmer<VirtualListState>({layout: {} as Partial<LayoutRectangle>, status: COMPONENT_STATUS.IDLE})

	const onEndReached = useMemo(
		() => (rawOnEndReached ? debounce(rawOnEndReached)(150) : undefined),
		[rawOnEndReached]
	)

	usePendingEvent({
		eventKey: 'pendingEndReachedEvent',
		func: onEndReached,
		pendingEvent: pendingEndReachedEvent,
		setState
	})

	usePendingEvent({
		eventKey: 'pendingCloseEvent',
		func: rawOnClose,
		pendingEvent: pendingCloseEvent,
		setState
	})

	usePendingEvent({
		eventKey: 'pendingDragEndEvent',
		func: rawOnDragEnd,
		pendingEvent: pendingDragEndEvent,
		setState
	})

	usePendingEvent({
		eventKey: 'pendingDragUpdateEvent',
		func: rawOnDragUpdate,
		pendingEvent: pendingDragUpdateEvent,
		setState
	})

	usePendingEvent({
		eventKey: 'pendingScrollEvent',
		func: rawOnScroll,
		pendingEvent: pendingScrollEvent,
		setState
	})

	const id = useId()
	const itemSize = rawItemSize + gap
	const scrollOffsetRef = useRef<number>(0)
	const contentSize = Math.max(0, (virtualListData ?? data ?? []).length * itemSize - gap)

	const onScroll = useMemo(
		() =>
			rafSchedule(
				handleVirtualListScroll({
					endReachedThreshold,
					itemSize,
					layoutType,
					onEndReached,
					onScroll: rawOnScroll,
					scrollOffsetRef
				})(setState)
			),
		[endReachedThreshold, itemSize, layoutType, onEndReached, rawOnScroll, setState]
	)

	const scrollEvent = useDesktopScrollEvent({onMomentumScrollEnd, onScroll})
	const onClose = useMemo(
		() =>
			closeVirtualList({activeKey, enableAutoSelect, itemSize, layoutType, onClose: rawOnClose, scrollOffsetRef})(
				setState
			),
		[activeKey, enableAutoSelect, itemSize, layoutType, rawOnClose, setState]
	)

	const onLayoutChange = useMemo(
		() => updateVirtualListLayout({itemSize, layoutType, scrollOffsetRef})(setState),
		[itemSize, layoutType, setState]
	)

	const onStateEventChange = useCallback(
		(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
			handleVirtualListStateChange({...options, state})(onLayoutChange)(event),
		[onLayoutChange]
	)

	const onDragUpdate = useMemo(
		() => handleVirtualListDragUpdate({itemSize, layoutType, onDragUpdate: rawOnDragUpdate})(setState),
		[itemSize, layoutType, rawOnDragUpdate, setState]
	)

	const onDragStart = useMemo(() => handleVirtualListDragStart({scrollOffsetRef})(setState), [setState])
	const onDragEnd = useMemo(
		() => handleVirtualListDragEnd({startIndex, endIndex, setState})(rawOnDragEnd),
		[endIndex, rawOnDragEnd, setState, startIndex]
	)

	const interactionHandlers = useInteractionStateEvent({
		...renderVirtualListProps,
		disabled: false,
		onStateEventChange
	})

	const {animatedRef, contentAnimatedStyle} = useVirtualListAnimated({
		contentSize,
		focusedIndex,
		itemSize,
		layoutType
	})

	const mergedRef = useMergeRefs([ref, animatedRef])
	const runUpdateVisibleRangeData = useMemo(
		() => updateVirtualListVisibleRangeData({itemSize, layoutType, scrollOffsetRef})(setState),
		[itemSize, layoutType, setState]
	)

	const runUpdateData = useMemo(() => updateVirtualListData(setState), [setState])
	const itemElements = (
		<RenderVirtualListItem
			containerLayout={containerLayout}
			data={visibleRangeData as VirtualListData<T>[]}
			dependencies={dependencies}
			draggable={draggable}
			gap={gap}
			id={id}
			itemSize={itemSize}
			layoutType={layoutType}
			onClose={onClose}
			onDragEnd={onDragEnd}
			onDragStart={onDragStart}
			onDragUpdate={onDragUpdate}
			onLoadEnd={onLoadEnd}
			renderItem={renderItem}
			scrollOffset={dragScrollOffset}
			shape={shape}
		/>
	)

	useEffect(
		() => () => {
			onEndReached?.cancel()
			onScroll.cancel()
		},
		[onScroll, onEndReached]
	)

	useEffect(() => {
		runUpdateData(data)
	}, [runUpdateData, data])

	useEffect(() => {
		runUpdateVisibleRangeData(virtualListData)
	}, [runUpdateVisibleRangeData, virtualListData])

	return (
		<RenderVirtualList
			{...renderVirtualListProps}
			{...scrollEvent}
			containerLayout={containerLayout}
			contentAnimatedStyle={contentAnimatedStyle}
			contentSize={contentSize}
			emptyList={isEmptyList}
			id={id}
			interactionHandlers={interactionHandlers}
			itemElements={itemElements}
			layoutType={layoutType}
			ref={mergedRef}
			status={status}
		/>
	)
}

export const VirtualListBase = forwardRef(VirtualListBaseInner) as <T>(
	props: VirtualListBaseProps<T> & {ref?: ForwardedRef<ScrollView>}
) => ReturnType<typeof VirtualListBaseInner>
