import {forwardRef, memo} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {AnimatedTimingOptions} from '../../../hook'
import {LayoutAnimated} from '../../Layout-animated'
import {VirtualListItemBase, processVirtualListItemPropsEqual} from './Virtual-list-item-base.component'
import {RenderVirtualListItemProps, VirtualListItemProps} from './Virtual-list-item.interface'
import {Container} from './Virtual-list-item.style'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({
    containerAnimatedStyle,
    id,
    itemElement,
    onUnmount,
    visible,
    ...containerProps
}: RenderVirtualListItemProps) => {
    const animatedTimingOptions = {
        duration: 'short2'
    } as AnimatedTimingOptions

    return (
        <AnimatedContainer
            {...containerProps}
            style={[containerAnimatedStyle]}
            testID={`virtualListItem--${id}`}
        >
            <LayoutAnimated
                entry={animatedTimingOptions}
                exit={animatedTimingOptions}
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
    processVirtualListItemPropsEqual(prevProps)(nextProps)
)
