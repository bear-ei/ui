import {FC, forwardRef} from 'react'
import {Elevation} from '../../Elevation'
import {List, ListData, VirtualListComponent} from '../../List'
import {MenuListBase} from './Menu-list-base.component'
import {MenuListProps, RenderMenuListProps} from './Menu-list.interface'
import {Container, ListContainer} from './Menu-list.styles'

const render = ({theme, selectType = 'select', id, elevation = 2, type, ...menuProps}: RenderMenuListProps) => {
    const shape = 'extraSmall'

    return (
        <Container
            testID={`menu--${id}`}
            type={type}
        >
            <ListContainer
                testID={`menu-listContainer--${id}`}
                shape={shape}
            >
                <List
                    {...menuProps}
                    itemSize={theme.adaptSize(theme.token.spacing.extraSmall * 12)}
                    selectType={selectType}
                    type='menu'
                />
            </ListContainer>

            <Elevation
                level={elevation}
                shape={shape}
            />
        </Container>
    )
}

const ForwardRefMenuList = forwardRef<VirtualListComponent<ListData>, MenuListProps>((props, ref) => (
    <MenuListBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const MenuList = ForwardRefMenuList as FC<MenuListProps>
