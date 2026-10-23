import type {VirtualListItemProps} from './Virtual-list-item.interface'

import {typedMemo} from '../../../utils'
import {VirtualListItemBase} from './Virtual-list-item-base.component'
import {compareVirtualListItemProps} from './Virtual-list-item.handler'

export const VirtualListItem = typedMemo(
	(props: VirtualListItemProps) => <VirtualListItemBase {...props} />,
	compareVirtualListItemProps
)
