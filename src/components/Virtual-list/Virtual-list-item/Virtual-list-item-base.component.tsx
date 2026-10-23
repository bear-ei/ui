import {useEffect, useId, useMemo, useRef, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {DragRef} from '../../Drag'
import type {VirtualListItemBaseProps, VirtualListItemState} from './Virtual-list-item.interface'

import {COMPONENT_STATUS} from '../../../constants'
import {usePendingEvent} from '../../../hooks'
import {useVirtualListItemAnimated} from './use-virtual-list-item-animated.hook'
import {
	handleVirtualListItemAnimationFinished,
	handleVirtualListItemDragEnd,
	handleVirtualListItemDragStart,
	handleVirtualListItemDragUpdate,
	updateVirtualListItemIndex,
	updateVirtualListItemStatus
} from './Virtual-list-item.handler'
import {RenderVirtualListItem} from './Virtual-list-item.render'

export const VirtualListItemBase: FC<VirtualListItemBaseProps> = ({
	item,
	itemSize = 0,
	layoutType,
	onClose,
	onDragEnd: rawOnDragEnd,
	onDragStart: rawOnDragStart,
	onDragUpdate: rawOnDragUpdate,
	onLoadEnd,
	renderItem,
	scrollOffset = 0,
	...renderVirtualListItemProps
}) => {
	const [{dragging: isDragging, index, pendingDragEndEvent, pendingDragStartEvent, status, zIndex}, setState] =
		useImmer<VirtualListItemState>({status: COMPONENT_STATUS.IDLE, zIndex: 0})

	usePendingEvent('pendingDragStartEvent', rawOnDragStart, {pendingEvent: pendingDragStartEvent, setState})
	usePendingEvent('pendingDragEndEvent', rawOnDragEnd, {pendingEvent: pendingDragEndEvent, setState})

	const id = useId()
	const {index: rawIndex = 0, indexKey} = item
	const dragRef = useRef<DragRef>(null)
	const offset = itemSize * (index ?? rawIndex)
	const dragOffset = offset - scrollOffset
	const onDragUpdate = useMemo(
		() => handleVirtualListItemDragUpdate(indexKey, rawOnDragUpdate),
		[indexKey, rawOnDragUpdate]
	)

	const onDragStart = useMemo(
		() => handleVirtualListItemDragStart(indexKey, setState, {onDragStart: rawOnDragStart}),
		[indexKey, rawOnDragStart, setState]
	)

	const onDragEnd = useMemo(
		() => handleVirtualListItemDragEnd(indexKey, setState, {dragRef, onDragEnd: rawOnDragEnd}),
		[indexKey, rawOnDragEnd, setState]
	)

	const onAnimationFinished = useMemo(() => handleVirtualListItemAnimationFinished(setState), [setState])
	const {containerAnimatedStyle} = useVirtualListItemAnimated({
		dragging: isDragging,
		layoutType,
		offset,
		onAnimationFinished,
		status
	})

	const runUpdateIndex = useMemo(() => updateVirtualListItemIndex(setState, isDragging), [isDragging, setState])
	const runUpdateStatus = useMemo(() => updateVirtualListItemStatus(setState), [setState])
	const itemElement = renderItem?.({item: {...item, onClose, onLoadEnd}})

	useEffect(() => {
		runUpdateIndex(rawIndex)
	}, [rawIndex, runUpdateIndex])

	useEffect(() => {
		runUpdateStatus()
	}, [runUpdateStatus])

	return (
		<RenderVirtualListItem
			{...renderVirtualListItemProps}
			containerAnimatedStyle={containerAnimatedStyle}
			dragging={isDragging}
			dragOffset={dragOffset}
			dragRef={dragRef}
			id={id}
			itemElement={itemElement}
			itemSize={itemSize}
			layoutType={layoutType}
			onDragEnd={onDragEnd}
			onDragStart={onDragStart}
			onDragUpdate={onDragUpdate}
			zIndex={zIndex}
		/>
	)
}


