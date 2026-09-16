import type {ShapeType} from '@bearei/theme-token'
import type {PressableProps} from 'react-native'
import type {CommonProps} from '../../../constants'
import type {Theme} from '../../../contexts'
import type {ElevationLevel} from '../../Elevation'
import type {ListProps, ListType} from '../../List'
import type {PopoverType} from '../../Popover'

export interface MenuListProps extends Omit<ListProps & PressableProps, 'type'>, CommonProps {
	defaultVisible?: boolean
	elevation?: ElevationLevel
	listType?: ListType
	multiple?: boolean
	onKeyDown?: (event: React.KeyboardEvent) => void
	shape?: ShapeType
	type?: PopoverType
	visible?: boolean
}

export interface RenderMenuListProps extends Omit<MenuListProps, 'containerCurrent'> {
	focusedIndex?: number
	theme: Theme
}

export type MenuListBaseProps = MenuListProps
