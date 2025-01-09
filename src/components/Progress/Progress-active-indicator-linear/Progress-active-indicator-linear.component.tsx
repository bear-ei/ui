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
const render = ({animatedType, contentAnimatedStyle, ...containerProps}: RenderProgressActiveIndicatorLinearProps) => {
        const shape = 'small'

        return (
                <Container shape={shape}>
                        <AnimatedContent
                                {...containerProps}
                                pointerEvents='none'
                                shape={shape}
                                style={[contentAnimatedStyle]}
                        />

                        <Track shape={shape} />

                        {animatedType === 'determinate' && <Stop shape='full' />}
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
