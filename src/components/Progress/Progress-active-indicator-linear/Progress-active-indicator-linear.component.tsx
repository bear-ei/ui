import {ShapeType} from '@bearei/material-token'
import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {ProgressAnimated} from '../Progress.enum'
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
        const shape = ShapeType.SMALL

        return (
                <Container
                        shape={shape}
                        testID={testID ?? `progressActiveIndicatorLinear--${id}`}
                >
                        <AnimatedContent
                                {...containerProps}
                                pointerEvents='none'
                                shape={shape}
                                style={[contentAnimatedStyle]}
                                testID={`progressActiveIndicatorLinear__animatedContent--${id}`}
                        />

                        <Track
                                shape={shape}
                                testID={`progressActiveIndicatorLinear__track--${id}`}
                        />

                        {animatedType === ProgressAnimated.DETERMINATE && (
                                <Stop
                                        shape={ShapeType.FULL}
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
