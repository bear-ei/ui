import type {PressableProps} from 'react-native'
import type {DefaultTheme} from 'styled-components/native'
import type {ShapeType} from '../../Common'
import type {ElevationLevel} from '../../Elevation'
import type {ListProps, ListType} from '../../List'
import type {MenuType} from '../Menu.interface'

export interface MenuListProps extends Omit<ListProps & PressableProps, 'type'> {
	defaultVisible?: boolean
	elevation?: ElevationLevel
	listType?: ListType
	multiple?: boolean
	onKeyDown?: (event: React.KeyboardEvent) => void
	shape?: ShapeType
	type?: MenuType
	visible?: boolean
}

export interface RenderMenuListProps extends Omit<MenuListProps, 'containerCurrent'> {
	focusedIndex?: number
	theme: DefaultTheme
}

export type MenuListBaseProps = MenuListProps
export interface MenuListContainerProps extends Pick<MenuListProps, 'type'> {
	height?: number
	onKeyDown?: (event: React.KeyboardEvent) => void
}
