import type {ForwardedRef} from 'react'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo} from 'react'
import type {ScrollView} from 'react-native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useClearComponentEvent, useDesktopScrollEvent, useInteractionStateEvent} from '../../hooks'
import {debounce, runAfterInteractions} from '../../utils'
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
		layout = LAYOUT.VERTICAL,
		onClose: rawOnClose,
		onEndReached: rawOnEndReached,
		onLoadEnd,
		onMomentumScrollEnd: rawOnMomentumScrollEnd,
		onScroll: rawOnScroll,
		renderItem,
		onDragEnd: rawOnDragEnd,
		...renderVirtualListProps
	}: VirtualListBaseProps<T>,
	ref: ForwardedRef<ScrollView>
) => {
	const [
		{
			emptyList: isEmptyList,
			layout: containerLayout,
			nextCloseEvent,
			nextDragEndEvent,
			nextEndReachedEvent,
			nextLoadEndEvent,
			nextScrollEvent,
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
					layout,
					onEndReached,
					onScroll: rawOnScroll
				})(setState)
			)(50),
		[endReachedThreshold, itemSize, layout, onEndReached, rawOnScroll, setState]
	)

	const onMomentumScrollEnd = useMemo(
		() => triggerVirtualListMomentumScrollEnd(rawOnMomentumScrollEnd),
		[rawOnMomentumScrollEnd]
	)

	const scrollEvent = useDesktopScrollEvent({onMomentumScrollEnd, onScroll})
	const onUnmount = useMemo(
		() =>
			unmountVirtualList({itemSize, enableAutoSelect, onClose: rawOnClose, activeKey, layout})(
				setState
			),
		[activeKey, enableAutoSelect, itemSize, layout, rawOnClose, setState]
	)

	const onLayoutChange = useMemo(
		() => updateVirtualListLayout({itemSize, layout})(setState),
		[itemSize, layout, setState]
	)

	const onStateEventChange = useCallback(
		(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
			handleVirtualListStateChange({...options, state})(onLayoutChange)(event),
		[onLayoutChange]
	)

	const onDragUpdate = useMemo(
		() => handleVirtualListDragUpdate({itemSize: renderItemSize, layout})(setState),
		[layout, renderItemSize, setState]
	)

	const onDragEnd = useMemo(() => handleVirtualListDragEnd(rawOnDragEnd)(setState), [rawOnDragEnd, setState])
	const interactionHandlers = useInteractionStateEvent({
		...renderVirtualListProps,
		disabled: false,
		onStateEventChange
	})

	const {animatedRef, contentAnimatedStyle} = useVirtualListAnimated({
		contentSize,
		focusedIndex,
		itemSize,
		layout
	})

	const runUpdateVisibilityRangeData = useMemo(
		() => updateVirtualListVisibilityRangeData({itemSize, layout})(setState),
		[itemSize, layout, setState]
	)

	const runUpdateData = useMemo(() => updateVirtualListData(setState), [setState])
	const itemElements = useMemo(
		() => (
			<RenderVirtualListItem
				containerLayout={containerLayout}
				data={visibleRangeData as VirtualListData<T>[]}
				dependencies={dependencies}
				draggable={draggable}
				id={id}
				itemSize={renderItemSize}
				layout={layout}
				onDragEnd={onDragEnd}
				onDragUpdate={onDragUpdate}
				onLoadEnd={onLoadEnd}
				onUnmount={onUnmount}
				renderItem={renderItem}
			/>
		),
		[
			containerLayout,
			dependencies,
			draggable,
			id,
			layout,
			onDragEnd,
			onDragUpdate,
			onLoadEnd,
			onUnmount,
			renderItem,
			renderItemSize,
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
		runAfterInteractions(nextDragEndEvent)()
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
			itemSize={itemSize}
			layout={layout}
			ref={animatedRef}
			status={status}
		/>
	)
}

export const VirtualListBase = forwardRef(VirtualListBaseInner) as <T>(
	props: VirtualListBaseProps<T> & {ref?: ForwardedRef<ScrollView>}
) => ReturnType<typeof VirtualListBaseInner>
