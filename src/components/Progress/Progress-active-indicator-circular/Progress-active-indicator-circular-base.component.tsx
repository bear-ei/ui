import {useCallback, useId, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {
	ProgressActiveIndicatorCircularBaseProps,
	ProgressActiveIndicatorCircularState
} from './Progress-active-indicator-circular.interface'

import {COMPONENT_STATUS, type InteractionState} from '../../../constants'
import {
	useInteractionStateEvent,
	useTheme,
	type HandleInteractionStateChangeOptions,
	type InteractionEvent
} from '../../../hooks'
import {BORDER_SIZE, DENSITY_SIZE} from '../../../theme'
import {handleProgressStateChange} from './Progress-active-indicator-circular.handler'
import {RenderProgressActiveIndicatorCircular} from './Progress-active-indicator-circular.render'
import {useProgressActiveIndicatorCircularAnimated} from './use-progress-active-indicator-circular-animated.hook'

export const ProgressActiveIndicatorCircularBase: FC<ProgressActiveIndicatorCircularBaseProps> = ({
	enableLoop,
	size = DENSITY_SIZE.MEDIUM,
	strokeWidth: rawStrokeWidth,
	...renderProgressActiveIndicatorCircularProps
}) => {
	const [{status}, setState] = useImmer<ProgressActiveIndicatorCircularState>({status: COMPONENT_STATUS.IDLE})
	const {token} = useTheme()
	const id = useId()
	const strokeWidth = rawStrokeWidth ?? token.border[BORDER_SIZE.X_LARGE]
	const viewBoxSize = token.density.inline[size]
	const radius = (viewBoxSize - strokeWidth) / 2
	const circumference = 2 * Math.PI * radius
	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, interactionState: InteractionState, options: HandleInteractionStateChangeOptions) =>
			handleProgressStateChange(event, setState, {...options, interactionState}),
		[setState]
	)

	const interactionHandlers = useInteractionStateEvent({
		...renderProgressActiveIndicatorCircularProps,
		onInteractionStateChange
	})

	const {circleAnimatedProps, containerAnimatedStyle} = useProgressActiveIndicatorCircularAnimated({
		circumference,
		enableLoop,
		status
	})

	return (
		<RenderProgressActiveIndicatorCircular
			{...renderProgressActiveIndicatorCircularProps}
			circleAnimatedProps={circleAnimatedProps}
			circumference={circumference}
			containerAnimatedStyle={containerAnimatedStyle}
			id={id}
			interactionHandlers={interactionHandlers}
			radius={radius}
			size={viewBoxSize}
			strokeWidth={strokeWidth}
		/>
	)
}
