import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {createStableHandlerWithState} from '../../../utils'
import {COMPONENT_STATUS} from '../../Common'
import {useVirtualListItemAnimated} from './use-virtual-list-item-animated.hook'
import {
	closeVirtualListItem,
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
			onUnmount,
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
		const runUpdateVirtualListItemStatusEffect = useMemo(
			() =>
				createStableHandlerWithState(updateVirtualListItemStatus)(setState)({
					debounceMillisecond: Math.min(index * 10, 300)
				}),
			[index, setState]
		)

		const onVirtualListItemClose = useMemo(
			() => createStableHandlerWithState(closeVirtualListItem)(setState)(),
			[setState]
		)

		const onVirtualListItemUnmount = useMemo(
			() =>
				createStableHandlerWithState(
					triggerVirtualListItemUnmount(onUnmount)(item?.indexKey as string)
				)(),
			[item?.indexKey, onUnmount]
		)

		const {containerAnimatedStyle} = useVirtualListItemAnimated({offsetY})
		const itemElement = useMemo(
			() =>
				!item ?
					<></>
				:	renderItem?.({
						index: renderIndex,
						item: {...item, onClose: onVirtualListItemClose, onLoadEnd}
					}),
			[item, onLoadEnd, onVirtualListItemClose, renderIndex, renderItem]
		)

		useEffect(() => {
			runUpdateVirtualListItemStatusEffect()
		}, [runUpdateVirtualListItemStatusEffect])

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
			onUnmount: onVirtualListItemUnmount,
			ref,
			visible: isVisible
		})
	}
)
