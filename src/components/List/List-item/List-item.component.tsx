import {forwardRef} from 'react'
import {typedMemo} from '../../../utils'
import type {PressableType} from '../../Touchable'
import {ListItemBase} from './List-item-base.component'
import {compareListItemProps} from './List-item.handler'
import type {ListItemProps} from './List-item.interface'

const ListItemWithRef = forwardRef<PressableType, ListItemProps>((props, ref) => (
	<ListItemBase
		{...props}
		ref={ref}
	/>
))

export const ListItem = typedMemo(ListItemWithRef)((prevProps, nextProps) => compareListItemProps(prevProps)(nextProps))
