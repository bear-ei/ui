import type {CommonProps, ComponentStatus, EventName, LayoutRectangle, State, TriggerOn} from '@/constants'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '@/hooks'
import type {RefAttributes, RefObject} from 'react'
import type {PressableProps, TextInput, TextInputProps, TextStyle, View, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {ElevationLevel} from '../Elevation'
import type {ListData, ListSelectType} from '../List'
import type {OnVirtualListCloseOptions} from '../Virtual-list'

export interface SearchProps
        extends Partial<TextInputProps & PressableProps & RefAttributes<TextInput> & InteractionHandlers>,
                CommonProps {
        data?: ListData[]
        disabled?: boolean
        filter?: boolean
        leading?: React.JSX.Element
        listActiveKey?: string
        listCloseTrailing?: boolean
        listEmptyElement?: React.JSX.Element
        listItemSize?: number
        listSelectType?: ListSelectType
        listTrailingTriggerOn?: TriggerOn
        onListActive?: (indexKey?: string) => void
        onListClose?: (options: OnVirtualListCloseOptions) => void
        trailing?: React.JSX.Element
}

export interface RenderSearchProps extends SearchProps {
        containerRef: RefObject<View | null>
        contentAnimatedStyle: AnimatedStyle<ViewStyle>
        elevation?: ElevationLevel
        eventName?: EventName
        inputAnimatedStyle: AnimatedStyle<TextStyle>
        interactionHandlers: InteractionHandlers
        leadingElement?: React.JSX.Element
        listVisible?: boolean
        trailingElement?: React.JSX.Element
}

export type SearchBaseProps = SearchProps
export interface SearchState {
        data?: ListData[]
        elevation?: ElevationLevel
        eventName?: EventName
        layout: LayoutRectangle
        listExpanded?: boolean
        listVisible?: boolean
        nextChangeTextEvent?: () => void
        nextListVisibleEvent?: () => void
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
