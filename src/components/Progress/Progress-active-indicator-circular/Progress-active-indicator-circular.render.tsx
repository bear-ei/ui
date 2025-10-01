import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Circle, Svg} from 'react-native-svg'
import {useTheme} from 'styled-components/native'
import {PROGRESS_ANIMATED} from '../Progress.enum'
import type {RenderProgressActiveIndicatorCircularProps} from './Progress-active-indicator-circular.interface'
import {Container, Content, Main} from './Progress-active-indicator-circular.styles'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedMain = Animated.createAnimatedComponent(Main)
export const RenderProgressActiveIndicatorCircular = forwardRef<View, RenderProgressActiveIndicatorCircularProps>(
	(
		{
			animatedType = PROGRESS_ANIMATED.INDETERMINATE,
			circleAnimatedProps,
			circumference,
			containerAnimatedStyle,
			content,
			id,
			interactionHandlers,
			radius,
			size = 40,
			strokeWidth,
			testID,
			...containerProps
		},
		ref
	) => {
		const theme = useTheme()
		const activeIndicatorColor = theme.token.scheme.primary
		const cx = size / 2
		const cy = size / 2
		const trackColor = theme.token.scheme.primaryContainer

		return (
			<Container
				{...containerProps}
				{...interactionHandlers}
				ref={ref}
				testID={testID ?? `progressActiveIndicatorCircular--${id}`}
			>
				<Content testID={`progressActiveIndicatorCircular__content--${id}`}>{content}</Content>
				<AnimatedMain
					style={[containerAnimatedStyle]}
					testID={`progressActiveIndicatorCircular__animatedMain--${id}`}
				>
					<Svg
						fill='none'
						testID={`progressActiveIndicatorCircular__svg--${id}`}
						viewBox={`0 0 ${size} ${size}`}
					>
						{animatedType === PROGRESS_ANIMATED.DETERMINATE && (
							<Circle
								cx={cx}
								cy={cy}
								r={radius}
								stroke={trackColor}
								strokeDasharray={circumference}
								strokeDashoffset={0}
								strokeLinecap='round'
								strokeWidth={strokeWidth}
								testID={`progressActiveIndicatorCircular__circle--${id}`}
							/>
						)}

						<AnimatedCircle
							animatedProps={circleAnimatedProps}
							cx={cx}
							cy={cy}
							r={radius}
							rotation={`180 ${cx} ${cy}`}
							stroke={activeIndicatorColor}
							strokeDasharray={circumference}
							strokeLinecap='round'
							strokeWidth={strokeWidth}
							testID={`progressActiveIndicatorCircular__animatedCircle--${id}`}
						/>
					</Svg>
				</AnimatedMain>
			</Container>
		)
	}
)
