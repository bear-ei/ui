import {FC, forwardRef} from 'react'
import {VirtualList} from '../Virtual-list'
import {ListBase} from './List-base.component'
import {ListData, ListProps, RenderListProps, VirtualListComponent} from './List.interface'
import {Container} from './List.styles'

const render = ({
        activeKey,
        activeKeys,
        afterAffordanceActiveKey,
        extraData = [],
        focusedIndex,
        loading,
        style,
        ...virtualListProps
}: RenderListProps) => (
        <Container
                accessibilityLabel='list'
                accessibilityRole='list'
                style={[style]}
        >
                <VirtualList
                        {...virtualListProps}
                        extraData={[
                                `${activeKey}`,
                                `${activeKeys?.join()} `,
                                `${afterAffordanceActiveKey}`,
                                `${focusedIndex}`,
                                `${loading}`,
                                ...extraData
                        ]}
                        focusedIndex={focusedIndex}
                        loading={loading}
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
