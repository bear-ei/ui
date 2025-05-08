import {forwardRef} from 'react'
import type {TextInput as RNTextInput} from 'react-native'
import {TextInputBase} from './Text-input-base.component'
import type {TextInputProps} from './Text-input.interface'
import {renderTextInput} from './Text-input.render'

const TextInputWithRef = forwardRef<RNTextInput, TextInputProps>((props, ref) => (
	<TextInputBase
		{...props}
		ref={ref}
		renderTextInput={renderTextInput}
	/>
))

export const TextInput = TextInputWithRef
