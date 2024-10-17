import {FC, forwardRef} from 'react'
import {ListData, VirtualListComponent} from '../List'
import {Tooltip} from '../Tooltip'
import {MenuBase} from './Menu-base.component'
import {MenuList} from './Menu-list'
import {MenuProps, RenderMenuProps} from './Menu.interface'
import {Container} from './Menu.styles'

const render = ({id, data, type, ...tooltipProps}: RenderMenuProps) => {
    const supporting = (
        <MenuList
            data={data}
            type={type}
        />
    )

    return (
        <Container testID={`menu--${id}`}>
            <Tooltip
                {...tooltipProps}
                supporting={supporting}
                supportingPosition='verticalEnd'
                type='menu'
            />
        </Container>
    )
}

const ForwardRefMenu = forwardRef<VirtualListComponent<ListData>, MenuProps>((props, ref) => (
    <MenuBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const Menu = ForwardRefMenu as FC<MenuProps>
