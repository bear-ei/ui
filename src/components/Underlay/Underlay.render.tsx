import Animated from 'react-native-reanimated'
import type {RenderUnderlayProps} from './Underlay.interface'
import {ActiveLayer, Container, HoverLayer} from './Underlay.styles'

const AnimatedHoverLayer = Animated.createAnimatedComponent(HoverLayer)
const AnimatedActiveLayer = Animated.createAnimatedComponent(ActiveLayer)
export const renderUnderlay = ({
	active,
	activeColor,
	activeLayerAnimatedStyle,
	activeShape,
	hoverLayerAnimatedStyle,
	id,
	interactionHandlers,
	shape,
	style,
	testID,
	underlayColor,
	...containerProps
}: RenderUnderlayProps) => (
	<Container
		{...containerProps}
		{...interactionHandlers}
		pointerEvents='none'
		shape={shape}
		style={[style]}
		testID={testID ?? `underlay--${id}`}
	>
		<AnimatedHoverLayer
			shape={shape}
			style={[hoverLayerAnimatedStyle]}
			testID={`underlay__animatedHoverLayer--${id}`}
			underlayColor={underlayColor}
		/>

		{typeof active === 'boolean' && activeColor && (
			<AnimatedActiveLayer
				activeColor={activeColor}
				shape={activeShape ?? shape}
				style={[activeLayerAnimatedStyle]}
				testID={`underlay__animatedActiveLayer--${id}`}
			/>
		)}
	</Container>
)
