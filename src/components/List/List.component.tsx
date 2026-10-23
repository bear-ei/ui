import type {ScrollView} from 'react-native'

import {forwardRef} from 'react'

import type {ListProps} from './List.interface'

import {typedMemo} from '../../utils'
import {ListBase} from './List-base.component'

const ListWithRef = forwardRef<ScrollView, ListProps>((props, ref) => (
	<ListBase
		{...props}
		ref={ref}
	/>
))

export const List = typedMemo(ListWithRef)
