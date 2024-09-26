import React, {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {IconBase} from './Icon-base.component'
import {IconProps, RenderIconProps} from './Icon.interface'
import {Container} from './Icon.style'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({containerAnimatedStyle, id, style, svgIconElement, ...containerProps}: RenderIconProps) => (
    <AnimatedContainer
        {...containerProps}
        accessibilityRole='image'
        pointerEvents='none'
        style={[style, containerAnimatedStyle]}
        testID={`icon--${id}`}
    >
        {svgIconElement}
    </AnimatedContainer>
)

const ForwardRefIcon = forwardRef<View, IconProps>((props, ref) => (
    <IconBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const Icon: FC<IconProps> = ForwardRefIcon
