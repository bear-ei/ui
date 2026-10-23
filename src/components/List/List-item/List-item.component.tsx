import {forwardRef} from 'react'

import type {ListItemProps, ListItemRef} from './List-item.interface'

import {typedMemo} from '../../../utils'
import {ListItemBase} from './List-item-base.component'
import {compareListItemProps} from './List-item.handler'

const ListItemWithRef = forwardRef<ListItemRef, ListItemProps>((props, ref) => (
	<ListItemBase
		{...props}
		ref={ref}
	/>
))

export const ListItem = typedMemo(ListItemWithRef, compareListItemProps)
