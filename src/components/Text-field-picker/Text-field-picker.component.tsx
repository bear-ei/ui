import {FC, forwardRef} from 'react'
import {TextInput} from 'react-native'
import {TextField} from '../Text-field'
import {TextFieldPickerBase} from './Text-field-picker-base.component'
import {RenderTextFieldPickerProps, TextFieldPickerProps} from './Text-field-picker.interface'
import {Container} from './Text-field-picker.styles'

const render = ({id, ...textFieldProps}: RenderTextFieldPickerProps) => {
    return (
        <Container testID={`Text-field-picker--${id}`}>
            <TextField {...textFieldProps} />

            {/* < grid;></> */}
        </Container>
    )
}

const ForwardRefTextFieldPicker = forwardRef<TextInput, TextFieldPickerProps>((props, ref) => (
    <TextFieldPickerBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const TextFieldPicker: FC<TextFieldPickerProps> = ForwardRefTextFieldPicker
