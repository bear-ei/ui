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
			animatedType={animatedType}
			collapse={isCollapse}
			status={status}
			style={[style, containerAnimatedStyle]}
			testID={testID ?? `layoutAnimated--${id}`}
			translate={translate}
			visible={visible}
		>
			<ContentLayout
				collapse={isCollapse}
				layout={(contentSize ?? layout) as LayoutRectangle}
				testID={`layoutAnimated__contentSize--${id}`}
				visible={visible}
			>
				<Content
					onLayout={onLayout}
					pointerEvents={visible ? 'auto' : 'none'}
					style={[contentStyle]}
					testID={`layoutAnimated__content--${id}`}
				>
					{children}
				</Content>
			</ContentLayout>
		</AnimatedContainer>
	)
}
