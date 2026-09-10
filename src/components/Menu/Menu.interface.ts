import type {InteractionHandlers} from '@/hooks'
import type {PressableProps} from 'react-native'
import type {ListType} from '../List'
import type {PopoverProps, PopoverType} from '../Popover'
import type {MenuListProps} from './Menu-list'

export interface MenuProps extends Omit<PressableProps & PopoverProps & MenuListProps & InteractionHandlers, 'type'> {
	keyCode?: string
	listType?: ListType
	onContextMenu?: React.MouseEventHandler<HTMLDivElement>
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

export type HandleMenuKeyDownOptions = Pick<
	MenuProps,
	'data' | 'multiple' | 'onActives' | 'onActive' | 'activeKeys' | 'activeKey' | 'onFocusKey'
>

export interface HandleNextActivesEventOptions {
	activeKeys: string[]
	indexKey: string
}

export type HandleMenuKeyDownEventOptions = Pick<
	HandleMenuKeyDownOptions,
	'onFocusKey' | 'data' | 'onActives' | 'onActive'
>

export interface UpdateMenuVisibleOptions extends Pick<RenderMenuProps, 'type'> {
	onVisible?: (value?: boolean) => void
}
