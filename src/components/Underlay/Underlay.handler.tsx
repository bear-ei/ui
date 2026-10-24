import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTimingFactory, HandleInteractionStateChangeOptions, InteractionEvent} from '../../hooks'
import type {UnderlayState} from './Underlay.interface'

import {COMPONENT_STATUS, EVENT_NAME, INTERACTION_STATE, type EventName} from '../../constants'
import {ANIMATED_TIMING} from '../../theme'

export const handleUnderlayInteractionStateChange = (
	_event: InteractionEvent,
	setState: Updater<UnderlayState>,
	{eventName: interactionEventName}: HandleInteractionStateChangeOptions
) => {
	if (interactionEventName !== EVENT_NAME.LAYOUT) {
		return
	}

	setState(draft => {
		if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})
}

export const updateUnderlayInteractionEventName =
	(setState: Updater<UnderlayState>) =>
	(interactionEventName: EventName = EVENT_NAME.NONE) =>
		setState(draft => {
			if (draft.interactionEventName === interactionEventName) {
				return
			}

			if (draft.interactionEventName === EVENT_NAME.FOCUS) {
				draft.interactionState = INTERACTION_STATE.FOCUSED
			}

			if (draft.interactionEventName === EVENT_NAME.BLUR || draft.interactionEventName === EVENT_NAME.PRESS_IN) {
				draft.interactionState = INTERACTION_STATE.ENABLED
			}

			if (draft.interactionState === INTERACTION_STATE.FOCUSED && interactionEventName === EVENT_NAME.HOVER_OUT) {
				draft.interactionEventName = EVENT_NAME.FOCUS

				return
			}

			draft.interactionEventName = interactionEventName
		})

export const animateUnderlayHoverState = (
	sharedValue: SharedValue<number>,
	animatedTiming: AnimatedTimingFactory,
	activeValue: number
) => {
	const event: Partial<Record<EventName, number>> = {
		[EVENT_NAME.BLUR]: 0,
		[EVENT_NAME.FOCUS]: activeValue,
		[EVENT_NAME.HOVER_IN]: 1,
		[EVENT_NAME.HOVER_OUT]: 0,
		[EVENT_NAME.LONG_PRESS]: activeValue,
		[EVENT_NAME.NONE]: 0,
		[EVENT_NAME.PRESS]: 1,
		[EVENT_NAME.PRESS_IN]: activeValue,
		[EVENT_NAME.PRESS_OUT]: 1
	}

	const animateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.HOVER)

	return (interactionEventName?: EventName) => {
		if (!interactionEventName) {
			return
		}

		const value = event[interactionEventName]

		if (typeof value === 'number') {
			animateSharedValueTo(value)
		}
	}
}

export const updateUnderlayActive = (setState: Updater<UnderlayState>) => (active?: boolean) => {
	if (typeof active !== 'boolean') {
		return
	}

	setState(draft => {
		if (draft.active === active) {
			return
		}

		draft.active = active
	})
}

export const animateUnderlayActiveState = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTimingFactory) => {
	const animateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.STANDARD)

	return (active?: boolean) => {
		if (typeof active !== 'boolean') {
			return
		}

		animateSharedValueTo(active ? 1 : 0)
	}
}
