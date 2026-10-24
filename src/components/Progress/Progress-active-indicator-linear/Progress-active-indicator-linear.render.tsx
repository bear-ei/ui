import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderProgressActiveIndicatorLinearProps} from './Progress-active-indicator-linear.interface'

import {useTheme} from '../../../hooks'
import {RADIUS, SHAPE} from '../../../theme'
import {AnimatedView} from '../../Animated'
import {PROGRESS_MODE} from '../Progress.enum'

export const RenderProgressActiveIndicatorLinear: FC<RenderProgressActiveIndicatorLinearProps> = ({
	contentAnimatedStyle,
	id,
	interactionHandlers,
	mode,
	testID,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classNames, shapeClasses} = token.classes
	const shape = SHAPE.ALL
	const radius = RADIUS.FULL
	const radiusClassName = shapeClasses(shape)(radius)

	return (
		<View
			{...interactionHandlers}
			className={classNames(
				'relative flex flex-1 flex-row gap-[--density-spacing-x-small] self-stretch overflow-hidden',
				radiusClassName
			)}
			testID={testID ?? `progressActiveIndicatorLinear--${id}`}
		>
			<AnimatedView
				{...containerProps}
				className={classNames('pointer-events-none z-20 bg-[--color-primary]', radiusClassName)}
				style={contentAnimatedStyle}
				testID={`progressActiveIndicatorLinear__animatedContent--${id}`}
			/>

			<View
				className={classNames(
					'h-[--border-x-large] flex-1 self-stretch bg-[--color-secondary-container]',
					radiusClassName
				)}
				testID={`progressActiveIndicatorLinear__track--${id}`}
			/>

			{mode === PROGRESS_MODE.DETERMINATE && (
				<View
					className={classNames(
						'absolute right-0 top-0 z-10 h-[--border-x-large] w-[--border-x-large] bg-[--color-primary]',
						radiusClassName
					)}
					testID={`progressActiveIndicatorLinear__stop--${id}`}
				/>
			)}
		</View>
	)
}
