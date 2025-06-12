import {SHAPE} from '@bearei/material-token'
import Animated from 'react-native-reanimated'
import type {RenderTouchableRippleProps} from './Touchable-ripple.interface'
import {Container} from './Touchable-ripple.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
export const renderTouchableRipple = ({
	containerAnimatedStyle,
	id,
	interactionHandlers,
	locationX,
	locationY,
	size,
	style,
	testID,
	...containerProps
}: RenderTouchableRippleProps) => (
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
