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
	status,
	style,
	testID,
	unmount,
	visible,
	...containerProps
}: RenderLayoutAnimatedProps) => {
	const {onLayout} = interactionHandlers
	const isCollapse = animatedType?.startsWith('COLLAPSE')

	return (
		<AnimatedContainer
			{...containerProps}
			animatedType={animatedType}
			collapse={isCollapse}
			status={status}
			style={[style, containerAnimatedStyle]}
			testID={testID ?? `layoutAnimated--${id}`}
			visible={visible}
		>
			<ContentLayout
				layout={layout}
				testID={`layoutAnimated__contentSize--${id}`}
				visible={visible}
			>
				<Content
					{...(!(contentSize || unmount) && {onLayout})}
					style={[contentStyle]}
					testID={`layoutAnimated__content--${id}`}
				>
					{children}
				</Content>
			</ContentLayout>
		</AnimatedContainer>
	)
}
