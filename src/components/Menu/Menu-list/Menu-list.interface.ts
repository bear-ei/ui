import type {KeyboardEvent, RefAttributes} from 'react'
import type {PressableProps} from 'react-native'
import type {View} from 'react-native'

import type {ThemeableProps} from '../../../theme'
import type {ElevationValue} from '../../Elevation'
import type {ListProps, ListType} from '../../List'
import type {PopoverType} from '../../Popover'

export interface MenuListProps
	extends Omit<ListProps & PressableProps, 'type' | 'ref'>, RefAttributes<View>, ThemeableProps {
	defaultVisible?: boolean
	elevation?: ElevationValue
	listType?: ListType
	multiple?: boolean
	onKeyDown?: (event: KeyboardEvent) => void
	type?: PopoverType
	visible?: boolean
}

export interface RenderMenuListProps extends MenuListProps {
	focusedIndex?: number
}

export type MenuListBaseProps = MenuListProps
