import {useCallback, useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {
	ProgressActiveIndicatorLinearBaseProps,
	ProgressActiveIndicatorLinearState
} from './Progress-active-indicator-linear.interface'

import {COMPONENT_STATUS, type InteractionState} from '../../../constants'
import {useInteractionStateEvent, type HandleInteractionStateChangeOptions, type InteractionEvent} from '../../../hooks'
import {handleProgressStateChange, updateProgressValue} from './Progress-active-indicator-linear.handler'
import {RenderProgressActiveIndicatorLinear} from './Progress-active-indicator-linear.render'
import {useProgressActiveIndicatorLinearAnimated} from './use-progress-active-indicator-linear-animated.hook'

export const ProgressActiveIndicatorLinearBase: FC<ProgressActiveIndicatorLinearBaseProps> = ({
	defaultValue,
	value: rawValue,
	...renderProgressActiveIndicatorLinearProps
}) => {
	const [{status, value}, setState] = useImmer<ProgressActiveIndicatorLinearState>({
		status: COMPONENT_STATUS.IDLE,
		value: rawValue ?? defaultValue
	})

	const id = useId()
	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, interactionState: InteractionState, options: HandleInteractionStateChangeOptions) =>
			handleProgressStateChange(event, setState, {...options, interactionState}),
		[setState]
	)

	const interactionHandlers = useInteractionStateEvent({
		...renderProgressActiveIndicatorLinearProps,
		onInteractionStateChange
	})

	const {contentAnimatedStyle} = useProgressActiveIndicatorLinearAnimated({status, value})
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
		/>
	)
}
