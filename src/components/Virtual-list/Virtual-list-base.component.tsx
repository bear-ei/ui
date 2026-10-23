import type {FC} from 'react'

import {useCallback, useEffect, useId, useMemo, useRef} from 'react'
import {useImmer} from 'use-immer'

import type {VirtualListBaseProps, VirtualListState} from './Virtual-list.interface'

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
import {RenderVirtualList, RenderVirtualListItem} from './Virtual-list.render'

export const VirtualListBase: FC<VirtualListBaseProps> = ({
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
	ref,
	renderItem,
	shape,
	...renderVirtualListProps
}) => {
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
		() => (rawOnEndReached ? debounce(rawOnEndReached, 150) : undefined),
		[rawOnEndReached]
	)

	usePendingEvent('pendingEndReachedEvent', onEndReached, {pendingEvent: pendingEndReachedEvent, setState})
	usePendingEvent('pendingCloseEvent', rawOnClose, {pendingEvent: pendingCloseEvent, setState})
	usePendingEvent('pendingDragEndEvent', rawOnDragEnd, {pendingEvent: pendingDragEndEvent, setState})
	usePendingEvent('pendingDragUpdateEvent', rawOnDragUpdate, {pendingEvent: pendingDragUpdateEvent, setState})
	usePendingEvent('pendingScrollEvent', rawOnScroll, {pendingEvent: pendingScrollEvent, setState})

	const id = useId()
	const itemSize = rawItemSize + gap
	const scrollOffsetRef = useRef<number>(0)
	const contentSize = Math.max(0, (virtualListData ?? data ?? []).length * itemSize - gap)
	const onScroll = useMemo(
		() =>
			rafSchedule(
				handleVirtualListScroll(setState, {
					endReachedThreshold,
					itemSize,
					layoutType,
					onEndReached,
					onScroll: rawOnScroll,
					scrollOffsetRef
				})
			),
		[endReachedThreshold, itemSize, layoutType, onEndReached, rawOnScroll, setState]
	)

	const scrollEvent = useDesktopScrollEvent({onMomentumScrollEnd, onScroll})
	const onClose = useMemo(
		() =>
			closeVirtualList(setState, {
				activeKey,
				enableAutoSelect,
				itemSize,
				layoutType,
				onClose: rawOnClose,
				scrollOffsetRef
			}),
		[activeKey, enableAutoSelect, itemSize, layoutType, rawOnClose, setState]
	)

	const onLayoutChange = useMemo(
		() => updateVirtualListLayout(setState, {itemSize, layoutType, scrollOffsetRef}),
		[itemSize, layoutType, setState]
	)

	const onStateEventChange = useCallback(
		(event: StateEvent, state: State, options: HandleStateEventChangeOptions) =>
			handleVirtualListStateChange(event, onLayoutChange, {...options, state}),
		[onLayoutChange]
	)

	const onDragUpdate = useMemo(
		() => handleVirtualListDragUpdate(setState, {itemSize, layoutType, onDragUpdate: rawOnDragUpdate}),
		[itemSize, layoutType, rawOnDragUpdate, setState]
	)

	const onDragStart = useMemo(() => handleVirtualListDragStart(setState, {scrollOffsetRef}), [setState])
	const onDragEnd = useMemo(
		() => handleVirtualListDragEnd(setState, rawOnDragEnd, {endIndex, startIndex}),
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
		() => updateVirtualListVisibleRangeData(setState, {itemSize, layoutType, scrollOffsetRef}),
		[itemSize, layoutType, setState]
	)

	const runUpdateData = useMemo(() => updateVirtualListData(setState), [setState])
	const itemElements = (
		<RenderVirtualListItem
			containerLayout={containerLayout}
			data={visibleRangeData}
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
