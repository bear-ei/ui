import {forwardRef} from 'react'
import type {View} from 'react-native'
import {ProgressActiveIndicatorCircular} from './Progress-active-indicator-circular'
import {ProgressActiveIndicatorLinear} from './Progress-active-indicator-linear'
import {PROGRESS_ANIMATED, PROGRESS_TYPE} from './Progress.enum'
import type {RenderProgressProps} from './Progress.interface'
import {Container} from './Progress.styles'

export const RenderProgress = forwardRef<View, RenderProgressProps>(
	(
		{
			animatedType = PROGRESS_ANIMATED.INDETERMINATE,
			content,
			defaultValue,
			enableAnimated,
			id,
			size,
			strokeWidth,
			testID,
			type = PROGRESS_TYPE.LINEAR,
			value,
			...containerProps
		},
		ref
	) => (
		<Container
			{...containerProps}
			accessibilityRole='progressbar'
			progressing={!!(value && value > 0)}
			ref={ref}
			testID={testID ?? `progress--${id}`}
			type={type}
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
		</Container>
	)
)
