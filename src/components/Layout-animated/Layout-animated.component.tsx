import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {LayoutAnimatedBase} from './Layout-animated-base.component'
import {LayoutAnimatedProps, RenderLayoutAnimatedProps} from './Layout-animated.interface'
import {Container} from './Layout-animated.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({
        id,
        children,
        containerAnimatedStyle,
        style,
        onStateEvent,
        visible,
        ...containerProps
}: RenderLayoutAnimatedProps) => (
        <AnimatedContainer
                {...containerProps}
                {...onStateEvent}
                style={[style, containerAnimatedStyle]}
                testID={`layoutAnimated--${id}`}
                visible={visible}
        >
                {children}
        </AnimatedContainer>
)

const ForwardRefLayoutAnimated = forwardRef<View, LayoutAnimatedProps>((props, ref) => (
        <LayoutAnimatedBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const LayoutAnimated: FC<LayoutAnimatedProps> = ForwardRefLayoutAnimated
