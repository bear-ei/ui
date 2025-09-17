import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../../utils'
import {COMPONENT_STATUS} from '../../Common'
import {useVirtualListItemAnimated} from './use-virtual-list-item-animated.hook'
import {
	handleVirtualListItemDragEnd,
	handleVirtualListItemDragStart,
	handleVirtualListItemDragUpdate,
	triggerVirtualListItemClose,
	triggerVirtualListItemUnmount,
	updateVirtualListItemStatus
} from './Virtual-list-item.handler'
import type {VirtualListItemBaseProps, VirtualListItemState} from './Virtual-list-item.interface'
import {RenderVirtualListItem} from './Virtual-list-item.render'

export const VirtualListItemBase = forwardRef<View, VirtualListItemBaseProps>(
	(
		{
			item,
			itemSize = 0,
			layout,
			onDragEnd: rawOnDragEnd,
			onDragUpdate: rawOnDragUpdate,
			onLoadEnd,
			onUnmount: rawOnUnmount,
			renderItem,
			...renderVirtualListItemProps
		},
		ref
	) => {
		const [{visible: isVisible, status, dragging: isDragging, nextDragEndEvent}, setState] =
			useImmer<VirtualListItemState>({
				visible: true,
				status: COMPONENT_STATUS.IDLE
			})

		const id = useId()
		const {index = 0, indexKey} = item ?? {}
		const offset = itemSize * index
		const onDragUpdate = useMemo(
			() => handleVirtualListItemDragUpdate(rawOnDragUpdate)(indexKey),
			[indexKey, rawOnDragUpdate]
		)

		const onClose = useMemo(() => triggerVirtualListItemClose(setState), [setState])
		const onDragEnd = useMemo(
			() => handleVirtualListItemDragEnd({onDragEnd: rawOnDragEnd, indexKey})(setState),
			[indexKey, rawOnDragEnd, setState]
		)

		const onDragStart = useMemo(() => handleVirtualListItemDragStart(setState), [setState])
		const onUnmount = useMemo(
			() => triggerVirtualListItemUnmount(rawOnUnmount)(indexKey),
			[indexKey, rawOnUnmount]
		)

		const {containerAnimatedStyle} = useVirtualListItemAnimated({
			dragging: isDragging,
			layout,
			offset,
			status
		})

		const runUpdateStatus = useMemo(() => updateVirtualListItemStatus(setState), [setState])
		const itemElement = !item ? <></> : renderItem?.({item: {...item, onClose, onLoadEnd}})

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
				id={id}
				index={index}
				itemElement={itemElement}
				itemSize={itemSize}
				layout={layout}
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
