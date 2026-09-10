import {AnimatedView} from '@/components/Animated-component'
import {useTheme} from '@/hooks'
import {platformValue} from '@/utils'
import {forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Circle, Svg} from 'react-native-svg'
import {PROGRESS_ANIMATED} from '../Progress.enum'
import type {RenderProgressActiveIndicatorCircularProps} from './Progress-active-indicator-circular.interface'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
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
			size,
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
		const circleProps = {
			cx: platformValue(cx),
			cy: platformValue(cy),
			r: platformValue(radius),
			strokeDasharray: platformValue(circumference),
			strokeDashoffset: platformValue(theme.token.spacing.none),
			strokeWidth: platformValue(strokeWidth)
		}

		return (
			<View
				{...containerProps}
				{...interactionHandlers}
				className='pointer-events-none relative flex-1 self-stretch'
				ref={ref}
				testID={testID ?? `progressActiveIndicatorCircular--${id}`}
			>
				<View
					className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
					testID={`progressActiveIndicatorCircular__content--${id}`}
				>
					{content}
				</View>

				<AnimatedView
					style={[containerAnimatedStyle]}
					testID={`progressActiveIndicatorCircular__animatedMain--${id}`}
				>
					<Svg
						fill='none'
						testID={`progressActiveIndicatorCircular__svg--${id}`}
						viewBox={`${theme.token.spacing.none} ${theme.token.spacing.none} ${size} ${size}`}
					>
						{animatedType === PROGRESS_ANIMATED.DETERMINATE && (
							<Circle
								{...circleProps}
								stroke={trackColor}
								strokeLinecap='round'
								testID={`progressActiveIndicatorCircular__circle--${id}`}
							/>
						)}

						<AnimatedCircle
							{...circleProps}
							animatedProps={circleAnimatedProps}
							stroke={activeIndicatorColor}
							strokeLinecap='round'
							testID={`progressActiveIndicatorCircular__animatedCircle--${id}`}
							transform={[{rotate: '180deg'}, {rotateX: `${cx}deg`}, {rotateY: `${cy}deg`}]}
						/>
					</Svg>
				</AnimatedView>
			</View>
		)
	}
)

RenderProgressActiveIndicatorCircular.displayName = 'RenderProgressActiveIndicatorCircular'
