import {useCallback, useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {UnderlayBaseProps, UnderlayState} from './Underlay.interface'

import {COMPONENT_STATUS, EVENT_NAME, type InteractionState} from '../../constants'
import {useInteractionStateEvent, type HandleInteractionStateChangeOptions, type InteractionEvent} from '../../hooks'
import {
	handleUnderlayInteractionStateChange,
	updateUnderlayActive,
	updateUnderlayInteractionEventName
} from './Underlay.handler'
import {RenderUnderlay} from './Underlay.render'
import {useUnderlayAnimated} from './use-underlay-animated.hook'

export const UnderlayBase: FC<UnderlayBaseProps> = ({
	active: rawActive,
	activeAnimation,
	activeScale,
	defaultActive,
	interactionEventName: rawEventName,
	opacities,
	...renderUnderlayProps
}) => {
	const [{active: isActive, interactionEventName, status}, setState] = useImmer<UnderlayState>({
		active: rawActive ?? defaultActive,
		interactionEventName: EVENT_NAME.NONE,
		status: COMPONENT_STATUS.IDLE
	})

	const id = useId()
	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, interactionState: InteractionState, options: HandleInteractionStateChangeOptions) =>
			handleUnderlayInteractionStateChange(event, setState, {...options, interactionState}),
		[setState]
	)

	const interactionHandlers = useInteractionStateEvent({...renderUnderlayProps, onInteractionStateChange})
	const {activeLayerAnimatedStyle, hoverLayerAnimatedStyle} = useUnderlayAnimated({
		active: isActive,
		activeAnimation,
		activeScale,
		interactionEventName,
		opacities,
		status
	})

	const runUnderlayActive = useMemo(() => updateUnderlayActive(setState), [setState])
	const runUnderlayEventName = useMemo(() => updateUnderlayInteractionEventName(setState), [setState])

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
