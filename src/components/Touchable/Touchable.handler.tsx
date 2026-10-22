import type {GestureResponderEvent} from 'react-native'
import type {Updater} from 'use-immer'

import {nanoid} from 'nanoid'

import type {StateEvent} from '../../hooks'
import type {AddTouchableRippleOptions, HandleTouchableStateChangeOptions, TouchableState} from './Touchable.interface'

import {EVENT_NAME} from '../../constants'

export const handleTouchableStateChange = (
	event: StateEvent,
	setState: Updater<TouchableState>,
	{enableTouchableRipple, eventName, onStateEventChange, ref, state, ...options}: HandleTouchableStateChangeOptions
) => {
	const addTouchableRipple = ({contentLayout, touchableLocation}: AddTouchableRippleOptions) => {
		const {height, width} = contentLayout
		const indexKey = nanoid()

		setState(draft => {
			draft.contentLayout.height = height
			draft.contentLayout.width = width
			draft.rippleSequence[indexKey] = touchableLocation
		})
	}

	const createTouchablePressInHandler = (gestureEvent: GestureResponderEvent) => {
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
		createTouchablePressInHandler(event as GestureResponderEvent)
	}

	onStateEventChange?.(event, state, {...options, eventName})
}

export const deleteTouchableRippleByIndex = (setState: Updater<TouchableState>) => (index?: string) => {
	if (!index) {
		return
	}

	setState(draft => {
		if (draft.rippleSequence[index]) {
			Reflect.deleteProperty(draft.rippleSequence, index)
		}
	})
}
