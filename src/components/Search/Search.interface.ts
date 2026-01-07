import type {CommonProps, ComponentStatus, EventName, State} from '@/constants'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '@/hooks'
import type {RefAttributes, RefObject} from 'react'
import type {PressableProps, TextInput, TextInputProps, TextStyle, View, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
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
        contentAnimatedStyle: AnimatedStyle<ViewStyle>
        eventName?: EventName
        inputAnimatedStyle: AnimatedStyle<TextStyle>
        interactionHandlers: InteractionHandlers
        leadingElement?: React.JSX.Element
        listVisible?: boolean
        onListFocusKey?: (key?: string) => void
        textInputPicker?: boolean
        trailingElement?: React.JSX.Element
}

export type SearchBaseProps = SearchProps
export interface SearchState {
        activeKey?: string
        data?: ListItemData[]
        eventName?: EventName
        listExpanded?: boolean
        listVisible?: boolean
        nextActiveEvent?: () => void
        nextChangeTextEvent?: () => void
        nextListVisibleEvent?: () => void
        searchListData?: ListItemData[]
        state: State
        status: ComponentStatus
        value?: string
}

export interface HandleSearchInputStateChangeOptions extends HandleStateEventChangeOptions {
        ref?: RefObject<TextInput | null>
}

export interface HandleSearchContainerLayoutOptions {
        containerCurrent?: View | null
}

export type UseSearchTextInputAnimatedOptions = Pick<RenderSearchProps, 'disabled'> & Pick<SearchState, 'listExpanded'>
export interface AnimateSearchBorderRadiusOptions {
        borderBottomRadiusSharedValue: SharedValue<number>
        borderTopRadiusSharedValue: SharedValue<number>
}

export interface HandleSearchListActiveKeyOptions extends Pick<SearchProps, 'onActive'> {
        ref?: React.RefObject<TextInput | null>
}

export type UpdateSearchListDataOptions = Pick<SearchProps, 'data' | 'filter'>
