import {forwardRef} from 'react'
import {View} from 'react-native'
import {useTheme} from '../../../hooks'
import {SHAPE} from '../../../theme'
import {AnimatedView} from '../../Animated-component'
import {PROGRESS_ANIMATED} from '../Progress.enum'
import type {RenderProgressActiveIndicatorLinearProps} from './Progress-active-indicator-linear.interface'

export const RenderProgressActiveIndicatorLinear = forwardRef<View, RenderProgressActiveIndicatorLinearProps>(
	(
		{animatedType, contentAnimatedStyle, trackAnimatedStyle, id, interactionHandlers, testID, ...containerProps},
		ref
	) => {
		const {token} = useTheme()
		const {classesName, shapeClasses} = token.classes
		const shape = SHAPE.FULL

		return (
			<View
				{...interactionHandlers}
				className={classesName(
					'relative flex flex-1 flex-row self-stretch overflow-hidden',
					shapeClasses(shape)
				)}
				ref={ref}
				testID={testID ?? `progressActiveIndicatorLinear--${id}`}
			>
				<AnimatedView
					{...containerProps}
					className={classesName(
						'pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-20 origin-left bg-[--color-primary]',
						shapeClasses(shape)
					)}
					style={[contentAnimatedStyle]}
					testID={`progressActiveIndicatorLinear__animatedContent--${id}`}
				/>

				<AnimatedView
					className={classesName(
						'absolute bottom-0 right-0 top-0 h-[--border-extra-large] origin-right  self-stretch bg-[--color-secondary-container]',
						shapeClasses(shape)
					)}
					style={[trackAnimatedStyle]}
					testID={`progressActiveIndicatorLinear__animatedTrack--${id}`}
				/>

				{animatedType === PROGRESS_ANIMATED.DETERMINATE && (
					<View
						className={classesName(
							'absolute right-0 top-0 z-10 h-[--border-extra-large] w-[--border-extra-large] bg-[--color-primary]',
							shapeClasses(shape)
						)}
						testID={`progressActiveIndicatorLinear__stop--${id}`}
					/>
				)}
			</View>
		)
	}
)

RenderProgressActiveIndicatorLinear.displayName = 'RenderProgressActiveIndicatorLinear'
