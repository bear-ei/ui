import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../../utils'
import {ListItemBase} from './List-item-base.component'
import {handleListItemPropsEqual} from './List-item-handle'
import type {ListItemProps} from './List-item.interface'
import {renderListItem} from './List-item.render'

const ListItemWithRef = forwardRef<View, ListItemProps>((props, ref) => (
	<ListItemBase
		{...props}
		ref={ref}
		renderListItem={renderListItem}
	/>
))

export const ListItem = typedMemo(ListItemWithRef)((prevProps, nextProps) =>
	handleListItemPropsEqual(prevProps)(nextProps)
)
