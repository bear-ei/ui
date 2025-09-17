import {forwardRef} from 'react'
import type {View} from 'react-native'
import {GestureDetector} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import type {RenderDragProps} from './Drag.interface'
import {Container, Content} from './Drag.styles'

const AnimatedContent = Animated.createAnimatedComponent(Content)
export const RenderDrag = forwardRef<View, RenderDragProps>(
	({testID, children, id, panGesture, animatedStyle, ...containerProps}, ref) => (
		<Container
			{...containerProps}
			ref={ref}
			testID={testID ?? `drag--${id}`}
		>
			<GestureDetector gesture={panGesture}>
				<AnimatedContent
					style={[animatedStyle]}
					testID={`drag__content--${id}`}
				>
					{children}
				</AnimatedContent>
			</GestureDetector>
		</Container>
	)
)
