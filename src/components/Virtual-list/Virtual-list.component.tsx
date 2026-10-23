import type {VirtualListProps} from './Virtual-list.interface'

import {typedMemo} from '../../utils'
import {VirtualListBase} from './Virtual-list-base.component'

const VirtualListComponent = <T,>(props: VirtualListProps<T>) => <VirtualListBase {...props} />
export const VirtualList = typedMemo(VirtualListComponent) as <T>(
	props: VirtualListProps<T>
) => ReturnType<typeof VirtualListComponent>
