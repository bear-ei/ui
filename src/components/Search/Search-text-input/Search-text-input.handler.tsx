import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import {COMPONENT_STATUS, EVENT_NAME, STATE} from '../../../constants'
import type {AnimatedTimingOptions, AnimateSharedValueTo, StateEvent} from '../../../hooks'
import type {
	AnimateSearchTextInputBorderRadiusOptions,
	HandleSearchTextInputStateChangeOptions,
	SearchTextInputState
} from './Search-text-input.interface'
import {DURATION, EASING} from '../../../theme'

export const handleSearchTextInputStateChange =
	({eventName, ref, state}: HandleSearchTextInputStateChangeOptions) =>
	(setState: Updater<SearchTextInputState>) =>
	(_event: StateEvent) => {
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
	(onChangeText?: (text: string) => void) => (setState: Updater<SearchTextInputState>) => (value: string) =>
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

export const animateSearchColor =
	(animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) =>
	(colorSharedValue: SharedValue<number>) => {
		const animateSharedValueTo = animatedTiming({easing: EASING.STANDARD, duration: DURATION.SHORT_2})({
			sharedValue: colorSharedValue
		})

		return (disabled?: boolean) => animateSharedValueTo(disabled ? 0 : 1)
	}

export const animateSearchBorderRadius =
	(animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) =>
	({borderBottomRadiusSharedValue, borderTopRadiusSharedValue}: AnimateSearchTextInputBorderRadiusOptions) => {
		const animatedTimingOptions = {easing: EASING.STANDARD, duration: DURATION.SHORT_2}
		const borderBottomAnimateSharedValueTo = animatedTiming(animatedTimingOptions)({
			sharedValue: borderBottomRadiusSharedValue
		})

		const borderTopAnimateSharedValueTo = animatedTiming(animatedTimingOptions)({
			sharedValue: borderTopRadiusSharedValue
		})

		return (listExpanded?: boolean) => {
			const toValue = listExpanded ? 0 : 1

			borderBottomAnimateSharedValueTo(toValue)
			borderTopAnimateSharedValueTo(toValue)
		}
	}
