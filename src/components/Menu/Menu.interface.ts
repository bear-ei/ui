import type {PressableProps} from 'react-native'
import type {InteractionHandlers} from '../../hooks'
import type {ListType} from '../List'
import type {PopoverProps, PopoverType} from '../Popover'
// import type {MenuListProps} from './Menu-list'

export interface MenuProps extends Omit<PressableProps & PopoverProps & InteractionHandlers, 'type'> {
	keyCode?: string
	listType?: ListType
	onContextMenu?: (event: MouseEvent) => void
	onFocusKey?: (key?: string) => void
	type?: PopoverType
}

export interface RenderMenuProps extends MenuProps {
	focusedIndex?: number
}

export type MenuBaseProps = MenuProps
export interface MenuState {
	activeKey?: string
	activeKeys?: string[]
	focusedIndex?: number
	keyCode?: string
	nextActiveEvent?: () => void
	nextFocusKeyEvent?: () => void
	nextVisibleEvent?: () => void
	visible?: boolean
}

export type HandleMenuKeyDownOptions = MenuProps

export interface HandleNextActivesEventOptions {
	activeKeys: string[]
	indexKey: string
}

export type HandleMenuKeyDownEventOptions = HandleMenuKeyDownOptions
export interface UpdateMenuVisibleOptions extends Pick<RenderMenuProps, 'type'> {
	onVisible?: (value?: boolean) => void
}
