import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {debounce} from '../../../utils'
import {
	handleVirtualListItemClose,
	handleVirtualListItemInit,
	handleVirtualListItemUnmount
} from './Virtual-list-item-handle'
import {VirtualListItemBaseProps, VirtualListItemState} from './Virtual-list-item.interface'
import {useVirtualListItemAnimated} from './use-virtual-list-item-animated.hook'

export const VirtualListItemBase = forwardRef<View, VirtualListItemBaseProps>(
	(
		{
			index = 0,
			item,
			itemSize = 0,
			onLoadEnd,
			onUnmount,
			render,
			renderItem,
			startIndex = 0,
			...renderProps
		},
		ref
	) => {
		const [{visible, status}, setState] = useImmer<VirtualListItemState>({visible: true, status: 'idle'})
		const renderIndex = useMemo(() => index + startIndex, [index, startIndex])
		const offsetY = useMemo(() => itemSize * renderIndex, [itemSize, renderIndex])
		const {containerAnimatedStyle} = useVirtualListItemAnimated({offsetY})
		const id = useId()
		const onVirtualListItemInit = useMemo(
			() => debounce(handleVirtualListItemInit(setState))(Math.min(index * 10, 300)),
			[index, setState]
		)

		const onVirtualListItemClose = handleVirtualListItemClose(setState)
		const onVirtualListItemUnmount = handleVirtualListItemUnmount(onUnmount)(item?.indexKey as string)
		const itemElement =
			!item ?
				<></>
			:	renderItem?.({
					index: renderIndex,
					item: {...item, onClose: onVirtualListItemClose, onLoadEnd}
				})

		useEffect(() => {
			onVirtualListItemInit()
		}, [onVirtualListItemInit])

		if (status === 'idle') {
			return <></>
		}

		return render({
			...renderProps,
			containerAnimatedStyle,
			id,
			index,
			itemElement,
			itemSize,
			onUnmount: onVirtualListItemUnmount,
			ref,
			visible
		})
	}
)
