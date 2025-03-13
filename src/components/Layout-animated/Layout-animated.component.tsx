import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {LayoutAnimatedBase} from './Layout-animated-base.component'
import {LayoutAnimatedProps, RenderLayoutAnimatedProps} from './Layout-animated.interface'
import {Container, Content, ContentLayout} from './Layout-animated.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({
        children,
        containerAnimatedStyle,
        contentStyle,
        id,
        stateOnEvent,
        style,
        testID,
        visible,
        contentSize,
        layout,
        animatedType,
        ...containerProps
}: RenderLayoutAnimatedProps) => {
        const {onLayout} = stateOnEvent
        const collapse = animatedType?.startsWith('collapse')

        return (
                <AnimatedContainer
                        {...containerProps}
                        collapse={collapse}
                        style={[style, containerAnimatedStyle]}
                        testID={testID ?? `layoutAnimated--${id}`}
                        visible={visible}
                >
                        <ContentLayout
                                contentSize={contentSize ?? layout}
                                testID={`layoutAnimated__contentLayout--${id}`}
                                visible={visible}
                        >
                                <Content
                                        {...(!contentSize && {onLayout})}
                                        style={[contentStyle]}
                                        testID={`layoutAnimated__content--${id}`}
                                >
                                        {children}
                                </Content>
                        </ContentLayout>
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
