import {cloneElement, FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {LayoutAnimatedBase} from './Layout-animated-base.component'
import {LayoutAnimatedProps, RenderLayoutAnimatedProps} from './Layout-animated.interface'
import {Container} from './Layout-animated.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({
        animatedType,
        children,
        containerAnimatedStyle,
        hidden = true,
        onStateEvent,
        style,
        visible,
        ...containerProps
}: RenderLayoutAnimatedProps) => {
        const {onLayout} = onStateEvent

        return (
                <AnimatedContainer
                        {...containerProps}
                        hidden={animatedType?.startsWith('collapse') ? false : hidden}
                        style={[style, containerAnimatedStyle]}
                        visible={visible}
                >
                        {cloneElement(children ?? <></>, {onLayout})}
                </AnimatedContainer>
        )
}

const ForwardRefLayoutAnimated = forwardRef<View, LayoutAnimatedProps>((props, ref) => (
        <LayoutAnimatedBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const LayoutAnimated: FC<LayoutAnimatedProps> = ForwardRefLayoutAnimated
