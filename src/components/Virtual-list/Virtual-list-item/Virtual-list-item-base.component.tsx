import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {createStableHandler, createStableHandlerWithState} from '../../../utils'
import {COMPONENT_STATUS} from '../../Common'
import {useVirtualListItemAnimated} from './use-virtual-list-item-animated.hook'
import {
	triggerVirtualListItemClose,
	triggerVirtualListItemUnmount,
	updateVirtualListItemStatus
} from './Virtual-list-item.handle'
import type {VirtualListItemBaseProps, VirtualListItemState} from './Virtual-list-item.interface'

export const VirtualListItemBase = forwardRef<View, VirtualListItemBaseProps>(
	(
		{
			index = 0,
			item,
			itemSize = 0,
			onLoadEnd,
			onUnmount: rawOnUnmount,
			renderItem,
			renderVirtualListItem,
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
		const runUpdateVirtualListItemStatus = useMemo(
			() => createStableHandlerWithState(updateVirtualListItemStatus)(setState)(),
			[setState]
		)

		const onClose = useMemo(
			() => createStableHandlerWithState(triggerVirtualListItemClose)(setState)(),
			[setState]
		)

		const onUnmount = useMemo(
			() =>
				createStableHandler(
					triggerVirtualListItemUnmount(rawOnUnmount)(item?.indexKey as string)
				)(),
			[item?.indexKey, rawOnUnmount]
		)

		const {containerAnimatedStyle} = useVirtualListItemAnimated({offsetY})
		const itemElement = useMemo(
			() =>
				!item ?
					<></>
				:	renderItem?.({
						index: renderIndex,
						item: {...item, onClose, onLoadEnd}
					}),
			[item, onClose, onLoadEnd, renderIndex, renderItem]
		)

		useEffect(() => {
			runUpdateVirtualListItemStatus()
		}, [runUpdateVirtualListItemStatus])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return renderVirtualListItem({
			...renderVirtualListItemProps,
			containerAnimatedStyle,
			id,
			index,
			itemElement,
			itemSize,
			onUnmount,
			ref,
			visible: isVisible
		})
	}
)
