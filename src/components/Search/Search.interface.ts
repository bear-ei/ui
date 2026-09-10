import type {CommonProps} from '@/constants'
import type {InteractionHandlers} from '@/hooks'
import type {RefAttributes} from 'react'
import type {PressableProps, TextInput, TextInputProps} from 'react-native'
import type {ListItemData} from '../List'
import type {MenuProps} from '../Menu'
import type {OnVirtualListCloseOptions} from '../Virtual-list'

export interface SearchProps
	extends
		Partial<TextInputProps & PressableProps & RefAttributes<TextInput> & InteractionHandlers & MenuProps>,
		CommonProps {
	disabled?: boolean
	filter?: boolean
	leading?: React.JSX.Element
	trailing?: React.JSX.Element
}

export interface RenderSearchProps extends SearchProps {
	expanded?: boolean
	listVisible?: boolean
	onMenuClose: (options: OnVirtualListCloseOptions) => void
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
	nextActiveEvent?: () => void
	nextChangeTextEvent?: () => void
	nextFocusEvent?: () => void
	nextListVisibleEvent?: () => void
	value?: string
}

export type UseSearchTextInputAnimatedOptions = Pick<RenderSearchProps, 'disabled'> & Pick<SearchState, 'expanded'>
export interface HandleSearchActiveKeyOptions extends Pick<SearchProps, 'onActive'> {
	ref?: React.RefObject<TextInput | null>
}

export type UpdateSearchDataOptions = Pick<SearchProps, 'data' | 'filter'>
