import {FC, forwardRef} from 'react'
import {ListData, VirtualListComponent} from '../List'
import {Tooltip} from '../Tooltip'
import {MenuBase} from './Menu-base.component'
import {MenuList} from './Menu-list'
import {MenuProps, RenderMenuProps} from './Menu.interface'
import {Container} from './Menu.styles'

const render = ({
        activeKey,
        activeKeys,
        data,
        focusedIndex,
        id,
        multiple,
        onActive,
        onActives,
        onKeyDown,
        onVisible,
        shape = 'extraSmall',
        type,
        ...tooltipProps
}: RenderMenuProps) => {
        const supporting = (
                <MenuList
                        activeKey={activeKey}
                        activeKeys={activeKeys}
                        data={data}
                        focusedIndex={focusedIndex}
                        multiple={multiple}
                        onActive={onActive}
                        onActives={onActives}
                        onKeyDown={onKeyDown}
                        shape={shape}
                        type={type}
                />
        )

        return (
                <Container testID={`menu--${id}`}>
                        <Tooltip
                                {...tooltipProps}
                                elevation={2}
                                onVisible={onVisible}
                                shape={shape}
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
