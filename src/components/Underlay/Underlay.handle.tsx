import type {SharedValue} from 'react-native-reanimated'
import type {AnimatedTiming} from '../../hooks'
import {EVENT_NAME, type EventName} from '../Common'
import type {AnimateUnderlayHoverStateOptions} from './Underlay.interface'

export const animateUnderlayHoverState = ({animatedTiming, activeValue}: AnimateUnderlayHoverStateOptions) => {
	const event = {
		[EVENT_NAME.BLUR]: 0,
		[EVENT_NAME.FOCUS]: activeValue,
		[EVENT_NAME.HOVER_IN]: 1,
		[EVENT_NAME.HOVER_OUT]: 0,
		[EVENT_NAME.LONG_PRESS]: activeValue,
		[EVENT_NAME.NONE]: 0,
		[EVENT_NAME.PRESS_IN]: activeValue,
		[EVENT_NAME.PRESS_OUT]: 1,
		[EVENT_NAME.PRESS]: 1
	} as Record<EventName, number>

	const eventKeys = Object.keys(event)

	return (hoverLayerSharedValue: SharedValue<number>) => (eventName?: EventName) =>
		eventName && eventKeys.includes(eventName) && animatedTiming()(hoverLayerSharedValue)(event[eventName])
}

export const animateUnderlayActiveState =
	(animatedTiming: AnimatedTiming) => (activeLayerSharedValue: SharedValue<number>) => (active?: boolean) =>
		typeof active === 'boolean' && animatedTiming()(activeLayerSharedValue)(active ? 1 : 0)
