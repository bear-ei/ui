import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Icon} from '../Icon'
import {LoadingBase} from './Loading-base.component'
import {LoadingProps, RenderLoadingProps} from './Loading.interface'
import {Container, Content, Main, Ripple} from './Loading.styles'

const AnimatedContent = Animated.createAnimatedComponent(Content)
const AnimatedRipple = Animated.createAnimatedComponent(Ripple)
const render = ({
        contentAnimatedStyle,
        content,
        height,
        id,
        rippleAnimatedStyle,
        testID,
        theme,
        width,
        ...containerProps
}: RenderLoadingProps) => (
        <Container
                {...containerProps}
                accessibilityRole='progressbar'
                height={height}
                pointerEvents='none'
                testID={testID ?? `loading--${id}`}
                width={width}
        >
                <AnimatedContent
                        shape='full'
                        style={[contentAnimatedStyle]}
                        testID={`loading__content--${id}`}
                >
                        <Icon
                                fill={theme.token.scheme.primary}
                                height={height}
                                iconStyle='rounded'
                                name='progressActivity'
                                type='outlined'
                                width={width}
                        />
                </AnimatedContent>

                <Main testID={`loading__contentMain--${id}`}>{content}</Main>

                <AnimatedRipple
                        shape='full'
                        style={[rippleAnimatedStyle]}
                        testID={`loading__ripple--${id}`}
                />
        </Container>
)

const ForwardRefLoading = forwardRef<View, LoadingProps>((props, ref) => (
        <LoadingBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const Loading: FC<LoadingProps> = ForwardRefLoading
