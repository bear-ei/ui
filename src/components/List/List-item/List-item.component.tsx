import {forwardRef} from 'react'
import type {Pressable} from 'react-native'
import {typedMemo} from '../../../utils'
import {ListItemBase} from './List-item-base.component'
import {compareListItemProps} from './List-item.handler'
import type {ListItemProps} from './List-item.interface'

const ListItemWithRef = forwardRef<typeof Pressable, ListItemProps>((props, ref) => (
	<ListItemBase
		{...props}
		ref={ref}
	/>
))

export const ListItem = typedMemo(ListItemWithRef)((prevProps, nextProps) => compareListItemProps(prevProps)(nextProps))
