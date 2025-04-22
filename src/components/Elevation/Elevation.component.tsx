import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {ElevationBase} from './Elevation-base.component'
import type {ElevationProps, RenderElevationProps} from './Elevation.interface'
import {Container, Shadow} from './Elevation.styles'

const AnimatedShadow = Animated.createAnimatedComponent(Shadow)
const renderElevation = ({level, shadowAnimatedStyle, shape, testID, id, ...containerProps}: RenderElevationProps) => (
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

const ElevationWithRef = forwardRef<View, ElevationProps>((props, ref) => (
	<ElevationBase
		{...props}
		ref={ref}
		renderElevation={renderElevation}
	/>
))

export const Elevation = ElevationWithRef
