import {nanoid} from 'nanoid'
import type {GestureResponderEvent} from 'react-native'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../hooks'
import {runAfterInteractions} from '../../utils'
import type {EventName} from '../Common'
import type {
	HandleAddTouchableRippleOptions,
	HandleTouchablePressInOptions,
	HandleTouchableStateChangeOptions,
	TouchableState
} from './Touchable.interface'

const handleAddTouchableRipple =
	(setState: Updater<TouchableState>) =>
	({touchableLocation, contentLayout}: HandleAddTouchableRippleOptions) => {
		const {width, height} = contentLayout

		setState(draft => {
			draft.contentLayout.height = height
			draft.contentLayout.width = width
			draft.rippleSequence[nanoid()] = touchableLocation
		})
	}

const handleTouchablePressIn =
	({setState, ref}: HandleTouchablePressInOptions) =>
	(enableTouchableRipple?: boolean) =>
	(event: GestureResponderEvent) => {
		ref.current?.focus()

		const {locationX, locationY} = event.nativeEvent

		if (enableTouchableRipple) {
			ref?.current?.measure((x, y, width, height) =>
				runAfterInteractions(handleAddTouchableRipple(setState))({
					contentLayout: {width, height, x, y},
					touchableLocation: {locationX, locationY}
				})
			)
		}
	}

export const handleTouchableStateChange =
	({eventName, enableTouchableRipple, ref}: HandleTouchableStateChangeOptions) =>
	(setState: Updater<TouchableState>) =>
	(event: StateEvent) => {
		const nextEvent = {
			pressIn: () =>
				handleTouchablePressIn({setState, ref})(enableTouchableRipple)(
					event as GestureResponderEvent
				)
		} as Record<EventName, () => void>

		if (eventName) {
			nextEvent[eventName]?.()
		}
	}

export const handleTouchableAnimatedFinished = (setState: Updater<TouchableState>) => (index: string) =>
	setState(draft => {
		if (draft.rippleSequence[index]) {
			delete draft.rippleSequence[index]
		}
	})
