import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {COMPONENT_STATUS} from '../../Common'
import {useVirtualListItemAnimated} from './use-virtual-list-item-animated.hook'
import {
	triggerVirtualListItemClose,
	triggerVirtualListItemUnmount,
	updateVirtualListItemStatus
} from './Virtual-list-item.handler'
import type {VirtualListItemBaseProps, VirtualListItemState} from './Virtual-list-item.interface'
import {RenderVirtualListItem} from './Virtual-list-item.render'

export const VirtualListItemBase = forwardRef<View, VirtualListItemBaseProps>(
	(
		{
			index = 0,
			item,
			itemSize = 0,
			onLoadEnd,
			onUnmount: rawOnUnmount,
			renderItem,
			startIndex = 0,
			...renderVirtualListItemProps
		},
		ref
	) => {
		const [{visible: isVisible, status}, setState] = useImmer<VirtualListItemState>({
			visible: true,
			status: COMPONENT_STATUS.IDLE
		})

		const id = useId()
		const renderIndex = index + startIndex
		const offsetY = itemSize * renderIndex
		const onClose = useMemo(() => triggerVirtualListItemClose(setState), [setState])
		const onUnmount = useMemo(
			() => triggerVirtualListItemUnmount(rawOnUnmount)(item?.indexKey as string),
			[item?.indexKey, rawOnUnmount]
		)

		const {containerAnimatedStyle} = useVirtualListItemAnimated({offsetY, status})
		const runUpdateStatus = useMemo(() => updateVirtualListItemStatus(setState), [setState])
		const itemElement =
			!item ?
				<></>
			:	renderItem?.({
					index: renderIndex,
					item: {...item, onClose, onLoadEnd}
				})

		useEffect(() => {
			runUpdateStatus()
		}, [runUpdateStatus])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return (
			<RenderVirtualListItem
				{...renderVirtualListItemProps}
				containerAnimatedStyle={containerAnimatedStyle}
				id={id}
				index={index}
				itemElement={itemElement}
				itemSize={itemSize}
				onUnmount={onUnmount}
				ref={ref}
				visible={isVisible}
			/>
		)
	}
)
