import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../../utils'
import {VirtualListItemBase} from './Virtual-list-item-base.component'
import {compareVirtualListItemProps} from './Virtual-list-item.handle'
import type {VirtualListItemProps} from './Virtual-list-item.interface'
import {renderVirtualListItem} from './Virtual-list-item.render'

const VirtualListItemWithRef = forwardRef<View, VirtualListItemProps>((props, ref) => (
	<VirtualListItemBase
		{...props}
		ref={ref}
		renderVirtualListItem={renderVirtualListItem}
	/>
))

export const VirtualListItem = typedMemo(VirtualListItemWithRef)((prevProps, nextProps) =>
	compareVirtualListItemProps(prevProps)(nextProps)
)
