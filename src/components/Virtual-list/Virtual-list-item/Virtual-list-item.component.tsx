import {forwardRef, memo} from 'react'
import type {View} from 'react-native'
import {VirtualListItemBase} from './Virtual-list-item-base.component'
import {handleVirtualListItemPropsEqual} from './Virtual-list-item-handle'
import type {VirtualListItemProps} from './Virtual-list-item.interface'
import {renderVirtualListItem} from './Virtual-list-item.render'

const VirtualListItemWithRef = forwardRef<View, VirtualListItemProps>((props, ref) => (
	<VirtualListItemBase
		{...props}
		ref={ref}
		renderVirtualListItem={renderVirtualListItem}
	/>
))

export const VirtualListItem = memo(VirtualListItemWithRef, (prevProps, nextProps) =>
	handleVirtualListItemPropsEqual(prevProps)(nextProps)
) as typeof VirtualListItemWithRef
