import {FC, forwardRef} from 'react'
import {ListData, VirtualListComponent} from '../List'
import {Tooltip} from '../Tooltip'
import {MenuBase} from './Menu-base.component'
import {MenuList} from './Menu-list'
import {MenuProps, RenderMenuProps} from './Menu.interface'
import {Container} from './Menu.styles'

const render = ({
    id,
    data,
    type,
    onActive,
    onActives,
    shape = 'extraSmall',
    multiple,
    activeKey,
    activeKeys,
    ...tooltipProps
}: RenderMenuProps) => {
    const supporting = (
        <MenuList
            activeKey={activeKey}
            activeKeys={activeKeys}
            data={data}
            multiple={multiple}
            onActive={onActive}
            onActives={onActives}
            shape={shape}
            type={type}
        />
    )

    return (
        <Container testID={`menu--${id}`}>
            <Tooltip
                {...tooltipProps}
                elevation={2}
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
