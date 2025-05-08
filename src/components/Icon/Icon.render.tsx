import Animated from 'react-native-reanimated'
import type {RenderIconProps} from './Icon.interface'
import {Container} from './Icon.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
export const renderIcon = ({iconElement, id, name, style, testID, ...containerProps}: RenderIconProps) => (
	<AnimatedContainer
		{...containerProps}
		accessibilityLabel={`Icon: ${name}`}
		accessibilityRole='image'
		accessible={true}
		pointerEvents='none'
		style={[style]}
		testID={testID ?? `icon--${id}`}
	>
		{iconElement}
	</AnimatedContainer>
)
