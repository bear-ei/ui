import {FC, forwardRef} from 'react'
import {List, ListData, VirtualListComponent} from '../../List'
import {MenuListBase} from './Menu-list-base.component'
import {MenuListProps, RenderMenuListProps} from './Menu-list.interface'
import {Container, ListContainer} from './Menu-list.styles'

const render = ({theme, multiple, id, type, shape, ...menuProps}: RenderMenuListProps) => (
    <Container
        testID={`menu--${id}`}
        type={type}
    >
        <ListContainer
            shape={shape}
            testID={`menu-listContainer--${id}`}
        >
            <List
                {...menuProps}
                itemSize={theme.adaptSize(theme.token.spacing.extraSmall * 12)}
                selectType={multiple ? 'multiselect' : 'select'}
                type='menu'
            />
        </ListContainer>
    </Container>
)

const ForwardRefMenuList = forwardRef<VirtualListComponent<ListData>, MenuListProps>((props, ref) => (
    <MenuListBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const MenuList = ForwardRefMenuList as FC<MenuListProps>
