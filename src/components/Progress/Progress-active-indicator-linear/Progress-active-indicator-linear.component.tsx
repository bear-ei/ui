import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {ProgressActiveIndicatorLinearBase} from './Progress-active-indicator-linear-base.component'
import {
        ProgressActiveIndicatorLinearProps,
        RenderProgressActiveIndicatorLinearProps
} from './Progress-active-indicator-linear.interface'
import {Container, Content, Stop, Track} from './Progress-active-indicator-linear.styles'

const AnimatedContent = Animated.createAnimatedComponent(Content)
const render = ({
        animatedType,
        contentAnimatedStyle,
        id,
        testID,
        ...containerProps
}: RenderProgressActiveIndicatorLinearProps) => {
        const shape = 'small'

        return (
                <Container
                        testID={testID ?? `progressActiveIndicatorLinear--${id}`}
                        shape={shape}
                >
                        <AnimatedContent
                                {...containerProps}
                                pointerEvents='none'
                                shape={shape}
                                style={[contentAnimatedStyle]}
                                testID={`progressActiveIndicatorLinear__content--${id}`}
                        />

                        <Track
                                shape={shape}
                                testID={`progressActiveIndicatorLinear__track--${id}`}
                        />

                        {animatedType === 'determinate' && (
                                <Stop
                                        shape='full'
                                        testID={`progressActiveIndicatorLinear__stop--${id}`}
                                />
                        )}
                </Container>
        )
}

const ForwardRefProgressActiveIndicatorLinear = forwardRef<View, ProgressActiveIndicatorLinearProps>((props, ref) => (
        <ProgressActiveIndicatorLinearBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const ProgressActiveIndicatorLinear: FC<ProgressActiveIndicatorLinearProps> =
        ForwardRefProgressActiveIndicatorLinear
