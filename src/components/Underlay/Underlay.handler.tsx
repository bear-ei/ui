import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTiming, HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import type {UnderlayState} from './Underlay.interface'

import {COMPONENT_STATUS, EVENT_NAME, STATE, type EventName} from '../../constants'
import {ANIMATED_TIMING} from '../../theme'

export const handleUnderlayStateChange = (
	_event: StateEvent,
	setState: Updater<UnderlayState>,
	{eventName}: HandleStateEventChangeOptions
) => {
	if (eventName !== EVENT_NAME.LAYOUT) {
		return
	}

	setState(draft => {
		if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})
}

export const updateUnderlayEventName =
	(setState: Updater<UnderlayState>) =>
	(eventName: EventName = EVENT_NAME.NONE) =>
		setState(draft => {
			if (draft.eventName === eventName) {
				return
			}

			if (draft.eventName === EVENT_NAME.FOCUS) {
				draft.state = STATE.FOCUSED
			}

			if (draft.eventName === EVENT_NAME.BLUR || draft.eventName === EVENT_NAME.PRESS_IN) {
				draft.state = STATE.ENABLED
			}

			if (draft.state === STATE.FOCUSED && eventName === EVENT_NAME.HOVER_OUT) {
				draft.eventName = EVENT_NAME.FOCUS

				return
			}

			draft.eventName = eventName
		})

export const animateUnderlayHoverState = (
	sharedValue: SharedValue<number>,
	animatedTiming: AnimatedTiming,
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

	return (eventName?: EventName) => {
		if (!eventName) {
			return
		}

		const value = event[eventName]

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

export const animateUnderlayActiveState = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTiming) => {
	const animateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.STANDARD)

	return (active?: boolean) => {
		if (typeof active !== 'boolean') {
			return
		}

		animateSharedValueTo(active ? 1 : 0)
	}
}
