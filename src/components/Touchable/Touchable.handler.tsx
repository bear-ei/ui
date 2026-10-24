import type {GestureResponderEvent} from 'react-native'
import type {Updater} from 'use-immer'

import {nanoid} from 'nanoid'

import type {InteractionEvent} from '../../hooks'
import type {
	AddTouchableRippleOptions,
	HandleTouchableInteractionStateChangeOptions,
	TouchableState
} from './Touchable.interface'

import {EVENT_NAME} from '../../constants'

export const handleTouchableStateChange = (
	event: InteractionEvent,
	setState: Updater<TouchableState>,
	{
		enableTouchableRipple,
		eventName,
		interactionState,
		onInteractionStateChange,
		ref,
		...options
	}: HandleTouchableInteractionStateChangeOptions
) => {
	const addTouchableRipple = ({contentLayout, touchableLocation}: AddTouchableRippleOptions) => {
		const {height, width} = contentLayout
		const rippleKey = nanoid()

		setState(draft => {
			draft.contentLayout.height = height
			draft.contentLayout.width = width
			draft.rippleLocations[rippleKey] = touchableLocation
		})
	}

	const handleTouchablePressIn = (gestureEvent: GestureResponderEvent) => {
		ref.current?.focus()

		const {locationX, locationY} = gestureEvent.nativeEvent

		if (enableTouchableRipple) {
			ref.current?.measure((_x, _y, width, height) =>
				addTouchableRipple({
					contentLayout: {height, width},
					touchableLocation: {locationX, locationY}
				})
			)
		}
	}

	if (eventName === EVENT_NAME.PRESS_IN) {
		handleTouchablePressIn(event as GestureResponderEvent)
	}

	onInteractionStateChange?.(event, interactionState, {...options, eventName})
}

export const deleteTouchableRippleByKey = (setState: Updater<TouchableState>) => (rippleKey?: string) => {
	if (!rippleKey) {
		return
	}

	setState(draft => {
		if (draft.rippleLocations[rippleKey]) {
			Reflect.deleteProperty(draft.rippleLocations, rippleKey)
		}
	})
}
