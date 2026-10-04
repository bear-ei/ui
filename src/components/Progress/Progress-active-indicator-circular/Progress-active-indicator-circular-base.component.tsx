import {forwardRef, useCallback, useId} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {COMPONENT_STATUS, type State} from '../../../constants'
import {type HandleStateEventChangeOptions, type StateEvent, useInteractionStateEvent, useTheme} from '../../../hooks'
import {handleProgressStateChange} from './Progress-active-indicator-circular.handler'
import type {
	ProgressActiveIndicatorCircularBaseProps,
	ProgressActiveIndicatorCircularState
} from './Progress-active-indicator-circular.interface'
import {RenderProgressActiveIndicatorCircular} from './Progress-active-indicator-circular.render'
import {useProgressActiveIndicatorCircularAnimated} from './use-progress-active-indicator-circular-animated.hook'
import {SIZE} from '../../../theme'

export const ProgressActiveIndicatorCircularBase = forwardRef<View, ProgressActiveIndicatorCircularBaseProps>(
	(
		{
			enableAnimated,
			size = SIZE.MEDIUM,
			strokeWidth: rawStrokeWidth,
			...renderProgressActiveIndicatorCircularProps
		},
		ref
	) => {
		const [{status}, setState] = useImmer<ProgressActiveIndicatorCircularState>({status: COMPONENT_STATUS.IDLE})
		const {token} = useTheme()
		const id = useId()
		const strokeWidth = rawStrokeWidth ?? token.border[SIZE.EXTRA_LARGE]
		const viewBoxSize = token.density.inline[size]
		const radius = (viewBoxSize - strokeWidth) / 2
		const circumference = 2 * Math.PI * radius
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleProgressStateChange({...options, state})(setState)(event),
			[setState]
		)

		const interactionHandlers = useInteractionStateEvent({
			...renderProgressActiveIndicatorCircularProps,
			onStateEventChange
		})

		const {containerAnimatedStyle, circleAnimatedProps} = useProgressActiveIndicatorCircularAnimated({
			circumference,
			enableAnimated,
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
				ref={ref}
				size={viewBoxSize}
				strokeWidth={strokeWidth}
			/>
		)
	}
)

ProgressActiveIndicatorCircularBase.displayName = 'ProgressActiveIndicatorCircularBase'
