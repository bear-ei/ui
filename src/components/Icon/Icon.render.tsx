import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import type {RenderIconProps} from './Icon.interface'
import {Container} from './Icon.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
export const RenderIcon = forwardRef<View, RenderIconProps>(
	({iconElement, id, name, style, testID, accessibilityLabel, ...containerProps}, ref) => (
		<AnimatedContainer
			{...containerProps}
			accessibilityLabel={accessibilityLabel ?? name}
			accessibilityRole='image'
			accessible={true}
			pointerEvents='none'
			ref={ref}
			style={[style]}
			testID={testID ?? `icon--${id}`}
		>
			{iconElement}
		</AnimatedContainer>
	)
)
