import {forwardRef, useCallback, useId} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../../hooks'
import {COMPONENT_STATUS, type State} from '../../Common'
import {handleProgressStateChange} from './Progress-active-indicator-circular.handler'
import type {
	ProgressActiveIndicatorCircularBaseProps,
	ProgressActiveIndicatorCircularState
} from './Progress-active-indicator-circular.interface'
import {RenderProgressActiveIndicatorCircular} from './Progress-active-indicator-circular.render'
import {useProgressActiveIndicatorCircularAnimated} from './use-progress-active-indicator-circular-animated.hook'

export const ProgressActiveIndicatorCircularBase = forwardRef<View, ProgressActiveIndicatorCircularBaseProps>(
	(
		{
			enableAnimated,
			size: rawSize,
			strokeWidth: rawStrokeWidth,
			...renderProgressActiveIndicatorCircularProps
		},
		ref
	) => {
		const [{status}, setState] = useImmer<ProgressActiveIndicatorCircularState>({
			status: COMPONENT_STATUS.IDLE
		})

		const theme = useTheme()
		const id = useId()
		const strokeWidth = rawStrokeWidth ?? theme.adaptSize(theme.token.spacing.extraSmall)
		const size = rawSize ?? theme.adaptSize(theme.token.spacing.extraSmall * 12)
		const radius = (size - strokeWidth) / 2
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
				size={size}
				strokeWidth={strokeWidth}
			/>
		)
	}
)
