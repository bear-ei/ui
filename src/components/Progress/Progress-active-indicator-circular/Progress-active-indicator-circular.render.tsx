import {type FC} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Circle, Svg} from 'react-native-svg'

import type {RenderProgressActiveIndicatorCircularProps} from './Progress-active-indicator-circular.interface'

import {useTheme} from '../../../hooks'
import {BORDER_SIZE} from '../../../theme'
import {platformValue} from '../../../utils'
import {AnimatedView} from '../../Animated'
import {PROGRESS_ANIMATED} from '../Progress.enum'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
export const RenderProgressActiveIndicatorCircular: FC<RenderProgressActiveIndicatorCircularProps> = ({
	animatedType = PROGRESS_ANIMATED.INDETERMINATE,
	circleAnimatedProps,
	circumference,
	containerAnimatedStyle,
	content,
	id,
	interactionHandlers,
	radius,
	size,
	strokeWidth,
	testID,
	...containerProps
}) => {
	const {token} = useTheme()
	const activeIndicatorColor = token.scheme.primary
	const cx = size / 2
	const cy = size / 2
	const trackColor = token.scheme.secondaryContainer
	const circleProps = {
		cx: platformValue(cx),
		cy: platformValue(cy),
		r: platformValue(radius),
		strokeDasharray: platformValue(circumference),
		strokeDashoffset: platformValue(token.border[BORDER_SIZE.NONE]),
		strokeWidth: platformValue(strokeWidth)
	}

	return (
		<View
			{...containerProps}
			{...interactionHandlers}
			className='pointer-events-none relative flex-1 self-stretch'
			testID={testID ?? `progressActiveIndicatorCircular--${id}`}
		>
			{content && (
				<View
					className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
					testID={`progressActiveIndicatorCircular__content--${id}`}
				>
					{content}
				</View>
			)}

			<AnimatedView
				style={containerAnimatedStyle}
				testID={`progressActiveIndicatorCircular__animatedMain--${id}`}
			>
				<Svg
					fill='none'
					testID={`progressActiveIndicatorCircular__svg--${id}`}
					viewBox={`0 0 ${size} ${size}`}
				>
					{animatedType === PROGRESS_ANIMATED.DETERMINATE && (
						<Circle
							{...circleProps}
							stroke={trackColor}
							strokeLinecap='round'
							testID={`progressActiveIndicatorCircular__track--${id}`}
						/>
					)}

					<AnimatedCircle
						{...circleProps}
						animatedProps={circleAnimatedProps}
						stroke={activeIndicatorColor}
						strokeLinecap='round'
						testID={`progressActiveIndicatorCircular__animatedCircle--${id}`}
						transform={`rotate(-90, ${cx}, ${cy})`}
					/>
				</Svg>
			</AnimatedView>
		</View>
	)
}

RenderProgressActiveIndicatorCircular.displayName = 'RenderProgressActiveIndicatorCircular'
