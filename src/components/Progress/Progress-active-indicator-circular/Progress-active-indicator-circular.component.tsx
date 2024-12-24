import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Icon} from '../../Icon'
import {ProgressActiveIndicatorCircularBase} from './Progress-active-indicator-circular-base.component'
import {
        ProgressActiveIndicatorCircularProps,
        RenderProgressActiveIndicatorCircularProps
} from './Progress-active-indicator-circular.interface'
import {Container, Content, IconContainer} from './Progress-active-indicator-circular.styles'

const AnimatedIconContainer = Animated.createAnimatedComponent(IconContainer)
const render = ({
        content,
        height,
        iconAnimatedStyle,
        id,
        testID,
        theme,
        width,
        ...containerProps
}: RenderProgressActiveIndicatorCircularProps) => (
        <Container
                {...containerProps}
                pointerEvents='none'
                testID={testID ?? `progressActiveIndicatorCircular--${id}`}
        >
                <AnimatedIconContainer
                        shape='full'
                        style={[iconAnimatedStyle]}
                        testID={`progressActiveIndicatorCircular__icon--${id}`}
                >
                        <Icon
                                fill={theme.token.scheme.primary}
                                height={height}
                                iconStyle='rounded'
                                name='progressActivity'
                                type='outlined'
                                width={width}
                        />
                </AnimatedIconContainer>

                <Content testID={`progressActiveIndicatorCircular__content--${id}`}>{content}</Content>
        </Container>
)

const ForwardRefProgressActiveIndicatorCircular = forwardRef<View, ProgressActiveIndicatorCircularProps>(
        (props, ref) => (
                <ProgressActiveIndicatorCircularBase
                        {...props}
                        ref={ref}
                        render={render}
                />
        )
)

export const ProgressActiveIndicatorCircular: FC<ProgressActiveIndicatorCircularProps> =
        ForwardRefProgressActiveIndicatorCircular
