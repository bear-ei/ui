import {FC, forwardRef, memo} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {TouchableRippleBase} from './Touchable-ripple-base.component'
import {handleTouchableRipplePropsEqual} from './Touchable-ripple-handle'
import {RenderTouchableRippleProps, TouchableRippleProps} from './Touchable-ripple.interface'
import {Container} from './Touchable-ripple.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({
        containerAnimatedStyle,
        height,
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
                style={[style, containerAnimatedStyle]}
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
        handleTouchableRipplePropsEqual(prevProps)(nextProps)
) as FC<TouchableRippleProps>
