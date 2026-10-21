import {forwardRef} from 'react'
import {View} from 'react-native'

import {useTheme} from '../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE} from '../../theme'

import {ProgressActiveIndicatorCircular} from './Progress-active-indicator-circular'
import {ProgressActiveIndicatorLinear} from './Progress-active-indicator-linear'
import {PROGRESS_ANIMATED, PROGRESS_TYPE} from './Progress.enum'
import type {RenderProgressProps} from './Progress.interface'

export const RenderProgress = forwardRef<View, RenderProgressProps>(
	(
		{
			animatedType,
			content,
			defaultValue,
			enableAnimated,
			id,
			size = DENSITY_SIZE.MEDIUM,
			strokeWidth,
			testID,
			type = PROGRESS_TYPE.LINEAR,
			value,
			...containerProps
		},
		ref
	) => {
		const {token} = useTheme()
		const {densityClasses, classesName} = token.classes
		const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)()
		const resolvedAnimatedType =
			animatedType ??
			(type === PROGRESS_TYPE.LINEAR ? PROGRESS_ANIMATED.DETERMINATE : PROGRESS_ANIMATED.INDETERMINATE)

		return (
			<View
				{...containerProps}
				accessibilityRole='progressbar'
				className={classesName('pointer-events-none flex flex-col', {
					['h-[--border-x-large] min-w-[--density-inline-medium] self-stretch']:
						type === PROGRESS_TYPE.LINEAR,

					[densityInlineClasses(size)]: type === PROGRESS_TYPE.CIRCULAR
				})}
				ref={ref}
				testID={testID ?? `progress--${id}`}
			>
				{type === PROGRESS_TYPE.CIRCULAR && (
					<ProgressActiveIndicatorCircular
						animatedType={resolvedAnimatedType}
						content={content}
						enableAnimated={enableAnimated}
						size={size}
						strokeWidth={strokeWidth}
						testID={`progress__progressActiveIndicatorCircular--${id}`}
					/>
				)}

				{type === PROGRESS_TYPE.LINEAR && (
					<ProgressActiveIndicatorLinear
						animatedType={resolvedAnimatedType}
						defaultValue={defaultValue}
						testID={`progress__progressActiveIndicatorLinear--${id}`}
						value={value}
					/>
				)}
			</View>
		)
	}
)

RenderProgress.displayName = 'RenderProgress'
