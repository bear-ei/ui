import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {UnderlayBase} from './Underlay-base.component'
import {RenderUnderlayProps, UnderlayProps} from './Underlay.interface'
import {ActiveLayer, Container, HoverLayer} from './Underlay.styles'

const AnimatedHoverLayer = Animated.createAnimatedComponent(HoverLayer)
const AnimatedActiveLayer = Animated.createAnimatedComponent(ActiveLayer)
const render = ({
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

const ForwardRefUnderlay = forwardRef<View, UnderlayProps>((props, ref) => (
	<UnderlayBase
		{...props}
		ref={ref}
		render={render}
	/>
))

export const Underlay: FC<UnderlayProps> = ForwardRefUnderlay
