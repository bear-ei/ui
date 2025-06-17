import {forwardRef, useCallback, useId} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../../hooks'
import {COMPONENT_STATUS, type State} from '../../Common'
import {handleProgressStateChange} from './Progress-active-indicator-linear.handler'
import type {
	ProgressActiveIndicatorLinearBaseProps,
	ProgressActiveIndicatorLinearState
} from './Progress-active-indicator-linear.interface'
import {RenderProgressActiveIndicatorLinear} from './Progress-active-indicator-linear.render'
import {useProgressActiveIndicatorLinearAnimated} from './use-progress-active-indicator-linear-animated.hook'

export const ProgressActiveIndicatorLinearBase = forwardRef<View, ProgressActiveIndicatorLinearBaseProps>(
	({defaultValue, value, ...renderProgressActiveIndicatorLinearProps}, ref) => {
		const [{status}, setState] = useImmer<ProgressActiveIndicatorLinearState>({
			status: COMPONENT_STATUS.IDLE
		})

		const id = useId()
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleProgressStateChange({...options, state})(setState)(event),
			[setState]
		)

		const interactionHandlers = useInteractionStateEvent({
			...renderProgressActiveIndicatorLinearProps,
			onStateEventChange
		})

		const {contentAnimatedStyle} = useProgressActiveIndicatorLinearAnimated({defaultValue, value, status})

		return (
			<RenderProgressActiveIndicatorLinear
				{...renderProgressActiveIndicatorLinearProps}
				contentAnimatedStyle={contentAnimatedStyle}
				id={id}
				interactionHandlers={interactionHandlers}
				ref={ref}
			/>
		)
	}
)
