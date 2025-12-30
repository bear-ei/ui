import type {ElevationLevel} from '@/components/Elevation'
import type {ListProps, ListType} from '@/components/List'
import type {PopoverType} from '@/components/Popover'
import type {CommonProps} from '@/constants'
import type {Theme} from '@/contexts'
import type {ShapeType} from '@bearei/theme-token'
import type {PressableProps} from 'react-native'

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
