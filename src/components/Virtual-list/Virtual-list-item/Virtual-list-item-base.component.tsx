import {forwardRef, useEffect, useId, useMemo, useRef} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {useClearComponentEvent} from '../../../hooks'
import {runAfterInteractions} from '../../../utils'
import {COMPONENT_STATUS} from '../../Common'
import type {DragRef} from '../../Drag'
import {useVirtualListItemAnimated} from './use-virtual-list-item-animated.hook'
import {
	handleVirtualListItemDragEnd,
	handleVirtualListItemDragStart,
	handleVirtualListItemDragUpdate,
	triggerVirtualListItemClose,
	triggerVirtualListItemUnmount,
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
			onDragEnd: rawOnDragEnd,
			onDragUpdate: rawOnDragUpdate,
			onLoadEnd,
			onUnmount: rawOnUnmount,
			renderItem,
			...renderVirtualListItemProps
		},
		ref
	) => {
		const [{visible: isVisible, status, dragging: isDragging, nextDragEndEvent, index}, setState] =
			useImmer<VirtualListItemState>({visible: true, status: COMPONENT_STATUS.IDLE})

		useClearComponentEvent(setState)

		const id = useId()
		const {index: rawIndex = 0, indexKey} = item ?? {}
		const dragRef = useRef<DragRef>(null)
		const offset = itemSize * (index ?? rawIndex)
		const onDragUpdate = useMemo(
			() => handleVirtualListItemDragUpdate(rawOnDragUpdate)(indexKey),
			[indexKey, rawOnDragUpdate]
		)

		const onClose = useMemo(() => triggerVirtualListItemClose(setState), [setState])
		const onDragEnd = useMemo(
			() => handleVirtualListItemDragEnd({onDragEnd: rawOnDragEnd, indexKey, dragRef})(setState),
			[indexKey, rawOnDragEnd, setState]
		)

		const onDragStart = useMemo(() => handleVirtualListItemDragStart(setState), [setState])
		const onUnmount = useMemo(
			() => triggerVirtualListItemUnmount(rawOnUnmount)(indexKey),
			[indexKey, rawOnUnmount]
		)

		const {containerAnimatedStyle} = useVirtualListItemAnimated({
			dragging: isDragging,
			layoutType,
			offset,
			status
		})

		const runUpdateIndex = useMemo(
			() => updateVirtualListItemIndex(isDragging)(setState),
			[isDragging, setState]
		)

		const runUpdateStatus = useMemo(() => updateVirtualListItemStatus(setState), [setState])
		const itemElement = !item ? <></> : renderItem?.({item: {...item, onClose, onLoadEnd}})

		useEffect(() => {
			runUpdateIndex(rawIndex)
		}, [rawIndex, runUpdateIndex])

		useEffect(() => {
			runUpdateStatus()
		}, [runUpdateStatus])

		useEffect(() => {
			runAfterInteractions(nextDragEndEvent)()
		}, [nextDragEndEvent])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return (
			<RenderVirtualListItem
				{...renderVirtualListItemProps}
				containerAnimatedStyle={containerAnimatedStyle}
				dragging={isDragging}
				dragRef={dragRef}
				id={id}
				index={index}
				itemElement={itemElement}
				itemSize={itemSize}
				layoutType={layoutType}
				offset={offset}
				onDragEnd={onDragEnd}
				onDragStart={onDragStart}
				onDragUpdate={onDragUpdate}
				onUnmount={onUnmount}
				ref={ref}
				visible={isVisible}
			/>
		)
	}
)
