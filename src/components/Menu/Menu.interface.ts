import {KeyboardEvent} from 'react'
import {PressableProps} from 'react-native'
import {TooltipProps} from '../Tooltip'
import {MenuListProps} from './Menu-list'

export type MenuType = 'textFieldPicker'
export interface MenuProps extends Omit<PressableProps & TooltipProps & MenuListProps, 'type'> {
    keyCode?: string
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
    keyCode?: string
    nextActiveEvent?: () => void
    nextActivesEvent?: () => void
    nextVisibleEvent?: () => void
}

export type HandleMenuKeyDownOptions = Pick<
    MenuProps,
    'data' | 'multiple' | 'onActives' | 'onActive' | 'activeKeys' | 'activeKey'
>
