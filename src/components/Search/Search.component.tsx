import {forwardRef} from 'react'
import type {TextInput as RNTextInput} from 'react-native'
import {SearchBase} from './Search-base.component'
import type {SearchProps} from './Search.interface'
import {renderSearch} from './Search.render'

const SearchWithRef = forwardRef<RNTextInput, SearchProps>((props, ref) => (
	<SearchBase
		{...props}
		ref={ref}
		renderSearch={renderSearch}
	/>
))

export const Search = SearchWithRef
