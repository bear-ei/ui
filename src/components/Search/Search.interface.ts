import type {Size} from '@bearei/element-token'
import type {RefAttributes, RefObject} from 'react'
import type {PressableProps, TextInput, TextInputProps, View} from 'react-native'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '../../hooks'
import type {CommonProps, ComponentStatus, EventName, LayoutRectangle, State} from '../Common'
import type {ListData, ListProps} from '../List'
import type {SearchListProps} from './Search-list'

export interface SearchTextInputProps extends TextInputProps, RefAttributes<TextInput> {}
export interface SearchProps
	extends Partial<TextInputProps & PressableProps & RefAttributes<TextInput> & InteractionHandlers>,
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
	layout: LayoutRectangle
	listVisible?: boolean
	interactionHandlers: InteractionHandlers
}

export type SearchBaseProps = SearchProps
export interface SearchState {
	data?: ListData[]
	eventName?: EventName
	layout: LayoutRectangle
	listVisible?: boolean
	nextChangeTextEvent?: () => void
	nextPressOutEvent?: () => void
	state: State
	status: ComponentStatus
	value?: string
}

export type UpdateSearchTextWithMatchOptions = Pick<RenderSearchProps, 'onChangeText'> & Pick<SearchListProps, 'data'>
export interface HandleSearchInputStateChangeOptions extends HandleStateEventChangeOptions {
	ref?: RefObject<TextInput>
}

export interface HandleSearchContainerLayoutOptions {
	containerCurrent?: View | null
}

export interface SearchContentProps extends Pick<SearchProps, 'density'> {
	trailingShow: boolean
}
