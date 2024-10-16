import {FC, forwardRef} from 'react'
import {Elevation} from '../Elevation'
import {List, ListData, VirtualListComponent} from '../List'
import {MenuBase} from './Menu-base.component'
import {MenuProps, RenderMenuProps} from './Menu.interface'
import {Container, ListContainer} from './Menu.styles'

const render = ({theme, selectType = 'select', ...menuProps}: RenderMenuProps) => {
    const shape = 'extraSmall'

    return (
        <Container>
            <ListContainer shape={shape}>
                <List
                    {...menuProps}
                    itemSize={theme.adaptSize(theme.token.spacing.extraSmall * 12)}
                    selectType={selectType}
                    type='menu'
                />
            </ListContainer>

            <Elevation
                level={2}
                shape={shape}
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
