import type {ForwardedRef} from 'react'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo} from 'react'
import type {ScrollView} from 'react-native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useClearComponentEvent, useDesktopScrollEvent, useInteractionStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import {COMPONENT_STATUS, LAYOUT, type LayoutRectangle, type State} from '../Common'
import {useVirtualListAnimated} from './use-virtual-list-animated.hook'
import {
	handleVirtualListDragEnd,
	handleVirtualListDragStart,
	handleVirtualListDragUpdate,
	handleVirtualListScroll,
	handleVirtualListStateChange,
	unmountVirtualList,
	updateVirtualListData,
	updateVirtualListLayout,
	updateVirtualListVisibilityRangeData
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
	ref: ForwardedRef<ScrollView>
) => {
	const [
		{
			emptyList: isEmptyList,
			endIndex,
			layout: containerLayout,
			nextCloseEvent,
			nextDragEndEvent,
			nextDragUpdateEvent,
			nextEndReachedEvent,
			nextLoadEndEvent,
			nextScrollEvent,
			scrollOffset,
			startIndex,
			status,
			virtualListData,
			visibleRangeData
		},
		setState
	] = useImmer<VirtualListState>({layout: {} as LayoutRectangle, status: COMPONENT_STATUS.IDLE})

	useClearComponentEvent(setState)

	const id = useId()
	const itemSize = rawItemSize + gap
	const contentSize = (virtualListData ?? data ?? []).length * itemSize - gap
	const onEndReached = useMemo(() => debounce(rawOnEndReached)(150), [rawOnEndReached])
	const onScroll = useMemo(
		() =>
			debounce(
				handleVirtualListScroll({
					endReachedThreshold,
					itemSize,
					layoutType,
					onEndReached,
					onScroll: rawOnScroll
				})(setState)
			)(50),
		[endReachedThreshold, itemSize, layoutType, onEndReached, rawOnScroll, setState]
	)

	const scrollEvent = useDesktopScrollEvent({onMomentumScrollEnd, onScroll})
	const onUnmount = useMemo(
		() =>
			unmountVirtualList({
				itemSize,
				enableAutoSelect,
				onClose: rawOnClose,
				activeKey,
				layoutType
			})(setState),
		[activeKey, enableAutoSelect, itemSize, layoutType, rawOnClose, setState]
	)

	const onLayoutChange = useMemo(
		() => updateVirtualListLayout({itemSize, layoutType})(setState),
		[itemSize, layoutType, setState]
	)

	const onStateEventChange = useCallback(
		(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
			handleVirtualListStateChange({...options, state})(onLayoutChange)(event),
		[onLayoutChange]
	)

	const onDragUpdate = useMemo(
		() =>
			handleVirtualListDragUpdate({
				itemSize,
				layoutType,
				onDragUpdate: rawOnDragUpdate
			})(setState),
		[itemSize, layoutType, rawOnDragUpdate, setState]
	)

	const onDragStart = useMemo(() => handleVirtualListDragStart(setState), [setState])
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

	const runUpdateVisibilityRangeData = useMemo(
		() => updateVirtualListVisibilityRangeData({itemSize, layoutType})(setState),
		[itemSize, layoutType, setState]
	)

	const runUpdateData = useMemo(() => updateVirtualListData(setState), [setState])
	const itemElements = useMemo(
		() => (
			<RenderVirtualListItem
				containerLayout={containerLayout}
				data={visibleRangeData as VirtualListData<T>[]}
				dependencies={dependencies}
				draggable={draggable}
				gap={gap}
				id={id}
				itemSize={itemSize}
				layoutType={layoutType}
				onDragEnd={onDragEnd}
				onDragStart={onDragStart}
				onDragUpdate={onDragUpdate}
				onLoadEnd={onLoadEnd}
				onUnmount={onUnmount}
				renderItem={renderItem}
				scrollOffset={scrollOffset}
				shape={shape}
			/>
		),
		[
			containerLayout,
			dependencies,
			draggable,
			gap,
			id,
			itemSize,
			layoutType,
			onDragEnd,
			onDragStart,
			onDragUpdate,
			onLoadEnd,
			onUnmount,
			renderItem,
			scrollOffset,
			shape,
			visibleRangeData
		]
	)

	useImperativeHandle(ref, () => (animatedRef?.current ?? {}) as ScrollView, [animatedRef])

	useEffect(() => {
		runUpdateData(data)
	}, [runUpdateData, data])

	useEffect(() => {
		runUpdateVisibilityRangeData(virtualListData)
	}, [runUpdateVisibilityRangeData, virtualListData])

	useEffect(() => {
		nextScrollEvent?.()
	}, [nextScrollEvent])

	useEffect(() => {
		nextEndReachedEvent?.()
	}, [nextEndReachedEvent])

	useEffect(() => {
		nextCloseEvent?.()
	}, [nextCloseEvent])

	useEffect(() => {
		nextLoadEndEvent?.()
	}, [nextLoadEndEvent])

	useEffect(() => {
		nextDragUpdateEvent?.()
	}, [nextDragUpdateEvent])

	useEffect(() => {
		nextDragEndEvent?.()
	}, [nextDragEndEvent])

	if (status === COMPONENT_STATUS.IDLE) {
		return <></>
	}

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
			ref={animatedRef}
			status={status}
		/>
	)
}

export const VirtualListBase = forwardRef(VirtualListBaseInner) as <T>(
	props: VirtualListBaseProps<T> & {ref?: ForwardedRef<ScrollView>}
) => ReturnType<typeof VirtualListBaseInner>
