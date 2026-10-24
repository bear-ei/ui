import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTiming, StateEvent} from '../../../hooks'
import type {HandleSearchTextInputStateChangeOptions, SearchTextInputState} from './Search-text-input.interface'

import {COMPONENT_STATUS, EVENT_NAME, STATE} from '../../../constants'
import {DURATION, EASING} from '../../../theme'

export const handleSearchTextInputStateChange = (
	_event: StateEvent,
	setState: Updater<SearchTextInputState>,
	{eventName, ref, state}: HandleSearchTextInputStateChangeOptions
) => {
	if (eventName === EVENT_NAME.LAYOUT) {
		return
	}

	setState(draft => {
		if (draft.state === STATE.FOCUSED && eventName !== EVENT_NAME.BLUR) {
			return
		}

		draft.eventName = eventName

		if (state) {
			draft.state = state
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

export const animateSearchColor = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTiming) => {
	const animateSharedValueTo = animatedTiming(sharedValue, {duration: DURATION.SHORT_2, easing: EASING.STANDARD})

	return (disabled?: boolean) => animateSharedValueTo(disabled ? 0 : 1)
}

export const animateSearchBorderRadius = (
	[borderBottomRadiusSharedValue, borderTopRadiusSharedValue]: [SharedValue<number>, SharedValue<number>],
	animatedTiming: AnimatedTiming
) => {
	const animatedTimingOptions = {duration: DURATION.SHORT_2, easing: EASING.STANDARD}
	const borderBottomAnimateSharedValueTo = animatedTiming(borderBottomRadiusSharedValue, animatedTimingOptions)
	const borderTopAnimateSharedValueTo = animatedTiming(borderTopRadiusSharedValue, animatedTimingOptions)

	return (listExpanded?: boolean) => {
		const toValue = listExpanded ? 0 : 1

		borderBottomAnimateSharedValueTo(toValue)
		borderTopAnimateSharedValueTo(toValue)
	}
}
