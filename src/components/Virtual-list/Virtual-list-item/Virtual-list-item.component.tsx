import {forwardRef, memo} from 'react'
import {View} from 'react-native'
import {VirtualListItemBase} from './Virtual-list-item-base.component'
import {handleVirtualListItemPropsEqual} from './Virtual-list-item-handle'
import {RenderVirtualListItemProps, VirtualListItemProps} from './Virtual-list-item.interface'
import {ContainerLayout} from './Virtual-list-item.styles'

const render = ({
        containerAnimatedStyle,
        id,
        itemElement,
        itemSize = 0,
        onUnmount,
        testID,
        visible,
        ...containerProps
}: RenderVirtualListItemProps) => (
        <ContainerLayout
                {...containerProps}
                exit={{duration: 'short2'}}
                itemSize={itemSize}
                onUnmount={onUnmount}
                style={[containerAnimatedStyle]}
                testID={testID ?? `virtualListItem--${id}`}
                unmount={true}
                visible={visible}
        >
                {itemElement}
        </ContainerLayout>
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
