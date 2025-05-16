import {nanoid} from 'nanoid'
import type {GestureResponderEvent} from 'react-native'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../hooks'
import {runAfterInteractions} from '../../utils'
import {EVENT_NAME, type EventName} from '../Common'
import type {AddTouchableRippleOptions, HandleTouchableStateChangeOptions, TouchableState} from './Touchable.interface'

export const handleTouchableStateChange =
	({eventName, enableTouchableRipple, ref}: HandleTouchableStateChangeOptions) =>
	(setState: Updater<TouchableState>) => {
		const addTouchableRipple = ({touchableLocation, contentLayout}: AddTouchableRippleOptions) => {
			const {width, height} = contentLayout

			setState(draft => {
				draft.contentLayout.height = height
				draft.contentLayout.width = width
				draft.rippleSequence[nanoid()] = touchableLocation
			})
		}

		const createTouchablePressInHandler = (event: GestureResponderEvent) => {
			ref.current?.focus()

			const {locationX, locationY} = event.nativeEvent

			if (enableTouchableRipple) {
				ref?.current?.measure((x, y, width, height) =>
					runAfterInteractions(addTouchableRipple)({
						contentLayout: {width, height, x, y},
						touchableLocation: {locationX, locationY}
					})
				)
			}
		}

		return (event: StateEvent) => {
			const nextEvent = {
				[EVENT_NAME.PRESS_IN]: () =>
					createTouchablePressInHandler(event as GestureResponderEvent)
			} as Record<EventName, () => void>

			if (eventName) {
				nextEvent[eventName]?.()
			}
		}
	}

export const deleteTouchableRippleByIndex = (setState: Updater<TouchableState>) => (index?: string) =>
	index &&
	setState(draft => {
		if (draft.rippleSequence[index]) {
			delete draft.rippleSequence[index]
		}
	})
