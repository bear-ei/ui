import {SHAPE} from '@bearei/material-token'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import type {RenderTouchableRippleProps} from './Touchable-ripple.interface'
import {Container} from './Touchable-ripple.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
export const RenderTouchableRipple = forwardRef<View, RenderTouchableRippleProps>(
	({
		containerAnimatedStyle,
		id,
		interactionHandlers,
		locationX,
		locationY,
		size,
		style,
		testID,
		...containerProps
	}) => (
		<AnimatedContainer
			{...containerProps}
			{...interactionHandlers}
			locationX={locationX}
			locationY={locationY}
			pointerEvents='none'
			shape={SHAPE.FULL}
			size={size}
			style={[style, containerAnimatedStyle]}
			testID={testID ?? `touchableRipple--${id}`}
		/>
	)
)
