import type {Size} from '@bearei/material-token'
import type {RefAttributes, RefObject} from 'react'
import type {LayoutRectangle, PressableProps, TextInput, TextInputProps, View} from 'react-native'
import type {DefaultTheme} from 'styled-components/native'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '../../hooks'
import type {CommonProps, ComponentStatus, EventName, State} from '../Common'
import type {ListData, ListProps} from '../List'
import type {SearchListProps} from './Search-list'

export interface SearchTextInputProps extends TextInputProps, RefAttributes<TextInput> {
	enableFocusRing?: boolean
}

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
	layout: LayoutRectangle & {pageX?: number; pageY?: number}
	listVisible?: boolean
	interactionHandlers: InteractionHandlers
	theme: DefaultTheme
}

export interface SearchBaseProps extends SearchProps {
	renderSearch: (props: RenderSearchProps) => React.JSX.Element
}

export interface SearchState {
	data?: ListData[]
	eventName?: EventName
	layout: LayoutRectangle & {pageX?: number; pageY?: number}
	listVisible?: boolean
	nextChangeTextEvent?: () => void
	nextPressOutEvent?: () => void
	state: State
	status: ComponentStatus
	value?: string
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
