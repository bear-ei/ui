import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTiming, HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import type {ListAffordanceButtonState} from './List-affordance-button.interface'

import {EVENT_NAME} from '../../../constants'

export const handleListAffordanceButtonStateChange = (
	_event: StateEvent,
	setState: Updater<ListAffordanceButtonState>,
	{eventName}: HandleStateEventChangeOptions
) => {
	if (eventName === EVENT_NAME.LAYOUT) {
		return
	}

	setState(draft => {
		draft.eventName = eventName
	})
}

export const animateListAffordanceButton = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTiming) => {
	const animateSharedValueTo = animatedTiming(sharedValue)

	return (value: number) => animateSharedValueTo(value)
}
