import {forwardRef, memo} from 'react'
import {View} from 'react-native'
import {VirtualListItemBase} from './Virtual-list-item-base.component'
import {handleVirtualListItemPropsEqual} from './Virtual-list-item-handle'
import {RenderVirtualListItemProps, VirtualListItemProps} from './Virtual-list-item.interface'
import {ContainerLayoutAnimated} from './Virtual-list-item.styles'

const render = ({itemElement, itemSize, onUnmount, visible, ...containerProps}: RenderVirtualListItemProps) => (
        <ContainerLayoutAnimated
                {...containerProps}
                animatedType='collapseY'
                exit={{duration: 'short0'}}
                itemSize={itemSize}
                onUnmount={onUnmount}
                unmount={true}
                visible={visible}
        >
                {itemElement}
        </ContainerLayoutAnimated>
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
