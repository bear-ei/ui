import {forwardRef} from 'react'
import {typedMemo} from '../../utils'
import {ListBase} from './List-base.component'
import type {ListData, ListProps, VirtualListComponent} from './List.interface'

const ListWithRef = forwardRef<VirtualListComponent<ListData>, ListProps>((props, ref) => (
	<ListBase
		{...props}
		ref={ref}
	/>
))

export const List = typedMemo(ListWithRef)()
