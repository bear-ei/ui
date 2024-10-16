import {DefaultTheme} from 'styled-components/native'
import {ListProps} from '../List'

export interface MenuProps extends ListProps {
    filterText?: string
    virtualList?: boolean
}

export interface RenderMenuProps extends MenuProps {
    theme: DefaultTheme
}

export interface MenuBaseProps extends MenuProps {
    render: (props: RenderMenuProps) => JSX.Element
}
