import type {TextInput as RNTextInput} from 'react-native'

import {forwardRef} from 'react'

import type {SearchTextInputProps} from './Search-text-input.interface'

import {typedMemo} from '../../../utils'
import {SearchTextInputBase} from './Search-text-input-base.component'

const SearchTextInputWithRef = forwardRef<RNTextInput, SearchTextInputProps>((props, ref) => (
	<SearchTextInputBase
		{...props}
		ref={ref}
	/>
))

export const SearchTextInput = typedMemo(SearchTextInputWithRef)
