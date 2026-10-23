import type {VirtualListProps} from './Virtual-list.interface'

import {typedMemo} from '../../utils'
import {VirtualListBase} from './Virtual-list-base.component'

const VirtualListInner = <T,>(props: VirtualListProps<T>) => <VirtualListBase {...props} />

export const VirtualList = typedMemo(VirtualListInner) as <T>(
	props: VirtualListProps<T>
) => ReturnType<typeof VirtualListInner>
