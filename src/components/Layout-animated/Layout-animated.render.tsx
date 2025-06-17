import Animated from 'react-native-reanimated'
import type {RenderLayoutAnimatedProps} from './Layout-animated.interface'
import {Container} from './Layout-animated.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
export const renderLayoutAnimated = ({
	children,
	containerAnimatedStyle,
	id,
	interactionHandlers,
	style,
	testID,
	visible,
	...containerProps
}: RenderLayoutAnimatedProps) => {
	const {onLayout} = interactionHandlers

	return (
		<AnimatedContainer
			{...containerProps}
			onLayout={onLayout}
			style={[style, containerAnimatedStyle]}
			testID={testID ?? `layoutAnimated--${id}`}
			visible={visible}
		>
			{children}
		</AnimatedContainer>
	)
}
