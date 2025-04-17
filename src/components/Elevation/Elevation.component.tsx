import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {ElevationBase} from './Elevation-base.component'
import type {ElevationProps, RenderElevationProps} from './Elevation.interface'
import {Container, Shadow} from './Elevation.styles'

const AnimatedShadow = Animated.createAnimatedComponent(Shadow)
const render = ({level, shadowAnimatedStyle, shape, testID, ...containerProps}: RenderElevationProps) => (
	<Container
		{...containerProps}
		testID={`elevation--${testID}`}
	>
		<AnimatedShadow
			level={level}
			shape={shape}
			style={[shadowAnimatedStyle]}
			testID={`elevation__animatedShadow--${testID}`}
		/>
	</Container>
)

const ForwardRefElevation = forwardRef<View, ElevationProps>((props, ref) => (
	<ElevationBase
		{...props}
		ref={ref}
		render={render}
	/>
))

export const Elevation: FC<ElevationProps> = ForwardRefElevation
