import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {LayoutAnimatedBase} from './Layout-animated-base.component'
import {LayoutAnimatedProps, RenderLayoutAnimatedProps} from './Layout-animated.interface'
import {Children, Container, Content, ContentInner} from './Layout-animated.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({
        animatedStyle,
        children,
        hidden,
        id,
        layout,
        onStateEvent,
        style,
        testID,
        visible,
        ...containerProps
}: RenderLayoutAnimatedProps) => (
        <AnimatedContainer
                {...containerProps}
                {...onStateEvent}
                style={[style, animatedStyle]}
                testID={testID ?? `layoutAnimated--${id}`}
        >
                <Content
                        hidden={hidden}
                        testID={`layoutAnimated__content--${id}`}
                        visible={visible}
                >
                        <ContentInner
                                containerHeight={layout?.height}
                                testID={`layoutAnimated__content--${id}`}
                                visible={visible}
                        >
                                <Children testID={`layoutAnimated__children--${id}`}>{children}</Children>
                        </ContentInner>
                </Content>
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
