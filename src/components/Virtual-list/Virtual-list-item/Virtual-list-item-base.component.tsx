import {forwardRef, useEffect, useId, useMemo, useRef} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {useClearComponentEvent} from '../../../hooks'
import {COMPONENT_STATUS} from '../../Common'
import type {DragRef} from '../../Drag'
import {useVirtualListItemAnimated} from './use-virtual-list-item-animated.hook'
import {
	handleVirtualListItemAnimationFinished,
	handleVirtualListItemDragEnd,
	handleVirtualListItemDragStart,
	handleVirtualListItemDragUpdate,
	triggerVirtualListItemClose,
	updateVirtualListItemIndex,
	updateVirtualListItemStatus
} from './Virtual-list-item.handler'
import type {VirtualListItemBaseProps, VirtualListItemState} from './Virtual-list-item.interface'
import {RenderVirtualListItem} from './Virtual-list-item.render'

export const VirtualListItemBase = forwardRef<View, VirtualListItemBaseProps>(
	(
		{
			item,
			itemSize = 0,
			layoutType,
			onClose: rawOnClose,
			onDragEnd: rawOnDragEnd,
			onDragStart: rawOnDragStart,
			onDragUpdate: rawOnDragUpdate,
			onLoadEnd,
			renderItem,
			scrollOffset = 0,
			...renderVirtualListItemProps
		},
		ref
	) => {
		const [{dragging: isDragging, index, nextDragEndEvent, nextDragStartEvent, status, zIndex}, setState] =
			useImmer<VirtualListItemState>({status: COMPONENT_STATUS.IDLE, zIndex: 0})

		useClearComponentEvent(setState)

		const id = useId()
		const {index: rawIndex = 0, indexKey} = item ?? {}
		const dragRef = useRef<DragRef>(null)
		const offset = itemSize * (index ?? rawIndex)
		const dragOffset = offset - scrollOffset
		const onDragUpdate = useMemo(
			() => handleVirtualListItemDragUpdate(rawOnDragUpdate)(indexKey),
			[indexKey, rawOnDragUpdate]
		)

		const onDragStart = useMemo(
			() => handleVirtualListItemDragStart({onDragStart: rawOnDragStart, indexKey})(setState),
			[indexKey, rawOnDragStart, setState]
		)

		const onDragEnd = useMemo(
			() => handleVirtualListItemDragEnd({onDragEnd: rawOnDragEnd, indexKey, dragRef})(setState),
			[indexKey, rawOnDragEnd, setState]
		)

		const onClose = useMemo(() => triggerVirtualListItemClose(rawOnClose)(indexKey), [indexKey, rawOnClose])
		const onAnimationFinished = useMemo(() => handleVirtualListItemAnimationFinished(setState), [setState])
		const {containerAnimatedStyle} = useVirtualListItemAnimated({
			dragging: isDragging,
			layoutType,
			offset,
			onAnimationFinished,
			status
		})

		const runUpdateIndex = useMemo(
			() => updateVirtualListItemIndex(isDragging)(setState),
			[isDragging, setState]
		)

		const runUpdateStatus = useMemo(() => updateVirtualListItemStatus(setState), [setState])
		const itemElement =
			!item ? <></> : renderItem?.({item: {...item, onClose, onLoadEnd, dragging: isDragging}})

		useEffect(() => {
			runUpdateIndex(rawIndex)
		}, [rawIndex, runUpdateIndex])

		useEffect(() => {
			runUpdateStatus()
		}, [runUpdateStatus])

		useEffect(() => {
			nextDragStartEvent?.()
		}, [nextDragStartEvent])

		useEffect(() => {
			nextDragEndEvent?.()
		}, [nextDragEndEvent])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return (
			<RenderVirtualListItem
				{...renderVirtualListItemProps}
				containerAnimatedStyle={containerAnimatedStyle}
				dragging={isDragging}
				dragOffset={dragOffset}
				dragRef={dragRef}
				id={id}
				index={index}
				itemElement={itemElement}
				itemSize={itemSize}
				layoutType={layoutType}
				onDragEnd={onDragEnd}
				onDragStart={onDragStart}
				onDragUpdate={onDragUpdate}
				ref={ref}
				zIndex={zIndex}
			/>
		)
	}
)
