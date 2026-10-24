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
	keyCommand?: string
	listType?: ListType
	onContextMenu?: (event: MouseEvent) => void
	onFocusKeyChange?: (key?: string) => void
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
	pendingActiveKeysEvent?: string[]
	pendingFocusKeyEvent?: string
	pendingVisibleEvent?: boolean
	visible?: boolean
}

export type HandleMenuKeyCommandOptions = Pick<
	MenuProps,
	'data' | 'multiple' | 'onActiveKeysChange' | 'onActiveKeyChange' | 'activeKeys' | 'activeKey' | 'onFocusKeyChange'
>

export type HandleMenuKeyDownEventOptions = Pick<
	HandleMenuKeyCommandOptions,
	'onFocusKeyChange' | 'data' | 'onActiveKeysChange' | 'onActiveKeyChange'
>

export interface UpdateMenuVisibleOptions extends Pick<RenderMenuProps, 'type'> {
	onVisibleChange?: (visible?: boolean) => void
}
