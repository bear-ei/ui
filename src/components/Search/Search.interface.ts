import {Size} from '@bearei/material-token'
import {RefAttributes, RefObject} from 'react'
import {LayoutRectangle, PressableProps, TextInput, TextInputProps, View} from 'react-native'
import {DefaultTheme} from 'styled-components/native'
import {HandleStateEventChangeOptions, StateOnEvent} from '../../hooks'
import {CommonProps, ComponentStatus, EventName, State} from '../Common'
import {ListData, ListProps} from '../List'
import {SearchListProps} from './Search-list'

export interface SearchTextInputProps extends TextInputProps, RefAttributes<TextInput> {
        enableFocusRing?: boolean
}

export interface SearchProps
        extends Partial<TextInputProps & PressableProps & RefAttributes<TextInput> & StateOnEvent>,
                CommonProps {
        disabled?: boolean
        leading?: React.JSX.Element
        listProps?: ListProps
        size?: Size
        trailing?: React.JSX.Element
}

export interface RenderSearchProps extends SearchProps {
        containerRef: RefObject<View>
        eventName?: EventName
        layout: LayoutRectangle & {pageX?: number; pageY?: number}
        listVisible?: boolean
        stateOnEvent: StateOnEvent
        theme: DefaultTheme
}

export interface SearchBaseProps extends SearchProps {
        render: (props: RenderSearchProps) => React.JSX.Element
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
export interface HandleSearchStateChangeOptions extends HandleStateEventChangeOptions {
        ref?: RefObject<TextInput>
}

export interface HandleSearchContainerLayoutOptions {
        containerCurrent?: View | null
}

export interface SearchContentProps extends Pick<SearchProps, 'density'> {
        trailingShow: boolean
}
