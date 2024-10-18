import React from 'react'
import {DefaultTheme} from 'styled-components/native'
import {Updater} from 'use-immer'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {ComponentStatus, EventName} from '../Common'
import {ListData} from '../List'
import {MenuProps} from '../Menu'
import {TextFieldProps} from '../Text-field/Text-field.interface'

export interface TextFieldPickerProps
    extends TextFieldProps,
        Pick<
            MenuProps,
            | 'activeKey'
            | 'activeKeys'
            | 'data'
            | 'defaultActiveKey'
            | 'defaultActiveKeys'
            | 'defaultVisible'
            | 'multiple'
            | 'onActive'
            | 'onActives'
            | 'visible'
        > {}

export interface RenderTextFieldPickerProps extends TextFieldPickerProps {
    contentElements?: React.ReactNode
    eventName?: EventName
    menuVisible?: boolean
    onMenuVisible: (value?: boolean) => void
    onStateEvent: OnStateEvent
    theme: DefaultTheme
}

export interface TextFieldPickerBaseProps extends TextFieldPickerProps {
    render: (props: RenderTextFieldPickerProps) => JSX.Element
}

export interface TextFieldPickerState {
    activeKey?: string
    activeKeys?: string[]
    data?: ListData[]
    defaultActiveKey?: string
    defaultActiveKeys?: string[]
    eventName?: EventName
    menuVisible?: boolean
    nextBlurEvent?: () => void
    status: ComponentStatus
    value?: string
}

export type HandleTextFieldPickerInitOptions = Pick<
    TextFieldPickerProps,
    'data' | 'activeKey' | 'activeKeys' | 'defaultActiveKey' | 'defaultActiveKeys'
>

export type HandleTextFieldPickerStateChangeOptions = OnStateEventChangeOptions
export interface HandleTextFieldPickerMenuVisibleOptions extends Pick<TextFieldPickerProps, 'data'> {
    setState: Updater<TextFieldPickerState>
}

export interface RenderContentOptions extends Pick<TextFieldPickerProps, 'data'> {
    activeKeys?: string[]
    id: string
    onClose?: (value: string) => void
}
