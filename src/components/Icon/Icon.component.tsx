import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {IconBase} from './Icon-base.component'
import type {IconProps, RenderIconProps} from './Icon.interface'
import {Container} from './Icon.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const renderIcon = ({containerAnimatedStyle, style, svgIconElement, testID, ...containerProps}: RenderIconProps) => (
	<AnimatedContainer
		{...containerProps}
		accessibilityRole='image'
		pointerEvents='none'
		style={[style, containerAnimatedStyle]}
		testID={`icon--${testID}`}
	>
		{svgIconElement}
	</AnimatedContainer>
)

const IconWithRef = forwardRef<View, IconProps>((props, ref) => (
	<IconBase
		{...props}
		ref={ref}
		renderIcon={renderIcon}
	/>
))

export const Icon: FC<IconProps> = IconWithRef
