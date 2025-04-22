import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {UnderlayBase} from './Underlay-base.component'
import type {RenderUnderlayProps, UnderlayProps} from './Underlay.interface'
import {ActiveLayer, Container, HoverLayer} from './Underlay.styles'

const AnimatedHoverLayer = Animated.createAnimatedComponent(HoverLayer)
const AnimatedActiveLayer = Animated.createAnimatedComponent(ActiveLayer)
const renderUnderlay = ({
	active,
	activeColor,
	activeLayerAnimatedStyle,
	activeShape,
	hoverLayerAnimatedStyle,
	id,
	shape,
	style,
	testID,
	underlayColor,
	...containerProps
}: RenderUnderlayProps) => (
	<Container
		{...containerProps}
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

const UnderlayWithRef = forwardRef<View, UnderlayProps>((props, ref) => (
	<UnderlayBase
		{...props}
		ref={ref}
		renderUnderlay={renderUnderlay}
	/>
))

export const Underlay = UnderlayWithRef
