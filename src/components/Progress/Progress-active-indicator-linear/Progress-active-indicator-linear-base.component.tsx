import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'

import {COMPONENT_STATUS, type State} from '../../../constants'
import {type HandleStateEventChangeOptions, type StateEvent, useInteractionStateEvent} from '../../../hooks'

import {handleProgressStateChange, updateProgressValue} from './Progress-active-indicator-linear.handler'
import type {
	ProgressActiveIndicatorLinearBaseProps,
	ProgressActiveIndicatorLinearState
} from './Progress-active-indicator-linear.interface'
import {RenderProgressActiveIndicatorLinear} from './Progress-active-indicator-linear.render'
import {useProgressActiveIndicatorLinearAnimated} from './use-progress-active-indicator-linear-animated.hook'

export const ProgressActiveIndicatorLinearBase = forwardRef<View, ProgressActiveIndicatorLinearBaseProps>(
	({defaultValue, value: rawValue, ...renderProgressActiveIndicatorLinearProps}, ref) => {
		const [{status, value}, setState] = useImmer<ProgressActiveIndicatorLinearState>({
			status: COMPONENT_STATUS.IDLE,
			value: rawValue ?? defaultValue
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

		const {contentAnimatedStyle} = useProgressActiveIndicatorLinearAnimated({value, status})
		const runUpdateProgressValue = useMemo(() => updateProgressValue(setState), [setState])

		useEffect(() => {
			runUpdateProgressValue(rawValue)
		}, [rawValue, runUpdateProgressValue])

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

ProgressActiveIndicatorLinearBase.displayName = 'ProgressActiveIndicatorLinearBase'
