import {PressableProps} from 'react-native'
import {TooltipProps} from '../Tooltip'
import {MenuListProps} from './Menu-list'

export type MenuType = 'textFieldPicker'
export interface MenuProps extends Omit<PressableProps & TooltipProps & MenuListProps, 'type'> {
    type?: MenuType
}

export type RenderMenuProps = MenuProps
export interface MenuBaseProps extends MenuProps {
    render: (props: RenderMenuProps) => JSX.Element
}
