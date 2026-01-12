import type {CommonProps, EventName, State} from '@/constants'
import type {InteractionHandlers} from '@/hooks'
import type {RefAttributes} from 'react'
import type {PressableProps, TextInput, TextInputProps} from 'react-native'
import type {ListItemData} from '../List'
import type {MenuProps} from '../Menu'

export interface SearchProps
        extends Partial<TextInputProps & PressableProps & RefAttributes<TextInput> & InteractionHandlers & MenuProps>,
                CommonProps {
        disabled?: boolean
        filter?: boolean
        leading?: React.JSX.Element
        trailing?: React.JSX.Element
}

export interface RenderSearchProps extends SearchProps {
        eventName?: EventName
        expanded?: boolean
        leadingElement?: React.JSX.Element
        listVisible?: boolean
        // onListFocusKey?: (key?: string) => void
        textInputPicker?: boolean
        trailingElement?: React.JSX.Element
}

export type SearchBaseProps = SearchProps
export interface SearchState {
        activeKey?: string
        data?: ListItemData[]
        eventName?: EventName
        expanded?: boolean
        filterValue?: string
        listVisible?: boolean
        nextActiveEvent?: () => void
        nextChangeTextEvent?: () => void
        nextListVisibleEvent?: () => void
        searchListData?: ListItemData[]
        state: State
        value?: string
}

export type UseSearchTextInputAnimatedOptions = Pick<RenderSearchProps, 'disabled'> & Pick<SearchState, 'expanded'>
export interface HandleSearchActiveKeyOptions extends Pick<SearchProps, 'onActive'> {
        ref?: React.RefObject<TextInput | null>
}

export type UpdateSearchDataOptions = Pick<SearchProps, 'data' | 'filter'>
