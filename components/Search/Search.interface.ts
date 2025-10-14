import {CommonProps, ComponentStatus, EventName, LayoutRectangle, State} from '@/constants'
import {HandleStateEventChangeOptions, InteractionHandlers} from '@/hooks'
import type {RefAttributes, RefObject} from 'react'
import type {PressableProps, TextInput, TextInputProps, TextStyle, View, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {ListData, ListProps} from '../List'
import {SearchListProps} from './Search-list'

export interface SearchProps
        extends Partial<TextInputProps & PressableProps & RefAttributes<TextInput> & InteractionHandlers>,
                CommonProps {
        disabled?: boolean
        leading?: React.JSX.Element
        listProps?: ListProps
        trailing?: React.JSX.Element
}

export interface RenderSearchProps extends SearchProps {
        containerRef: RefObject<View | null>
        contentAnimatedStyle: AnimatedStyle<ViewStyle>
        eventName?: EventName
        inputAnimatedStyle: AnimatedStyle<TextStyle>
        interactionHandlers: InteractionHandlers
        layout: LayoutRectangle
        leadingElement?: React.JSX.Element
        listVisible?: boolean
        trailingElement?: React.JSX.Element
}

export type SearchBaseProps = SearchProps
export interface SearchState {
        data?: ListData[]
        eventName?: EventName
        layout: LayoutRectangle
        listVisible?: boolean
        nextChangeTextEvent?: () => void
        state: State
        status: ComponentStatus
        value?: string
}

export type UpdateSearchTextWithMatchOptions = Pick<RenderSearchProps, 'onChangeText'> & Pick<SearchListProps, 'data'>
export interface HandleSearchInputStateChangeOptions extends HandleStateEventChangeOptions {
        ref?: RefObject<TextInput | null>
}

export interface HandleSearchContainerLayoutOptions {
        containerCurrent?: View | null
}

export type UseSearchTextInputAnimatedOptions = Pick<RenderSearchProps, 'disabled'>
