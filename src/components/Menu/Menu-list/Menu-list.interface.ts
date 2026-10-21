import type {PressableProps} from 'react-native'

import type {ThemeProps} from '../../../theme'
import type {ElevationValue} from '../../Elevation'
import type {ListProps, ListType} from '../../List'
import type {PopoverType} from '../../Popover'

export interface MenuListProps extends Omit<ListProps & PressableProps, 'type'>, ThemeProps {
	defaultVisible?: boolean
	elevation?: ElevationValue
	listType?: ListType
	multiple?: boolean
	onKeyDown?: (event: React.KeyboardEvent) => void
	type?: PopoverType
	visible?: boolean
}

export interface RenderMenuListProps extends Omit<MenuListProps, 'containerCurrent'> {
	focusedIndex?: number
}

export type MenuListBaseProps = MenuListProps
