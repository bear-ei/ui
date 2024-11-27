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
        focusedIndex,
        id,
        loading,
        renderItem,
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
                        data={data}
                        extraData={[
                                activeKey,
                                activeKeys?.join(),
                                afterAffordanceActiveKey,
                                disabled,
                                focusedIndex,
                                loading,
                                ...extraData
                        ]}
                        focusedIndex={focusedIndex}
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
