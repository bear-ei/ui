import {useCallback, useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {UnderlayBaseProps, UnderlayState} from './Underlay.interface'

import {COMPONENT_STATUS, EVENT_NAME, type State} from '../../constants'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {handleUnderlayStateChange, updateUnderlayActive, updateUnderlayEventName} from './Underlay.handler'
import {RenderUnderlay} from './Underlay.render'
import {useUnderlayAnimated} from './use-underlay-animated.hook'

export const UnderlayBase: FC<UnderlayBaseProps> = ({
	active: rawActive,
	activeAnimatedType,
	activeScale,
	defaultActive,
	eventName: rawEventName,
	opacities,
	...renderUnderlayProps
}) => {
	const [{active: isActive, eventName, status}, setState] = useImmer<UnderlayState>({
		active: rawActive ?? defaultActive,
		eventName: EVENT_NAME.NONE,
		status: COMPONENT_STATUS.IDLE
	})

	const id = useId()
	const onStateEventChange = useCallback(
		(event: StateEvent, state: State, options: HandleStateEventChangeOptions) =>
			handleUnderlayStateChange(event, setState, {...options, state}),
		[setState]
	)

	const interactionHandlers = useInteractionStateEvent({...renderUnderlayProps, onStateEventChange})
	const {activeLayerAnimatedStyle, hoverLayerAnimatedStyle} = useUnderlayAnimated({
		active: isActive,
		activeAnimatedType,
		activeScale,
		eventName,
		opacities,
		status
	})

	const runUnderlayActive = useMemo(() => updateUnderlayActive(setState), [setState])
	const runUnderlayEventName = useMemo(() => updateUnderlayEventName(setState), [setState])

	useEffect(() => {
		runUnderlayEventName(rawEventName)
	}, [rawEventName, runUnderlayEventName])

	useEffect(() => {
		runUnderlayActive(rawActive)
	}, [rawActive, runUnderlayActive])

	return (
		<RenderUnderlay
			{...renderUnderlayProps}
			active={isActive}
			activeLayerAnimatedStyle={activeLayerAnimatedStyle}
			hoverLayerAnimatedStyle={hoverLayerAnimatedStyle}
			id={id}
			interactionHandlers={interactionHandlers}
		/>
	)
}
