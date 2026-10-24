import type {FC} from 'react'

import {useCallback, useEffect, useId, useMemo, useRef} from 'react'
import {useImmer} from 'use-immer'

import type {VirtualListBaseProps, VirtualListState} from './Virtual-list.interface'

import {COMPONENT_STATUS, ORIENTATION, type MeasuredLayoutRectangle, type InteractionState} from '../../constants'
import {
	type HandleInteractionStateChangeOptions,
	type InteractionEvent,
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
import {RenderVirtualList, RenderVirtualListItems} from './Virtual-list.render'

export const VirtualListBase: FC<VirtualListBaseProps> = ({
	activeKey,
	autoSelectAdjacentOnClose,
	data,
	dependencies,
	draggable,
	endReachedThreshold = 0.1,
	focusedIndex,
	gap = 0,
	itemSize: rawItemSize = 0,
	onClose: rawOnClose,
	onDragEnd: rawOnDragEnd,
	onDragUpdate: rawOnDragUpdate,
	onEndReached: rawOnEndReached,
	onLoadEnd,
	onMomentumScrollEnd,
	onScroll: rawOnScroll,
	orientation = ORIENTATION.VERTICAL,
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
	] = useImmer<VirtualListState>({layout: {} as Partial<MeasuredLayoutRectangle>, status: COMPONENT_STATUS.IDLE})

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
					onEndReached,
					onScroll: rawOnScroll,
					orientation,
					scrollOffsetRef
				})
			),
		[endReachedThreshold, itemSize, orientation, onEndReached, rawOnScroll, setState]
	)

	const scrollEvent = useDesktopScrollEvent({onMomentumScrollEnd, onScroll})
	const onClose = useMemo(
		() =>
			closeVirtualList(setState, {
				activeKey,
				autoSelectAdjacentOnClose,
				itemSize,
				onClose: rawOnClose,
				orientation,
				scrollOffsetRef
			}),
		[activeKey, autoSelectAdjacentOnClose, itemSize, orientation, rawOnClose, setState]
	)

	const onLayoutChange = useMemo(
		() => updateVirtualListLayout(setState, {itemSize, orientation, scrollOffsetRef}),
		[itemSize, orientation, setState]
	)

	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, interactionState: InteractionState, options: HandleInteractionStateChangeOptions) =>
			handleVirtualListStateChange(event, onLayoutChange, {...options, interactionState}),
		[onLayoutChange]
	)

	const onDragUpdate = useMemo(
		() => handleVirtualListDragUpdate(setState, {itemSize, onDragUpdate: rawOnDragUpdate, orientation}),
		[itemSize, orientation, rawOnDragUpdate, setState]
	)

	const onDragStart = useMemo(() => handleVirtualListDragStart(setState, {scrollOffsetRef}), [setState])
	const onDragEnd = useMemo(
		() => handleVirtualListDragEnd(setState, rawOnDragEnd, {endIndex, startIndex}),
		[endIndex, rawOnDragEnd, setState, startIndex]
	)

	const interactionHandlers = useInteractionStateEvent({
		...renderVirtualListProps,
		disabled: false,
		onInteractionStateChange
	})

	const {animatedRef, contentAnimatedStyle} = useVirtualListAnimated({
		contentSize,
		focusedIndex,
		itemSize,
		orientation
	})

	const mergedRef = useMergeRefs([ref, animatedRef])
	const runUpdateVisibleRangeData = useMemo(
		() => updateVirtualListVisibleRangeData(setState, {itemSize, orientation, scrollOffsetRef}),
		[itemSize, orientation, setState]
	)

	const runUpdateData = useMemo(() => updateVirtualListData(setState), [setState])
	const itemElements = (
		<RenderVirtualListItems
			containerLayout={containerLayout}
			data={visibleRangeData}
			dependencies={dependencies}
			draggable={draggable}
			gap={gap}
			id={id}
			itemSize={itemSize}
			onClose={onClose}
			onDragEnd={onDragEnd}
			onDragStart={onDragStart}
			onDragUpdate={onDragUpdate}
			onLoadEnd={onLoadEnd}
			orientation={orientation}
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
			orientation={orientation}
			ref={mergedRef}
			status={status}
		/>
	)
}
