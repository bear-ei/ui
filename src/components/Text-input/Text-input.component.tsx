import {forwardRef} from 'react'
import type {TextInput as RNTextInput} from 'react-native'
import {typedMemo} from '../../utils'
import {TextInputBase} from './Text-input-base.component'
import type {TextInputProps} from './Text-input.interface'

const TextInputWithRef = forwardRef<RNTextInput, TextInputProps>((props, ref) => (
	<TextInputBase
		{...props}
		ref={ref}
	/>
))

export const TextInput = typedMemo(TextInputWithRef)()
