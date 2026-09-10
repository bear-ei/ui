import {classesName} from '@/utils'
import {SIZE} from '@bearei/theme-token'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {ProgressActiveIndicatorCircular} from './Progress-active-indicator-circular'
import {ProgressActiveIndicatorLinear} from './Progress-active-indicator-linear'
import {PROGRESS_ANIMATED, PROGRESS_TYPE} from './Progress.enum'
import type {RenderProgressProps} from './Progress.interface'

export const RenderProgress = forwardRef<View, RenderProgressProps>(
	(
		{
			animatedType = PROGRESS_ANIMATED.INDETERMINATE,
			content,
			defaultValue,
			enableAnimated,
			id,
			size = SIZE.MEDIUM,
			strokeWidth,
			testID,
			type = PROGRESS_TYPE.LINEAR,
			value,
			...containerProps
		},
		ref
	) => (
		<View
			{...containerProps}
			accessibilityRole='progressbar'
			className={classesName('pointer-events-none flex flex-col self-stretch', {
				['gap-1']: !!(value && value > 0) && type === PROGRESS_TYPE.LINEAR,
				['h-1 min-w-10']: type === PROGRESS_TYPE.LINEAR,
				['h-10 w-10']: type === PROGRESS_TYPE.CIRCULAR && size === SIZE.MEDIUM,
				['h-12 w-12']: type === PROGRESS_TYPE.CIRCULAR && size === SIZE.LARGE,
				['h-14 w-14']: type === PROGRESS_TYPE.CIRCULAR && size === SIZE.EXTRA_LARGE,
				['h-6 w-6']: type === PROGRESS_TYPE.CIRCULAR && size === SIZE.EXTRA_SMALL,
				['h-8 w-8']: type === PROGRESS_TYPE.CIRCULAR && size === SIZE.SMALL
			})}
			ref={ref}
			testID={testID ?? `progress--${id}`}
		>
			{type === PROGRESS_TYPE.CIRCULAR && (
				<ProgressActiveIndicatorCircular
					animatedType={animatedType}
					content={content}
					enableAnimated={enableAnimated}
					size={size}
					strokeWidth={strokeWidth}
					testID={`progress__progressActiveIndicatorCircular--${id}`}
				/>
			)}

			{type === PROGRESS_TYPE.LINEAR && (
				<ProgressActiveIndicatorLinear
					animatedType={animatedType}
					defaultValue={defaultValue}
					testID={`progress__progressActiveIndicatorLinear--${id}`}
					value={value}
				/>
			)}
		</View>
	)
)

RenderProgress.displayName = 'RenderProgress'
