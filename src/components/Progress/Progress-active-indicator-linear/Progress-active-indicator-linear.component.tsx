import {SHAPE} from '@bearei/material-token'
import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {PROGRESS_ANIMATED} from '../Progress.enum'
import {ProgressActiveIndicatorLinearBase} from './Progress-active-indicator-linear-base.component'
import type {
	ProgressActiveIndicatorLinearProps,
	RenderProgressActiveIndicatorLinearProps
} from './Progress-active-indicator-linear.interface'
import {Container, Content, Stop, Track} from './Progress-active-indicator-linear.styles'

const AnimatedContent = Animated.createAnimatedComponent(Content)
const render = ({
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

const ForwardRefProgressActiveIndicatorLinear = forwardRef<View, ProgressActiveIndicatorLinearProps>((props, ref) => (
	<ProgressActiveIndicatorLinearBase
		{...props}
		ref={ref}
		render={render}
	/>
))

export const ProgressActiveIndicatorLinear: FC<ProgressActiveIndicatorLinearProps> =
	ForwardRefProgressActiveIndicatorLinear
