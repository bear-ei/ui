import type {RefAttributes} from 'react'
import type {PressableProps, TextInput, TextInputProps} from 'react-native'

import type {InteractionHandlers} from '../../hooks'
import type {ThemeableProps} from '../../theme'
import type {ListItemData} from '../List'
import type {MenuProps} from '../Menu'
import type {VirtualListCloseEvent} from '../Virtual-list'

export interface SearchProps
	extends
		Omit<Partial<TextInputProps & Omit<PressableProps & InteractionHandlers & MenuProps, 'ref'>>, 'onFocus'>,
		RefAttributes<TextInput>,
		ThemeableProps {
	disabled?: boolean
	enableLocalFilter?: boolean
	leading?: React.JSX.Element
	onFocusTarget?: (target: number) => void
	trailing?: React.JSX.Element
}

export interface RenderSearchProps extends Omit<SearchProps, 'onFocus'>, Pick<TextInputProps, 'onFocus'> {
	expanded?: boolean
	isTextInputPicker?: boolean
	listVisible?: boolean
	onMenuClose: (event: VirtualListCloseEvent) => void
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

export interface HandleSearchActiveKeyOptions extends Pick<SearchProps, 'onActiveKeyChange'> {
	ref?: React.RefObject<TextInput | null>
}

export type UpdateSearchDataOptions = Pick<SearchProps, 'data' | 'enableLocalFilter'>
