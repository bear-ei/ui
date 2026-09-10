import {typedMemo} from '@/utils'
import type {ForwardedRef} from 'react'
import {forwardRef} from 'react'
import type {ScrollView} from 'react-native'
import {VirtualListBase} from './Virtual-list-base.component'
import type {VirtualListProps} from './Virtual-list.interface'

const VirtualListInner = <T,>(props: VirtualListProps<T>, ref: ForwardedRef<ScrollView>) => (
	<VirtualListBase
		{...props}
		ref={ref}
	/>
)

const VirtualListWithRef = forwardRef(VirtualListInner)
export const VirtualList = typedMemo(VirtualListWithRef)() as <T>(
	props: VirtualListProps<T> & {ref?: ForwardedRef<ScrollView>}
) => ReturnType<typeof VirtualListInner>
