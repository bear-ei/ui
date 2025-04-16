import {SHAPE} from '@bearei/material-token'
import type {FC} from 'react'
import {forwardRef, memo} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {TouchableRippleBase} from './Touchable-ripple-base.component'
import {handleTouchableRipplePropsEqual} from './Touchable-ripple-handle'
import type {RenderTouchableRippleProps, TouchableRippleProps} from './Touchable-ripple.interface'
import {Container} from './Touchable-ripple.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({
	containerAnimatedStyle,
	id,
	locationX,
	locationY,
	size,
	style,
	testID,
	...containerProps
}: RenderTouchableRippleProps) => (
	<AnimatedContainer
		{...containerProps}
		locationX={locationX}
		locationY={locationY}
		pointerEvents='none'
		shape={SHAPE.FULL}
		size={size}
		style={[style, containerAnimatedStyle]}
		testID={testID ?? `touchableRipple--${id}`}
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
