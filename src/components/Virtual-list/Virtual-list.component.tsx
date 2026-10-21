import type {Ref} from 'react'
import {forwardRef} from 'react'
import type {ScrollView} from 'react-native'

import {typedMemo} from '../../utils'

import {VirtualListBase} from './Virtual-list-base.component'
import type {VirtualListProps} from './Virtual-list.interface'

const VirtualListInner = <T,>(props: VirtualListProps<T>, ref: Ref<ScrollView>) => (
	<VirtualListBase
		{...props}
		ref={ref}
	/>
)

const VirtualListWithRef = forwardRef(VirtualListInner)

VirtualListWithRef.displayName = 'VirtualList'

export const VirtualList = typedMemo(VirtualListWithRef) as <T>(
	props: VirtualListProps<T> & {ref?: Ref<ScrollView>}
) => ReturnType<typeof VirtualListInner>
