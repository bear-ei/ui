import type {RefAttributes} from 'react'
import type {PressableProps, TextInput, TextInputProps} from 'react-native'

import type {InteractionHandlers} from '../../hooks'
import type {ThemeProps} from '../../theme'
import type {ListItemData} from '../List'
import type {MenuProps} from '../Menu'
import type {VirtualListCloseEvent} from '../Virtual-list'

export interface SearchProps
	extends
		Omit<
			Partial<TextInputProps & PressableProps & RefAttributes<TextInput> & InteractionHandlers & MenuProps>,
			'onFocus'
		>,
		ThemeProps {
	disabled?: boolean
	filter?: boolean
	leading?: React.JSX.Element
	trailing?: React.JSX.Element
	onFocus?: (target: number) => void
}

export interface RenderSearchProps extends Omit<SearchProps, 'onFocus'>, Pick<TextInputProps, 'onFocus'> {
	expanded?: boolean
	listVisible?: boolean
	onMenuClose: (event: VirtualListCloseEvent) => void
	textInputPicker?: boolean
}

export type SearchBaseProps = SearchProps
export interface SearchState {
	activeKey?: string
	data?: ListItemData[]
	expanded?: boolean
	filterValue?: string
	focusKey?: string
	listVisible?: boolean
	pendingActiveEvent?: string
	pendingChangeTextEvent?: string
	pendingFocusEvent?: number
	value?: string
}

export type UseSearchTextInputAnimatedOptions = Pick<RenderSearchProps, 'disabled'> & Pick<SearchState, 'expanded'>
export interface HandleSearchActiveKeyOptions extends Pick<SearchProps, 'onActive'> {
	ref?: React.RefObject<TextInput | null>
}

export type UpdateSearchDataOptions = Pick<SearchProps, 'data' | 'filter'>
