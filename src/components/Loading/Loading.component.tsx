import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Icon} from '../Icon'
import {LoadingBase} from './Loading-base.component'
import {LoadingProps, RenderLoadingProps} from './Loading.interface'
import {Container, Content, Ripple} from './Loading.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const AnimatedRipple = Animated.createAnimatedComponent(Ripple)
const render = ({
        containerAnimatedStyle,
        height,
        id,
        rippleAnimatedStyle,
        testID,
        theme,
        width,
        ...containerProps
}: RenderLoadingProps) => (
        <AnimatedContainer
                {...containerProps}
                accessibilityRole='progressbar'
                height={height}
                pointerEvents='none'
                shape='full'
                style={[containerAnimatedStyle]}
                testID={testID ?? `loading--${id}`}
                width={width}
        >
                <Content>
                        <Icon
                                fill={theme.token.scheme.primary}
                                height={height}
                                iconStyle='rounded'
                                name='progressActivity'
                                type='filled'
                                width={width}
                        />
                </Content>

                <AnimatedRipple
                        shape='full'
                        style={[rippleAnimatedStyle]}
                />
        </AnimatedContainer>
)

const ForwardRefLoading = forwardRef<View, LoadingProps>((props, ref) => (
        <LoadingBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const Loading: FC<LoadingProps> = ForwardRefLoading
