import {RefAttributes, RefObject} from 'react'
import {LayoutRectangle, PressableProps, TextInput, TextInputProps, View} from 'react-native'
import {DefaultTheme} from 'styled-components/native'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {ComponentStatus, EventName, Size, State} from '../Common'
import {ListData, ListProps} from '../List'
import {SearchListProps} from './Search-list'

export interface SearchTextInputProps extends TextInputProps, RefAttributes<TextInput> {
        enableFocusRing?: boolean
}

export interface SearchProps
        extends Partial<TextInputProps & PressableProps & RefAttributes<TextInput> & OnStateEvent> {
        disabled?: boolean
        leading?: JSX.Element
        listProps?: ListProps
        size?: Size
        trailing?: JSX.Element
        type?: 'modal'
}

export interface RenderSearchProps extends SearchProps {
        containerRef: RefObject<View>
        eventName?: EventName
        layout: LayoutRectangle & {pageX?: number; pageY?: number}
        listVisible?: boolean
        onStateEvent: OnStateEvent
        theme: DefaultTheme
}

export interface SearchBaseProps extends SearchProps {
        render: (props: RenderSearchProps) => JSX.Element
}

export interface SearchState {
        data?: ListData[]
        eventName?: EventName
        layout: LayoutRectangle & {pageX?: number; pageY?: number}
        listVisible?: boolean
        nextChangeTextEvent?: () => void
        nextPressOutEvent?: () => void
        value?: string
        state: State
        status: ComponentStatus
}

export type HandleSearchChangeTextOptions = Pick<RenderSearchProps, 'onChangeText'> & Pick<SearchListProps, 'data'>
export interface HandleSearchStateChangeOptions extends OnStateEventChangeOptions {
        ref?: RefObject<TextInput>
}

export interface HandleSearchContainerLayoutOptions {
        containerCurrent?: View | null
}

export interface SearchContentProps {
        trailingShow: boolean
}
