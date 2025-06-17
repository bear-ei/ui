import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import type {RenderElevationProps} from './Elevation.interface'
import {Container, Shadow} from './Elevation.styles'

const AnimatedShadow = Animated.createAnimatedComponent(Shadow)
export const RenderElevation = forwardRef<View, RenderElevationProps>(
	({id, level, shadowAnimatedStyle, shape, testID, ...containerProps}, ref) => (
		<Container
			{...containerProps}
			testID={testID ?? `elevation--${id}`}
			ref={ref}
		>
			<AnimatedShadow
				level={level}
				shape={shape}
				style={[shadowAnimatedStyle]}
				testID={`elevation__animatedShadow--${id}`}
			/>
		</Container>
	)
)
