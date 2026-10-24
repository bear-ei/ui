import type {ListItemProps} from './List-item.interface'

import {typedMemo} from '../../../utils'
import {ListItemBase} from './List-item-base.component'
import {compareListItemProps} from './List-item.handler'

export const ListItem = typedMemo((props: ListItemProps) => <ListItemBase {...props} />, compareListItemProps)
