import {DefaultTheme} from 'styled-components/native'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {ComponentStatus, EventName} from '../Common'
import {ListData} from '../List'
import {MenuProps} from '../Menu'
import {TextFieldProps} from '../Text-field/Text-field.interface'

export interface TextFieldPickerProps extends TextFieldProps, Pick<MenuProps, 'defaultVisible' | 'visible' | 'data'> {}
export interface RenderTextFieldPickerProps extends TextFieldPickerProps {
    eventName?: EventName
    onStateEvent: OnStateEvent
    theme: DefaultTheme
}

export interface TextFieldPickerBaseProps extends TextFieldPickerProps {
    render: (props: RenderTextFieldPickerProps) => JSX.Element
}

export interface TextFieldPickerState {
    data?: ListData[]
    eventName?: EventName
    status: ComponentStatus
}

export type HandleTextFieldPickerStateChangeOptions = OnStateEventChangeOptions
