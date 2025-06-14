import type {LayoutRectangle} from 'react-native'
import Animated from 'react-native-reanimated'
import type {RenderLayoutAnimatedProps} from './Layout-animated.interface'
import {Container, Content, ContentLayout} from './Layout-animated.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
export const renderLayoutAnimated = ({
	animatedType,
	children,
	containerAnimatedStyle,
	contentStyle,
	id,
	interactionHandlers,
	layout,
	status,
	style,
	testID,
	visible,
	contentSize,
	translate,
	...containerProps
}: RenderLayoutAnimatedProps) => {
	const {onLayout} = interactionHandlers
	const isCollapse = animatedType?.startsWith('COLLAPSE')

	return (
		<AnimatedContainer
			{...containerProps}
			onLayout={onLayout}
			style={[style, containerAnimatedStyle]}
			testID={testID ?? `layoutAnimated--${id}`}
			visible={visible}
		>
			<ContentLayout
				translate={translate}
				status={status}
				collapse={isCollapse}
				animatedType={animatedType}
				testID={`layoutAnimated__contentSize--${id}`}
				visible={visible}
			>
				<Content
					layout={(contentSize ?? layout) as LayoutRectangle}
					style={[contentStyle]}
					testID={`layoutAnimated__content--${id}`}
				>
					{children}
				</Content>
			</ContentLayout>
		</AnimatedContainer>
	)
}
