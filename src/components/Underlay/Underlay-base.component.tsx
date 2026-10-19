import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {COMPONENT_STATUS, type State} from '../../constants'
import {type HandleStateEventChangeOptions, type StateEvent, useInteractionStateEvent} from '../../hooks'
import {handleUnderlayStateChange, updateUnderlayActive, updateUnderlayEventName} from './Underlay.handler'
import type {UnderlayBaseProps, UnderlayState} from './Underlay.interface'
import {RenderUnderlay} from './Underlay.render'
import {useUnderlayAnimated} from './use-underlay-animated.hook'

export const UnderlayBase = forwardRef<View, UnderlayBaseProps>(
	(
		{
			active: rawActive,
			activeAnimatedType,
			activeScale,
			defaultActive,
			eventName: rawEventName,
			opacities,
			...renderUnderlayProps
		},
		ref
	) => {
		const [{status, eventName, active: isActive}, setState] = useImmer<UnderlayState>({
			active: rawActive ?? defaultActive,
			status: COMPONENT_STATUS.IDLE
		})

		const id = useId()
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleUnderlayStateChange({...options, state})(setState)(event),
			[setState]
		)

		const interactionHandlers = useInteractionStateEvent({...renderUnderlayProps, onStateEventChange})
		const {hoverLayerAnimatedStyle, activeLayerAnimatedStyle} = useUnderlayAnimated({
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
				ref={ref}
			/>
		)
	}
)

UnderlayBase.displayName = 'UnderlayBase'
