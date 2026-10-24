import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTimingFactory, HandleInteractionStateChangeOptions, InteractionEvent} from '../../../hooks'
import type {ListAffordanceButtonState} from './List-affordance-button.interface'

import {EVENT_NAME} from '../../../constants'
import {ANIMATED_TIMING} from '../../../theme'

export const handleListAffordanceButtonStateChange = (
	_event: InteractionEvent,
	setState: Updater<ListAffordanceButtonState>,
	{eventName}: HandleInteractionStateChangeOptions
) => {
	if (eventName === EVENT_NAME.LAYOUT) {
		return
	}

	setState(draft => {
		draft.eventName = eventName
	})
}

export const animateListAffordanceButton = (
	sharedValue: SharedValue<number>,
	animatedTiming: AnimatedTimingFactory
) => {
	const animateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.STANDARD)

	return (value: number) => animateSharedValueTo(value)
}
