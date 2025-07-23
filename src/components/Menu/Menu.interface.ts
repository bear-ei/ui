import type {PressableProps} from 'react-native'
import type {TooltipProps} from '../Tooltip'
import type {MenuListProps} from './Menu-list'

export type MenuType = 'textInputPicker'
export interface MenuProps extends Omit<PressableProps & TooltipProps & MenuListProps, 'type'> {
	keyCode?: string
	onContextMenu?: React.MouseEventHandler<HTMLDivElement>
	type?: MenuType
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
	nextActivesEvent?: () => void
	nextVisibleEvent?: () => void
	visible?: boolean
}

export type HandleMenuKeyDownOptions = Pick<
	MenuProps,
	'data' | 'multiple' | 'onActives' | 'onActive' | 'activeKeys' | 'activeKey'
>

export interface HandleNextActivesEventOptions {
	activeKeys: string[]
	indexKey: string
}

export type ContainerProps = Pick<RenderMenuProps, 'onContextMenu'>
