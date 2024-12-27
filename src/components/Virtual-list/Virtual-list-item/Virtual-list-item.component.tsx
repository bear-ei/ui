import {forwardRef, memo} from 'react'
import {View} from 'react-native'
import {VirtualListItemBase, handleVirtualListItemPropsEqual} from './Virtual-list-item-base.component'
import {RenderVirtualListItemProps, VirtualListItemProps} from './Virtual-list-item.interface'
import {AnimatedContainer} from './Virtual-list-item.styles'

const render = ({
        containerAnimatedStyle,
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
                exit={{duration: 'short2'}}
                height={itemSize}
                onUnmount={onUnmount}
                style={[containerAnimatedStyle]}
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
