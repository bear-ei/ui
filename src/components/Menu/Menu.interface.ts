import {KeyboardEvent} from 'react'
import {PressableProps} from 'react-native'
import {TooltipProps} from '../Tooltip'
import {MenuListProps} from './Menu-list'

export type MenuType = 'textFieldPicker'
export interface MenuProps extends Omit<PressableProps & TooltipProps & MenuListProps, 'type'> {
    type?: MenuType
}

export interface RenderMenuProps extends MenuProps {
    focusedIndex?: number
    onKeyDown: (event: KeyboardEvent) => void
}

export interface MenuBaseProps extends MenuProps {
    render: (props: RenderMenuProps) => JSX.Element
}

export interface MenuState {
    focusedIndex?: number
}
