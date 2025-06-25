import {SHAPE} from '@bearei/element-token'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {PROGRESS_ANIMATED} from '../Progress.enum'
import type {RenderProgressActiveIndicatorLinearProps} from './Progress-active-indicator-linear.interface'
import {Container, Content, Stop, Track} from './Progress-active-indicator-linear.styles'

const AnimatedContent = Animated.createAnimatedComponent(Content)
export const RenderProgressActiveIndicatorLinear = forwardRef<View, RenderProgressActiveIndicatorLinearProps>(
	({animatedType, contentAnimatedStyle, id, interactionHandlers, testID, ...containerProps}, ref) => {
		const shape = SHAPE.SMALL

		return (
			<Container
				{...interactionHandlers}
				ref={ref}
				shape={shape}
				testID={testID ?? `progressActiveIndicatorLinear--${id}`}
			>
				<AnimatedContent
					{...containerProps}
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
)
