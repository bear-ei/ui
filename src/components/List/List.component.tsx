import {FC, forwardRef} from 'react'
import {VirtualList} from '../Virtual-list'
import {ListBase} from './List-base.component'
import {ListData, ListProps, RenderListProps, VirtualListComponent} from './List.interface'
import {Container} from './List.styles'

const render = ({
    activeKey,
    activeKeys,
    afterAffordanceActiveKey,
    data,
    disabled,
    extraData = [],
    id,
    itemSize = 56,
    loading,
    renderItem,
    style,
    ...virtualListProps
}: RenderListProps) => (
    <Container
        accessibilityLabel='list'
        accessibilityRole='list'
        style={[style]}
        testID={`list--${id}`}
    >
        <VirtualList
            {...virtualListProps}
            data={data}
            extraData={[activeKey, afterAffordanceActiveKey, activeKeys?.join(), disabled, loading, ...extraData]}
            itemSize={itemSize}
            loading={loading}
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
