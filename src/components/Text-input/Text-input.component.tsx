import type {TextInputProps} from './Text-input.interface'

import {typedMemo} from '../../utils'
import {TextInputBase} from './Text-input-base.component'

export const TextInput = typedMemo((props: TextInputProps) => <TextInputBase {...props} />)
