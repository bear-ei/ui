import {forwardRef, memo} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {LayoutAnimated} from '../../Layout-animated'
import {VirtualListItemBase, handleVirtualListItemPropsEqual} from './Virtual-list-item-base.component'
import {RenderVirtualListItemProps, VirtualListItemProps} from './Virtual-list-item.interface'
import {Container} from './Virtual-list-item.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({
        containerAnimatedStyle,
        id,
        itemElement,
        onUnmount,
        testID,
        visible,
        ...containerProps
}: RenderVirtualListItemProps) => {
        return (
                <AnimatedContainer
                        {...containerProps}
                        style={[containerAnimatedStyle]}
                        testID={testID ?? `virtualListItem--${id}`}
                >
                        <LayoutAnimated
                                onUnmount={onUnmount}
                                unmount={true}
                                visible={visible}
                        >
                                {itemElement}
                        </LayoutAnimated>
                </AnimatedContainer>
        )
}

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
