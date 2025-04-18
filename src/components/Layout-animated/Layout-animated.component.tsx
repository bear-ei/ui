import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {LayoutAnimatedBase} from './Layout-animated-base.component'
import type {LayoutAnimatedProps, RenderLayoutAnimatedProps} from './Layout-animated.interface'
import {Container, Content, ContentLayout} from './Layout-animated.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const renderLayoutAnimated = ({
	animatedType,
	children,
	containerAnimatedStyle,
	contentSize,
	contentStyle,
	interactionHandlers,
	layout,
	style,
	testID,
	visible,
	...containerProps
}: RenderLayoutAnimatedProps) => {
	const {onLayout} = interactionHandlers
	const collapse = animatedType?.startsWith('COLLAPSE')

	return (
		<AnimatedContainer
			{...containerProps}
			collapse={collapse}
			style={[style, containerAnimatedStyle]}
			testID={`layoutAnimated--${testID}`}
			visible={visible}
		>
			<ContentLayout
				contentSize={contentSize ?? layout}
				testID={`layoutAnimated__contentSize--${testID}`}
				visible={visible}
			>
				<Content
					{...(!contentSize && {onLayout})}
					style={[contentStyle]}
					testID={`layoutAnimated__content--${testID}`}
				>
					{children}
				</Content>
			</ContentLayout>
		</AnimatedContainer>
	)
}

const LayoutAnimatedWithRef = forwardRef<View, LayoutAnimatedProps>((props, ref) => (
	<LayoutAnimatedBase
		{...props}
		ref={ref}
		renderLayoutAnimated={renderLayoutAnimated}
	/>
))

export const LayoutAnimated: FC<LayoutAnimatedProps> = LayoutAnimatedWithRef
