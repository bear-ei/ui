import {FC, forwardRef, memo} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {TouchableRippleBase, processTouchableRipplePropsEqual} from './Touchable-ripple-base'
import {RenderTouchableRippleProps, TouchableRippleProps} from './Touchable-ripple.interface'
import {Container} from './Touchable-ripple.style'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({
    animatedStyle,
    height,
    id,
    locationX,
    locationY,
    style,
    width,
    ...containerProps
}: RenderTouchableRippleProps) => (
    <AnimatedContainer
        {...containerProps}
        height={height}
        locationX={locationX}
        locationY={locationY}
        pointerEvents='none'
        shape='full'
        style={[style, animatedStyle]}
        testID={`ripple--${id}`}
        width={width}
    />
)

const ForwardRefTouchableRipple = forwardRef<View, TouchableRippleProps>((props, ref) => (
    <TouchableRippleBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const TouchableRipple = memo(ForwardRefTouchableRipple, (prevProps, nextProps) =>
    processTouchableRipplePropsEqual(prevProps)(nextProps)
) as FC<TouchableRippleProps>
