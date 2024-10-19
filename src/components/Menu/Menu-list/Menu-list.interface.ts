import {LayoutRectangle} from 'react-native'
import {DefaultTheme} from 'styled-components/native'
import {ComponentStatus, ShapeType} from '../../Common'
import {ElevationLevel} from '../../Elevation'
import {ListProps} from '../../List'
import {MenuType} from '../Menu.interface'

export interface MenuListProps extends Omit<ListProps, 'type'> {
    defaultVisible?: boolean
    elevation?: ElevationLevel
    multiple?: boolean
    shape?: ShapeType
    type?: MenuType
    virtualList?: boolean
    visible?: boolean
}

export interface RenderMenuListProps extends Omit<MenuListProps, 'containerCurrent'> {
    theme: DefaultTheme
}

export interface MenuListBaseProps extends MenuListProps {
    render: (props: RenderMenuListProps) => JSX.Element
}

export interface MenuListState extends MenuListProps {
    containerLayout: LayoutRectangle & {pageX: number; pageY: number}
    status: ComponentStatus
}

export interface MenuListContainerProps extends Pick<MenuListProps, 'type'> {
    height?: number
}
