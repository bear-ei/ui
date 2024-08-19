import {RefAttributes, RefObject} from 'react'
import {LayoutRectangle, PressableProps, TextInput, TextInputProps, View} from 'react-native'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hook'
import {EventName, Size, State} from '../Common'
import {ListData, ListProps} from '../List'
import {SearchListProps} from './Search-list'

export interface SearchProps
    extends Partial<TextInputProps & PressableProps & RefAttributes<TextInput> & OnStateEvent> {
    densityScale?: number
    disabled?: boolean
    leading?: React.JSX.Element
    listProps?: ListProps
    size?: Size
    trailing?: React.JSX.Element
    type?: 'modal'
}

export interface RenderSearchProps extends SearchProps {
    containerRef: RefObject<View>
    eventName?: EventName
    layout: LayoutRectangle & {pageX?: number; pageY?: number}
    listVisible?: boolean
    onStateEvent: OnStateEvent
    underlayColor: string
}

export interface SearchBaseProps extends SearchProps {
    render: (props: RenderSearchProps) => React.JSX.Element
}

export interface InitialSearchState {
    data?: ListData[]
    eventName?: EventName
    layout: LayoutRectangle & {pageX?: number; pageY?: number}
    listVisible?: boolean
    nextChangeTextCallback?: () => void
    nextPressOutEvent?: () => void
    searchValue?: string
    state: State
}

export type HandleSearchChangeTextOptions = Pick<RenderSearchProps, 'onChangeText'> & Pick<SearchListProps, 'data'>
export interface HandleSearchStateChangeOptions extends OnStateEventChangeOptions {
    ref?: RefObject<TextInput>
}

export interface HandleSearchContainerLayoutOptions {
    containerCurrent?: View | null
}

export interface SearchContentProps extends Pick<RenderSearchProps, 'densityScale'> {
    trailingShow: boolean
}
