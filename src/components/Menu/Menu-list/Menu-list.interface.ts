import {KeyboardEvent, RefAttributes} from 'react'
import {PressableProps, ViewProps} from 'react-native'
import {DefaultTheme} from 'styled-components/native'
import {ShapeType} from '../../Common'
import {ElevationLevel} from '../../Elevation'
import {ListProps} from '../../List'
import {MenuType} from '../Menu.interface'

export interface MenuListProps extends Omit<ListProps & PressableProps, 'type'> {
    defaultVisible?: boolean
    elevation?: ElevationLevel
    multiple?: boolean
    onKeyDown?: (event: KeyboardEvent) => void
    shape?: ShapeType
    type?: MenuType
    virtualList?: boolean
    visible?: boolean
}

export interface RenderMenuListProps extends Omit<MenuListProps, 'containerCurrent'> {
    focusedIndex?: number
    theme: DefaultTheme
}

export interface MenuListBaseProps extends MenuListProps {
    render: (props: RenderMenuListProps) => JSX.Element
}

export interface MenuListContainerProps extends ViewProps, RefAttributes<ViewProps>, Pick<MenuListProps, 'type'> {
    height?: number
    onKeyDown?: (event: KeyboardEvent) => void
}
