import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import type {RenderLayoutAnimatedProps} from './Layout-animated.interface'
import {Container} from './Layout-animated.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
export const RenderLayoutAnimated = forwardRef<View, RenderLayoutAnimatedProps>(
	(
		{children, containerAnimatedStyle, id, interactionHandlers, style, testID, visible, ...containerProps},
		ref
	) => {
		const {onLayout} = interactionHandlers

		return (
			<AnimatedContainer
				{...containerProps}
				aria-hidden={!visible}
				onLayout={onLayout}
				ref={ref}
				style={[style, containerAnimatedStyle]}
				testID={testID ?? `layoutAnimated--${id}`}
				visible={visible}
			>
				{children}
			</AnimatedContainer>
		)
	}
)
