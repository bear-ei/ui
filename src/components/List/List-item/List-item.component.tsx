import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import {ListItemBase} from './List-item-base.component'
import {compareListItemProps} from './List-item.handler'
import type {ListItemProps, ListItemRef} from './List-item.interface'

const ListItemWithRef = forwardRef<ListItemRef, ListItemProps>((props, ref) => (
    <ListItemBase
        {...props}
        ref={ref}
    />
))

ListItemWithRef.displayName = 'ListItemWithRef'

export const ListItem = typedMemo(ListItemWithRef)((prevProps, nextProps) => compareListItemProps(prevProps)(nextProps))
