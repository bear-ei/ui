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
        id,
        loading,
        style,
        testID,
        ...virtualListProps
}: RenderListProps) => (
        <Container
                accessibilityLabel='list'
                accessibilityRole='list'
                style={[style]}
                testID={testID ?? `list--${id}`}
        >
                <VirtualList
                        {...virtualListProps}
                        testID={`list__virtualList--${id}`}
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
