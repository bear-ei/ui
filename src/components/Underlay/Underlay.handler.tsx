import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import {COMPONENT_STATUS, EVENT_NAME, STATE, type EventName} from '../../constants'
import type {AnimatedTimingOptions, AnimateSharedValueTo, HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import type {AnimateUnderlayHoverStateOptions, UnderlayState} from './Underlay.interface'
import {DURATION, EASING} from '../../theme'

export const handleUnderlayStateChange =
	({eventName}: HandleStateEventChangeOptions) =>
	(setState: Updater<UnderlayState>) =>
	(_event: StateEvent) =>
		setState(draft => {
			if (eventName === EVENT_NAME.LAYOUT && draft.status !== COMPONENT_STATUS.SUCCEEDED) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}
		})

export const updateUnderlayEventName = (setState: Updater<UnderlayState>) => (eventName?: EventName) =>
	setState(draft => {
		if (draft.eventName === EVENT_NAME.FOCUS) {
			draft.state = STATE.FOCUSED
		}

		const eventNames = [EVENT_NAME.BLUR, EVENT_NAME.PRESS_IN] as readonly EventName[]

		if (draft.eventName && eventNames.includes(draft.eventName)) {
			draft.state = STATE.ENABLED
		}

		if (draft.state === STATE.FOCUSED && eventName === EVENT_NAME.HOVER_OUT) {
			draft.eventName = EVENT_NAME.FOCUS

			return
		}

		draft.eventName = eventName
	})

export const animateUnderlayHoverState = ({animatedTiming, activeValue}: AnimateUnderlayHoverStateOptions) => {
	const event = {
		[EVENT_NAME.BLUR]: 0,
		[EVENT_NAME.FOCUS]: activeValue,
		[EVENT_NAME.HOVER_IN]: 1,
		[EVENT_NAME.HOVER_OUT]: 0,
		[EVENT_NAME.LONG_PRESS]: activeValue,
		[EVENT_NAME.NONE]: 0,
		[EVENT_NAME.PRESS]: 1,
		[EVENT_NAME.PRESS_IN]: activeValue,
		[EVENT_NAME.PRESS_OUT]: 1
	} as Record<EventName, number>

	const eventKeys = Object.keys(event)
	const animateSharedValueTo = animatedTiming({easing: EASING.STANDARD, duration: DURATION.SHORT_1})

	return (hoverLayerSharedValue: SharedValue<number>) => (eventName?: EventName) =>
		eventName &&
		eventKeys.includes(eventName) &&
		animateSharedValueTo({sharedValue: hoverLayerSharedValue})(event[eventName])
}

export const animateUnderlayActiveState = (
	animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo
) => {
	const enterAnimatedTiming = animatedTiming({easing: EASING.STANDARD_DECELERATE, duration: DURATION.SHORT_2})
	const exitAnimatedTiming = animatedTiming({easing: EASING.STANDARD_ACCELERATE, duration: DURATION.SHORT_2})

	return (activeLayerSharedValue: SharedValue<number>) => (active?: boolean) => {
		if (typeof active !== 'boolean') {
			return
		}

		const animate = active ? enterAnimatedTiming : exitAnimatedTiming

		animate({sharedValue: activeLayerSharedValue})(active ? 1 : 0)
	}
}
