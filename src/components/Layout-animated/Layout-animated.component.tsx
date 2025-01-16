import {cloneElement, FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {LayoutAnimatedBase} from './Layout-animated-base.component'
import {LayoutAnimatedProps, RenderLayoutAnimatedProps} from './Layout-animated.interface'
import {Container, Content, ContentLayout} from './Layout-animated.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({
        animatedType,
        children,
        containerAnimatedStyle,
        hidden = true,
        layout,
        onStateEvent,
        style,
        visible,
        ...containerProps
}: RenderLayoutAnimatedProps) => {
        const {onLayout} = onStateEvent
        const collapse = animatedType?.startsWith('collapse')
        const childrenElement = cloneElement(children ?? <></>, {onLayout})

        return (
                <AnimatedContainer
                        {...containerProps}
                        hidden={collapse ? false : hidden}
                        style={[style, containerAnimatedStyle]}
                        visible={visible}
                >
                        {collapse ?
                                childrenElement
                        :       <ContentLayout layout={layout}>
                                        <Content>{childrenElement}</Content>
                                </ContentLayout>
                        }
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
