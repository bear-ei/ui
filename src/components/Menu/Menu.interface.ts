import {DefaultTheme} from 'styled-components/native'
import {ElevationLevel} from '../Elevation'
import {ListProps} from '../List'

export interface MenuProps extends ListProps {
    defaultVisible?: boolean
    elevation?: ElevationLevel
    virtualList?: boolean
    visible?: boolean
}

export interface RenderMenuProps extends MenuProps {
    theme: DefaultTheme
}

export interface MenuBaseProps extends MenuProps {
    render: (props: RenderMenuProps) => JSX.Element
}
