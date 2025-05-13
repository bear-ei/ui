import Animated from 'react-native-reanimated'
import type {RenderElevationProps} from './Elevation.interface'
import {Container, Shadow} from './Elevation.styles'

const AnimatedShadow = Animated.createAnimatedComponent(Shadow)
export const renderElevation = ({
	id,
	level,
	shadowAnimatedStyle,
	shape,
	testID,
	...containerProps
}: RenderElevationProps) => (
	<Container
		{...containerProps}
		testID={testID ?? `elevation--${id}`}
	>
		<AnimatedShadow
			level={level}
			shape={shape}
			style={[shadowAnimatedStyle]}
			testID={`elevation__animatedShadow--${id}`}
		/>
	</Container>
)
