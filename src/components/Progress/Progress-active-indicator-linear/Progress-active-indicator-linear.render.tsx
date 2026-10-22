import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderProgressActiveIndicatorLinearProps} from './Progress-active-indicator-linear.interface'

import {useTheme} from '../../../hooks'
import {RADIUS, SHAPE} from '../../../theme'
import {AnimatedView} from '../../Animated'
import {PROGRESS_ANIMATED} from '../Progress.enum'

export const RenderProgressActiveIndicatorLinear: FC<RenderProgressActiveIndicatorLinearProps> = ({
	animatedType,
	contentAnimatedStyle,
	id,
	interactionHandlers,
	testID,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classesName, shapeClasses} = token.classes
	const shape = SHAPE.ALL
	const radius = RADIUS.FULL

	return (
		<View
			{...interactionHandlers}
			className={classesName(
				'relative flex flex-1 flex-row gap-[--density-spacing-x-small] self-stretch overflow-hidden',
				shapeClasses(shape, radius)
			)}
			testID={testID ?? `progressActiveIndicatorLinear--${id}`}
		>
			<AnimatedView
				{...containerProps}
				className={classesName('pointer-events-none z-20 bg-[--color-primary]', shapeClasses(shape, radius))}
				style={contentAnimatedStyle}
				testID={`progressActiveIndicatorLinear__animatedContent--${id}`}
			/>

			<View
				className={classesName(
					'h-[--border-x-large] flex-1 self-stretch bg-[--color-secondary-container]',
					shapeClasses(shape, radius)
				)}
				testID={`progressActiveIndicatorLinear__track--${id}`}
			/>

			{animatedType === PROGRESS_ANIMATED.DETERMINATE && (
				<View
					className={classesName(
						'absolute right-0 top-0 z-10 h-[--border-x-large] w-[--border-x-large] bg-[--color-primary]',
						shapeClasses(shape, radius)
					)}
					testID={`progressActiveIndicatorLinear__stop--${id}`}
				/>
			)}
		</View>
	)
}

RenderProgressActiveIndicatorLinear.displayName = 'RenderProgressActiveIndicatorLinear'
