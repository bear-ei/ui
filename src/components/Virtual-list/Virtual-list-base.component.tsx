import type {ForwardedRef} from 'react'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo} from 'react'
import type {ScrollView} from 'react-native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useClearComponentEvent, useDesktopScrollEvent, useInteractionStateEvent} from '../../hooks'
import {createDeferredHandlerWithState, debounce, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, LAYOUT, type LayoutRectangle, type State} from '../Common'
import {useVirtualListAnimated} from './use-virtual-list-animated.hook'
import {
	handleVirtualListDragEnd,
	handleVirtualListDragUpdate,
	handleVirtualListStateChange,
	triggerVirtualListMomentumScrollEnd,
	unmountVirtualList,
	updateVirtualListData,
	updateVirtualListLayout,
	updateVirtualListOnScroll,
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
		itemSize = 0,
		layoutType = LAYOUT.VERTICAL,
		onClose: rawOnClose,
		onDragEnd: rawOnDragEnd,
		onDragUpdate: rawOnDragUpdate,
		onEndReached: rawOnEndReached,
		onLoadEnd,
		onMomentumScrollEnd: rawOnMomentumScrollEnd,
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
			nextDragUpdateEvent,
			nextEndReachedEvent,
			nextLoadEndEvent,
			nextScrollEvent,
			startIndex,
			status,
			virtualListData,
			visibleRangeData
		},
		setState
	] = useImmer<VirtualListState>({layout: {} as LayoutRectangle, status: COMPONENT_STATUS.IDLE})

	useClearComponentEvent(setState)

	const id = useId()
	const renderItemSize = itemSize + gap
	const contentSize = (virtualListData ?? data ?? []).length * renderItemSize - gap
	const onEndReached = useMemo(() => debounce(rawOnEndReached)(150), [rawOnEndReached])
	const onScroll = useMemo(
		() =>
			debounce(
				updateVirtualListOnScroll({
					endReachedThreshold,
					itemSize,
					layoutType,
					onEndReached,
					onScroll: rawOnScroll
				})(setState)
			)(50),
		[endReachedThreshold, itemSize, layoutType, onEndReached, rawOnScroll, setState]
	)

	const onMomentumScrollEnd = useMemo(
		() => triggerVirtualListMomentumScrollEnd(rawOnMomentumScrollEnd),
		[rawOnMomentumScrollEnd]
	)

	const scrollEvent = useDesktopScrollEvent({onMomentumScrollEnd, onScroll})
	const onUnmount = useMemo(
		() =>
			unmountVirtualList({itemSize, enableAutoSelect, onClose: rawOnClose, activeKey, layoutType})(
				setState
			),
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
			createDeferredHandlerWithState(
				handleVirtualListDragUpdate({
					itemSize: renderItemSize,
					layoutType,
					onDragUpdate: rawOnDragUpdate
				})
			)(setState)({throttleMillisecond: 50}),
		[layoutType, rawOnDragUpdate, renderItemSize, setState]
	)

	const onDragEnd = useMemo(
		() => handleVirtualListDragEnd({endIndex, startIndex})(rawOnDragEnd),
		[endIndex, rawOnDragEnd, startIndex]
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
				itemSize={renderItemSize}
				layoutType={layoutType}
				onDragEnd={onDragEnd}
				onDragUpdate={onDragUpdate}
				onLoadEnd={onLoadEnd}
				onUnmount={onUnmount}
				renderItem={renderItem}
				shape={shape}
			/>
		),
		[
			containerLayout,
			dependencies,
			draggable,
			gap,
			id,
			layoutType,
			onDragEnd,
			onDragUpdate,
			onLoadEnd,
			onUnmount,
			renderItem,
			renderItemSize,
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
		runAfterInteractions(nextScrollEvent)()
	}, [nextScrollEvent])

	useEffect(() => {
		runAfterInteractions(nextEndReachedEvent)()
	}, [nextEndReachedEvent])

	useEffect(() => {
		runAfterInteractions(nextCloseEvent)()
	}, [nextCloseEvent])

	useEffect(() => {
		runAfterInteractions(nextLoadEndEvent)()
	}, [nextLoadEndEvent])

	useEffect(() => {
		runAfterInteractions(nextDragUpdateEvent)()
	}, [nextDragUpdateEvent])

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
			itemSize={itemSize}
			layoutType={layoutType}
			ref={animatedRef}
			status={status}
		/>
	)
}

export const VirtualListBase = forwardRef(VirtualListBaseInner) as <T>(
	props: VirtualListBaseProps<T> & {ref?: ForwardedRef<ScrollView>}
) => ReturnType<typeof VirtualListBaseInner>
