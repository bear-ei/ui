import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Circle, Svg} from 'react-native-svg'
import {ProgressActiveIndicatorCircularBase} from './Progress-active-indicator-circular-base.component'
import {
        ProgressActiveIndicatorCircularProps,
        RenderProgressActiveIndicatorCircularProps
} from './Progress-active-indicator-circular.interface'
import {Container, Content, Main} from './Progress-active-indicator-circular.styles'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedMain = Animated.createAnimatedComponent(Main)
const render = ({
        animatedType = 'indeterminate',
        circleAnimatedProps,
        circumference,
        containerAnimatedStyle,
        content,
        radius,
        size = 48,
        strokeWidth,
        theme,
        ...containerProps
}: RenderProgressActiveIndicatorCircularProps) => {
        const activeIndicatorColor = theme.token.scheme.primary
        const cx = size / 2
        const cy = size / 2
        const trackColor = theme.token.scheme.primaryContainer

        return (
                <Container
                        {...containerProps}
                        pointerEvents='none'
                >
                        <Content>{content}</Content>
                        <AnimatedMain style={[containerAnimatedStyle]}>
                                <Svg
                                        fill='none'
                                        viewBox={`0 0 ${size} ${size}`}
                                >
                                        {animatedType === 'determinate' && (
                                                <Circle
                                                        cx={cx}
                                                        cy={cy}
                                                        r={radius}
                                                        stroke={trackColor}
                                                        strokeDasharray={circumference}
                                                        strokeDashoffset={0}
                                                        strokeLinecap='round'
                                                        strokeWidth={strokeWidth}
                                                />
                                        )}

                                        <AnimatedCircle
                                                animatedProps={circleAnimatedProps}
                                                cx={cx}
                                                cy={cy}
                                                r={radius}
                                                rotation={`180 ${cx} ${cy}`}
                                                stroke={activeIndicatorColor}
                                                strokeDasharray={circumference}
                                                strokeLinecap='round'
                                                strokeWidth={strokeWidth}
                                        />
                                </Svg>
                        </AnimatedMain>
                </Container>
        )
}

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
