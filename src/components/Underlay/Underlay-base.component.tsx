import {forwardRef, useCallback, useId} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {COMPONENT_STATUS, type State} from '../Common'
import {handleUnderlayStateChange} from './Underlay.handler'
import type {UnderlayBaseProps, UnderlayState} from './Underlay.interface'
import {useUnderlayAnimated} from './use-underlay-animated.hook'

export const UnderlayBase = forwardRef<View, UnderlayBaseProps>(
	(
		{
			active: rawActive,
			activeAnimatedType,
			activeScale,
			defaultActive,
			eventName,
			opacities,
			renderUnderlay,
			...renderUnderlayProps
		},
		ref
	) => {
		const [{status}, setState] = useImmer<UnderlayState>({
			status: COMPONENT_STATUS.IDLE
		})

		const id = useId()
		const isActive = rawActive ?? defaultActive
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleUnderlayStateChange({...options, state})(setState)(event),
			[setState]
		)

		const interactionHandlers = useInteractionStateEvent({
			...renderUnderlayProps,
			onStateEventChange
		})

		const {hoverLayerAnimatedStyle, activeLayerAnimatedStyle} = useUnderlayAnimated({
			active: isActive,
			activeAnimatedType,
			activeScale,
			eventName,
			opacities,
			status
		})

		return renderUnderlay({
			...renderUnderlayProps,
			active: isActive,
			activeLayerAnimatedStyle,
			hoverLayerAnimatedStyle,
			id,
			interactionHandlers,
			ref
		})
	}
)
