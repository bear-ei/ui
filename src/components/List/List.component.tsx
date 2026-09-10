import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {ScrollView} from 'react-native'
import {ListBase} from './List-base.component'
import type {ListProps} from './List.interface'

const ListWithRef = forwardRef<ScrollView, ListProps>((props, ref) => (
	<ListBase
		{...props}
		ref={ref}
	/>
))

ListWithRef.displayName = 'ListWithRef'

export const List = typedMemo(ListWithRef)()
