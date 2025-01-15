import {cloneElement, FC, forwardRef, isValidElement} from 'react'
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
        const collapse = animatedType?.startsWith('collapse')

        return (
                <AnimatedContainer
                        {...containerProps}
                        {...(!collapse && {onLayout})}
                        hidden={collapse ? false : hidden}
                        style={[style, containerAnimatedStyle]}
                        visible={visible}
                >
                        {collapse && isValidElement(children) ?
                                cloneElement((children as JSX.Element) ?? <></>, {onLayout})
                        :       children}
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
