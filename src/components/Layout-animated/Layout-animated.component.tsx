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

const LayoutAnimatedWithRef = forwardRef<View, LayoutAnimatedProps>((props, ref) => (
	<LayoutAnimatedBase
		{...props}
		ref={ref}
		renderLayoutAnimated={renderLayoutAnimated}
	/>
))

export const LayoutAnimated: FC<LayoutAnimatedProps> = LayoutAnimatedWithRef
