import {nanoid} from 'nanoid'
import type {GestureResponderEvent} from 'react-native'
import type {Updater} from 'use-immer'

import {EVENT_NAME} from '../../constants'
import type {StateEvent} from '../../hooks'

import type {AddTouchableRippleOptions, HandleTouchableStateChangeOptions, TouchableState} from './Touchable.interface'

export const handleTouchableStateChange =
	({
		enableTouchableRipple,
		eventName,
		onStateEventChange,
		ref,
		state,
		...options
	}: HandleTouchableStateChangeOptions) =>
	(setState: Updater<TouchableState>) => {
		const addTouchableRipple = ({touchableLocation, contentLayout}: AddTouchableRippleOptions) => {
			const {width, height} = contentLayout
			const indexKey = nanoid()

			setState(draft => {
				draft.contentLayout.height = height
				draft.contentLayout.width = width
				draft.rippleSequence[indexKey] = touchableLocation
			})
		}

		const createTouchablePressInHandler = (event: GestureResponderEvent) => {
			ref.current?.focus()

			const {locationX, locationY} = event.nativeEvent

			if (enableTouchableRipple) {
				ref.current?.measure((_x, _y, width, height) =>
					addTouchableRipple({
						contentLayout: {width, height},
						touchableLocation: {locationX, locationY}
					})
				)
			}
		}

		return (event: StateEvent) => {
			if (eventName === EVENT_NAME.PRESS_IN) {
				createTouchablePressInHandler(event as GestureResponderEvent)
			}

			onStateEventChange?.({...options, eventName})(state)(event)
		}
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
