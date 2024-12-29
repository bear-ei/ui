import {forwardRef, memo} from 'react'
import {View} from 'react-native'
import {VirtualListItemBase, handleVirtualListItemPropsEqual} from './Virtual-list-item-base.component'
import {RenderVirtualListItemProps, VirtualListItemProps} from './Virtual-list-item.interface'
import {AnimatedContainer} from './Virtual-list-item.styles'

const render = ({
        id,
        itemElement,
        itemSize,
        onUnmount,
        testID,
        visible,
        ...containerProps
}: RenderVirtualListItemProps) => (
        <AnimatedContainer
                {...containerProps}
                animatedType='collapseY'
                height={itemSize}
                onUnmount={onUnmount}
                testID={testID ?? `virtualListItem--${id}`}
                unmount={true}
                visible={visible}
        >
                {itemElement}
        </AnimatedContainer>
)

const ForwardRefVirtualListItem = forwardRef<View, VirtualListItemProps>((props, ref) => (
        <VirtualListItemBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const VirtualListItem = memo(ForwardRefVirtualListItem, (prevProps, nextProps) =>
        handleVirtualListItemPropsEqual(prevProps)(nextProps)
)
