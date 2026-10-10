import {forwardRef} from 'react'
import {View} from 'react-native'
import {useTheme} from '../../../hooks'
import {RADIUS, SHAPE} from '../../../theme'
import {AnimatedView} from '../../Animated-component'
import {PROGRESS_ANIMATED} from '../Progress.enum'
import type {RenderProgressActiveIndicatorLinearProps} from './Progress-active-indicator-linear.interface'

export const RenderProgressActiveIndicatorLinear = forwardRef<View, RenderProgressActiveIndicatorLinearProps>(
	({animatedType, contentAnimatedStyle, id, interactionHandlers, testID, ...containerProps}, ref) => {
		const {token} = useTheme()
		const {classesName, shapeClasses} = token.classes
		const shape = SHAPE.ALL
		const radius = RADIUS.FULL

		return (
			<View
				{...interactionHandlers}
				className={classesName(
					'relative flex flex-1 flex-row gap-[--density-spacing-x-small] self-stretch overflow-hidden',
					shapeClasses(radius)(shape)
				)}
				ref={ref}
				testID={testID ?? `progressActiveIndicatorLinear--${id}`}
			>
				<AnimatedView
					{...containerProps}
					className={classesName(
						'pointer-events-none z-20 bg-[--color-primary]',
						shapeClasses(radius)(shape)
					)}
					style={[contentAnimatedStyle]}
					testID={`progressActiveIndicatorLinear__animatedContent--${id}`}
				/>

				<View
					className={classesName(
						'h-[--border-x-large] flex-1 self-stretch bg-[--color-secondary-container]',
						shapeClasses(radius)(shape)
					)}
					testID={`progressActiveIndicatorLinear__track--${id}`}
				/>

				{animatedType === PROGRESS_ANIMATED.DETERMINATE && (
					<View
						className={classesName(
							'absolute right-0 top-0 z-10 h-[--border-x-large] w-[--border-x-large] bg-[--color-primary]',
							shapeClasses(radius)(shape)
						)}
						testID={`progressActiveIndicatorLinear__stop--${id}`}
					/>
				)}
			</View>
		)
	}
)

RenderProgressActiveIndicatorLinear.displayName = 'RenderProgressActiveIndicatorLinear'
