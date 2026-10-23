import type {TextInput as RNTextInput} from 'react-native'

import {forwardRef} from 'react'

import type {SearchProps} from './Search.interface'

import {typedMemo} from '../../utils'
import {SearchBase} from './Search-base.component'

const SearchWithRef = forwardRef<RNTextInput, SearchProps>((props, ref) => (
	<SearchBase
		{...props}
		ref={ref}
	/>
))

export const Search = typedMemo(SearchWithRef)
