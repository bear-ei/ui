import {forwardRef, useId} from 'react'
import {TextInput} from 'react-native'
import {useTheme} from 'styled-components/native'
import {RenderTextFieldPickerProps, TextFieldPickerBaseProps} from './Text-field-picker.interface'

export const TextFieldPickerBase = forwardRef<TextInput, TextFieldPickerBaseProps>(({render, ...renderProps}, ref) => {
    const id = useId()
    const theme = useTheme()

    return render({...renderProps, theme, id, ref: ref as RenderTextFieldPickerProps['ref']})
})
