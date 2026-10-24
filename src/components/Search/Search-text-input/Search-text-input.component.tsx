import type {SearchTextInputProps} from './Search-text-input.interface'

import {typedMemo} from '../../../utils'
import {SearchTextInputBase} from './Search-text-input-base.component'

export const SearchTextInput = typedMemo((props: SearchTextInputProps) => <SearchTextInputBase {...props} />)
