import Animated from 'react-native-reanimated'
import type {RenderLayoutAnimatedProps} from './Layout-animated.interface'
import {Container, Content, ContentLayout} from './Layout-animated.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
export const renderLayoutAnimated = ({
	animatedType,
	children,
	containerAnimatedStyle,
	contentSize,
	contentStyle,
	id,
	interactionHandlers,
	layout,
	style,
	testID,
	visible,
	...containerProps
}: RenderLayoutAnimatedProps) => {
	const {onLayout} = interactionHandlers
	const isCollapse = animatedType?.startsWith('COLLAPSE')

	return (
		<AnimatedContainer
			{...containerProps}
			collapse={isCollapse}
			style={[style, containerAnimatedStyle]}
			testID={testID ?? `layoutAnimated--${id}`}
			visible={visible}
		>
			<ContentLayout
				contentSize={contentSize ?? layout}
				testID={`layoutAnimated__contentSize--${id}`}
				visible={visible}
			>
				<Content
					{...(!contentSize && {onLayout})}
					style={[contentStyle]}
					testID={`layoutAnimated__content--${id}`}
				>
					{children}
				</Content>
			</ContentLayout>
		</AnimatedContainer>
	)
}
