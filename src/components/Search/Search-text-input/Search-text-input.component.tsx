import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {TextInput as RNTextInput} from 'react-native'
import {SearchTextInputBase} from './Search-text-input-base.component'
import type {SearchTextInputProps} from './Search-text-input.interface'

const SearchTextInputWithRef = forwardRef<RNTextInput, SearchTextInputProps>((props, ref) => (
    <SearchTextInputBase
        {...props}
        ref={ref}
    />
))

SearchTextInputWithRef.displayName = 'SearchTextInputWithRef'

export const SearchTextInput = typedMemo(SearchTextInputWithRef)()
