import {FC, forwardRef} from 'react'
import {VirtualList} from '../Virtual-list'
import {ListBase} from './List-base'
import {ListData, ListProps, RenderListProps, VirtualListComponent} from './List.interface'
import {Container} from './List.style'

const render = ({
    activeKey,
    activeKeys,
    afterAffordanceActiveKey,
    data,
    extraData = [],
    id,
    itemSize = 56,
    renderItem,
    style,
    ...virtualListProps
}: RenderListProps) => (
    <Container
        accessibilityLabel='list'
        accessibilityRole='list'
        testID={`list--${id}`}
        style={[style]}
    >
        <VirtualList
            {...virtualListProps}
            data={data}
            extraData={[activeKey, afterAffordanceActiveKey, activeKeys?.join(), ...extraData]}
            itemSize={itemSize}
            renderItem={renderItem}
        />
    </Container>
)

const ForwardRefList = forwardRef<VirtualListComponent<ListData>, ListProps>((props, ref) => (
    <ListBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const List = ForwardRefList as FC<ListProps>
