import {SHAPE} from '@bearei/material-token'
import Animated from 'react-native-reanimated'
import {PROGRESS_ANIMATED} from '../Progress.enum'
import type {RenderProgressActiveIndicatorLinearProps} from './Progress-active-indicator-linear.interface'
import {Container, Content, Stop, Track} from './Progress-active-indicator-linear.styles'

const AnimatedContent = Animated.createAnimatedComponent(Content)
export const renderProgressActiveIndicatorLinear = ({
	animatedType,
	contentAnimatedStyle,
	id,
	testID,
	...containerProps
}: RenderProgressActiveIndicatorLinearProps) => {
	const shape = SHAPE.SMALL

	return (
		<Container
			shape={shape}
			testID={testID ?? `progressActiveIndicatorLinear--${id}`}
		>
			<AnimatedContent
				{...containerProps}
				pointerEvents='none'
				shape={shape}
				style={[contentAnimatedStyle]}
				testID={`progressActiveIndicatorLinear__animatedContent--${id}`}
			/>

			<Track
				shape={shape}
				testID={`progressActiveIndicatorLinear__track--${id}`}
			/>

			{animatedType === PROGRESS_ANIMATED.DETERMINATE && (
				<Stop
					shape={SHAPE.FULL}
					testID={`progressActiveIndicatorLinear__stop--${id}`}
				/>
			)}
		</Container>
	)
}
