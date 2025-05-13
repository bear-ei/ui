import {ProgressActiveIndicatorCircular} from './Progress-active-indicator-circular'
import {ProgressActiveIndicatorLinear} from './Progress-active-indicator-linear'
import {PROGRESS_ANIMATED, PROGRESS_TYPE} from './Progress.enum'
import type {RenderProgressProps} from './Progress.interface'
import {Container} from './Progress.styles'

export const renderProgress = ({
	animatedType = PROGRESS_ANIMATED.INDETERMINATE,
	content,
	defaultValue,
	id,
	increment,
	interactionHandlers,
	layout,
	size,
	strokeWidth,
	testID,
	type = PROGRESS_TYPE.LINEAR,
	value,
	...containerProps
}: RenderProgressProps) => (
	<Container
		{...containerProps}
		{...interactionHandlers}
		accessibilityRole='progressbar'
		pointerEvents='none'
		progressing={!!(value && value > 0)}
		testID={testID ?? `progress--${id}`}
		type={type}
	>
		{type === PROGRESS_TYPE.CIRCULAR && (
			<ProgressActiveIndicatorCircular
				animatedType={animatedType}
				content={content}
				size={size}
				strokeWidth={strokeWidth}
				testID={`progress__progressActiveIndicatorCircular--${id}`}
			/>
		)}

		{type === PROGRESS_TYPE.LINEAR && typeof layout.width === 'number' && layout.width !== 0 && (
			<ProgressActiveIndicatorLinear
				animatedType={animatedType}
				containerLayout={layout}
				defaultValue={defaultValue}
				increment={increment}
				testID={`progress__progressActiveIndicatorLinear--${id}`}
				value={value}
			/>
		)}
	</Container>
)
