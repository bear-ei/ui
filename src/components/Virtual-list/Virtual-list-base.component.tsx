import type {ForwardedRef} from 'react'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo} from 'react'
import type {LayoutRectangle, ScrollView} from 'react-native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useDesktopScrollEvent, useInteractionStateEvent} from '../../hooks'
import {createDeferredHandlerWithState, debounce, runAfterInteractions, throttle} from '../../utils'
import {COMPONENT_STATUS, type State} from '../Common'
import {useVirtualListAnimated} from './use-virtual-list-animated.hook'
import {
	checkVirtualListLoadEnd,
	handleVirtualListStateChange,
	triggerVirtualListMomentumScrollEnd,
	unmountVirtualList,
	updateVirtualListData,
	updateVirtualListLayout,
	updateVirtualListLoading,
	updateVirtualListOnScroll,
	updateVirtualListVisibilityRangeData
} from './Virtual-list.handler'
import type {VirtualListBaseProps, VirtualListData, VirtualListState} from './Virtual-list.interface'
import {RenderVirtualList, RenderVirtualListItem} from './Virtual-list.render'

const VirtualListBaseInner = <T,>(
	{
		activeKey,
		data,
		enableAutoSelect,
		extraData,
		focusedIndex,
		gap = 0,
		itemSize = 0,
		loading: rawLoading,
		onClose: rawOnClose,
		onEndReached: rawOnEndReached,
		onEndReachedThreshold = 0.1,
		onLoadEnd: rawOnLoadEnd,
		onMomentumScrollEnd: rawOnMomentumScrollEnd,
		onScroll: rawOnScroll,
		renderItem,
		...renderVirtualListProps
	}: VirtualListBaseProps<T>,
	ref: ForwardedRef<ScrollView>
) => {
	const [
		{
			emptyList: isEmptyList,
			layout,
			loading: isLoading,
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
	const onEndReached = useMemo(() => debounce(rawOnEndReached)(150), [rawOnEndReached])
	const onScroll = useMemo(
		() =>
			throttle(
				updateVirtualListOnScroll({
					itemSize,
					onEndReached,
					onEndReachedThreshold,
					onScroll: rawOnScroll
				})(setState)
			)(50),
		[itemSize, onEndReached, onEndReachedThreshold, rawOnScroll, setState]
	)

	const onMomentumScrollEnd = useMemo(
		() => triggerVirtualListMomentumScrollEnd(rawOnMomentumScrollEnd),
		[rawOnMomentumScrollEnd]
	)

	const onLoadEnd = useMemo(() => checkVirtualListLoadEnd(rawOnLoadEnd)(setState), [rawOnLoadEnd, setState])
	const scrollEvent = useDesktopScrollEvent({onMomentumScrollEnd, onScroll})
	const onUnmount = useMemo(
		() => unmountVirtualList({itemSize, enableAutoSelect, onClose: rawOnClose, activeKey})(setState),
		[activeKey, enableAutoSelect, itemSize, rawOnClose, setState]
	)

	const onLayoutChange = useMemo(() => updateVirtualListLayout(itemSize)(setState), [itemSize, setState])
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
	const runUpdateVisibilityRangeData = useMemo(
		() => updateVirtualListVisibilityRangeData(itemSize)(setState),
		[itemSize, setState]
	)

	const runUpdateData = useMemo(() => updateVirtualListData(setState), [setState])
	const runUpdateLoading = useMemo(
		() => createDeferredHandlerWithState(updateVirtualListLoading)(setState)({debounceMillisecond: 150}),
		[setState]
	)

	const itemElements = useMemo(
		() => (
			<RenderVirtualListItem
				data={visibleRangeData as VirtualListData<T>[]}
				extraData={extraData}
				id={id}
				itemSize={itemSize + gap}
				onLoadEnd={onLoadEnd}
				onUnmount={onUnmount}
				renderItem={renderItem}
				startIndex={startIndex}
			/>
		),
		[extraData, gap, id, itemSize, onLoadEnd, onUnmount, renderItem, startIndex, visibleRangeData]
	)

	useImperativeHandle(ref, () => (animatedRef?.current ?? {}) as ScrollView, [animatedRef])

	useEffect(() => {
		runUpdateData(data)
	}, [runUpdateData, data])

	useEffect(() => {
		runUpdateLoading(rawLoading)
	}, [runUpdateLoading, rawLoading])

	useEffect(() => {
		runUpdateVisibilityRangeData(virtualListData)
	}, [runUpdateVisibilityRangeData, virtualListData])

	useEffect(() => {
		runAfterInteractions(nextScrollEvent)()
	}, [nextScrollEvent])

	useEffect(() => {
		runAfterInteractions(nextCloseEvent)()
	}, [nextCloseEvent])

	if (status === COMPONENT_STATUS.IDLE) {
		return <></>
	}

	return (
		<RenderVirtualList
			{...renderVirtualListProps}
			{...scrollEvent}
			contentAnimatedStyle={contentAnimatedStyle}
			contentSize={contentSize}
			emptyList={isEmptyList}
			id={id}
			interactionHandlers={interactionHandlers}
			itemElements={itemElements}
			itemSize={itemSize}
			layout={layout}
			loading={isLoading}
			ref={animatedRef}
			status={status}
		/>
	)
}

export const VirtualListBase = forwardRef(VirtualListBaseInner) as <T>(
	props: VirtualListBaseProps<T> & {ref?: ForwardedRef<ScrollView>}
) => ReturnType<typeof VirtualListBaseInner>
