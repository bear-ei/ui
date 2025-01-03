import {forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {TouchableRippleBase} from './Touchable-ripple-base.component'
import {RenderTouchableRippleProps, TouchableRippleProps} from './Touchable-ripple.interface'
import {Container} from './Touchable-ripple.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({
        containerAnimatedStyle,
        height,
        id,
        locationX,
        locationY,
        style,
        testID,
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
                testID={testID ?? `ripple--${id}`}
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

export const TouchableRipple = ForwardRefTouchableRipple
