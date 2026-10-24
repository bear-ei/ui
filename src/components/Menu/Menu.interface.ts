import type {PressableProps} from 'react-native'

import type {InteractionHandlers} from '../../hooks'
import type {ListType} from '../List'
import type {PopoverProps, PopoverType} from '../Popover'
import type {MenuListProps} from './Menu-list'

export interface MenuProps extends Omit<PressableProps & PopoverProps & MenuListProps & InteractionHandlers, 'type'> {
	/**
	 * Controlled key input. The effect fires when the value **changes** —
	 * passing the same value twice does NOT trigger twice.
	 *
	 * The caller drives keyboard interaction by cycling through values:
	 *
	 *   const [key, setKey] = useState<string | undefined>()
	 *   // Trigger ArrowDown:
	 *   setKey(undefined); setKey('ArrowDown')
	 *
	 * This is intentionally NOT imperative (`ref.current.triggerKey('Enter')`)
	 * — the value-change model keeps `Menu` a pure function of props.
	 */
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
	pendingActiveEvent?: string
	pendingActivesEvent?: string[]
	pendingFocusKeyEvent?: string
	pendingVisibleEvent?: boolean
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
