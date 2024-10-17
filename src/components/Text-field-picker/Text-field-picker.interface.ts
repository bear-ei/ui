import {DefaultTheme} from 'styled-components/native'
import {ComponentStatus} from '../Common'
import {ListData} from '../List'
import {MenuProps} from '../Menu'
import {TextFieldProps} from '../Text-field/Text-field.interface'

export interface TextFieldPickerProps extends TextFieldProps, Pick<MenuProps, 'defaultVisible' | 'visible' | 'data'> {}
export interface RenderTextFieldPickerProps extends TextFieldPickerProps {
    theme: DefaultTheme
}

export interface TextFieldPickerBaseProps extends TextFieldPickerProps {
    render: (props: RenderTextFieldPickerProps) => JSX.Element
}

export interface TextFieldPickerState {
    data?: ListData[]
    status: ComponentStatus
}
