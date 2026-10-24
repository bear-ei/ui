import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTimingFactory, InteractionEvent} from '../../../hooks'
import type {
	HandleSearchTextInputInteractionStateChangeOptions,
	SearchTextInputState
} from './Search-text-input.interface'

import {COMPONENT_STATUS, EVENT_NAME, INTERACTION_STATE} from '../../../constants'
import {ANIMATED_TIMING} from '../../../theme'

export const handleSearchTextInputStateChange = (
	_event: InteractionEvent,
	setState: Updater<SearchTextInputState>,
	{eventName, interactionState, ref}: HandleSearchTextInputInteractionStateChangeOptions
) => {
	if (eventName === EVENT_NAME.LAYOUT) {
		return
	}

	setState(draft => {
		if (draft.interactionState === INTERACTION_STATE.FOCUSED && eventName !== EVENT_NAME.BLUR) {
			return
		}

		draft.eventName = eventName

		if (interactionState) {
			draft.interactionState = interactionState
		}
	})

	if (eventName === EVENT_NAME.PRESS_OUT) {
		ref?.current?.focus()
	}
}

export const updateSearchTextInputText =
	(setState: Updater<SearchTextInputState>, onChangeText?: (text: string) => void) => (value: string) =>
		setState(draft => {
			if (draft.value === value) {
				return
			}

			draft.value = value

			if (onChangeText) {
				draft.pendingChangeTextEvent = value
			}
		})

export const updateSearchTextInputValue = (setState: Updater<SearchTextInputState>) => (value?: string) =>
	setState(draft => {
		draft.value = value ?? ''

		if (draft.status === COMPONENT_STATUS.IDLE) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})

export const animateSearchColor = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTimingFactory) => {
	const animateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.STANDARD)

	return (disabled?: boolean) => animateSharedValueTo(disabled ? 0 : 1)
}

export const animateSearchBorderRadius = (
	[borderBottomRadiusSharedValue, borderTopRadiusSharedValue]: [SharedValue<number>, SharedValue<number>],
	animatedTiming: AnimatedTimingFactory
) => {
	const borderBottomAnimateSharedValueTo = animatedTiming(borderBottomRadiusSharedValue, ANIMATED_TIMING.STANDARD)
	const borderTopAnimateSharedValueTo = animatedTiming(borderTopRadiusSharedValue, ANIMATED_TIMING.STANDARD)

	return (listExpanded?: boolean) => {
		const toValue = listExpanded ? 0 : 1

		borderBottomAnimateSharedValueTo(toValue)
		borderTopAnimateSharedValueTo(toValue)
	}
}
