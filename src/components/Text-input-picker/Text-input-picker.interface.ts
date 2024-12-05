import React from 'react'
import {GestureResponderEvent, NativeSyntheticEvent, TargetedEvent} from 'react-native'
import {DefaultTheme} from 'styled-components/native'
import {Updater} from 'use-immer'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {ComponentStatus, EventName} from '../Common'
import {ListData} from '../List'
import {MenuProps} from '../Menu'
import {TextInputProps} from '../Text-input/Text-input.interface'

export interface TextInputPickerProps
        extends TextInputProps,
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

export interface RenderTextInputPickerProps extends TextInputPickerProps {
        contentElements?: React.ReactNode
        eventName?: EventName
        keyCode?: string
        menuVisible?: boolean
        onMenuFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void
        onMenuVisible: (value?: boolean) => void
        onStateEvent: OnStateEvent
        theme: DefaultTheme
}

export interface TextInputPickerBaseProps extends TextInputPickerProps {
        render: (props: RenderTextInputPickerProps) => JSX.Element
}

export interface TextInputPickerState {
        activeKey?: string
        activeKeys?: string[]
        data?: ListData[]
        defaultActiveKey?: string
        defaultActiveKeys?: string[]
        eventName?: EventName
        keyCode?: string
        menuVisible?: boolean
        nextBlurEvent?: () => void
        status: ComponentStatus
        value?: string
}

export type HandleTextInputPickerInitOptions = Pick<
        TextInputPickerProps,
        'data' | 'activeKey' | 'activeKeys' | 'defaultActiveKey' | 'defaultActiveKeys'
>

export type HandleTextInputPickerStateChangeOptions = OnStateEventChangeOptions
export interface HandleTextInputPickerMenuVisibleOptions extends Pick<TextInputPickerProps, 'data'> {
        setState: Updater<TextInputPickerState>
}

export interface RenderTextInputPickerContentOptions extends Pick<TextInputPickerProps, 'data'> {
        activeKeys?: string[]
        id: string
        onClose?: (value: string) => void
        onPressOut?: (event: GestureResponderEvent) => void
}
