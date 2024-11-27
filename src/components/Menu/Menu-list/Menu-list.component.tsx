import {FC, forwardRef} from 'react'
import {OnStateEvent} from '../../../hooks'
import {List, ListData, VirtualListComponent} from '../../List'
import {MenuListBase} from './Menu-list-base.component'
import {MenuListProps, RenderMenuListProps} from './Menu-list.interface'
import {Container, ListContainer} from './Menu-list.styles'

const render = ({
        data,
        id,
        multiple,
        onFocus,
        onKeyDown,
        shape,
        testID,
        theme,
        type,
        ...menuProps
}: RenderMenuListProps) => {
        const dataNumber = data?.length ?? 0
        const itemSize = theme.adaptSize(theme.token.spacing.extraSmall * 12)

        return (
                <Container
                        height={dataNumber * itemSize + theme.adaptSize(theme.token.spacing.medium)}
                        onKeyDown={onKeyDown}
                        testID={testID ?? `menu--${id}`}
                        type={type}
                >
                        <ListContainer
                                shape={shape}
                                testID={`menu-listContainer--${id}`}
                        >
                                <List
                                        {...menuProps}
                                        data={data}
                                        itemSize={theme.adaptSize(theme.token.spacing.extraSmall * 12)}
                                        onItemStateEvent={{onFocus} as OnStateEvent}
                                        selectType={multiple ? 'multiselect' : 'select'}
                                        type='menu'
                                />
                        </ListContainer>
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
