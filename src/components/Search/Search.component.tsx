import {forwardRef} from 'react'
import type {TextInput as RNTextInput} from 'react-native'
import {typedMemo} from '../../utils'
import {SearchBase} from './Search-base.component'
import type {SearchProps} from './Search.interface'

const SearchWithRef = forwardRef<RNTextInput, SearchProps>((props, ref) => (
	<SearchBase
		{...props}
		ref={ref}
	/>
))

export const Search = typedMemo(SearchWithRef)()
