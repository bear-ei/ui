import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTimingFactory, HandleInteractionStateChangeOptions, InteractionEvent} from '../../../hooks'
import type {ProgressActiveIndicatorLinearState} from './Progress-active-indicator-linear.interface'

import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import {ANIMATED_TIMING} from '../../../theme'

// TODO: INDETERMINATE
// const indeterminateAnimation = {
// 	duration: DURATION.EXTRA_LONG_3,
// 	easing: EASING.LINEAR
// }
export const animateProgressActiveIndicatorLinear = (
	sharedValue: SharedValue<number>,
	animatedTiming: AnimatedTimingFactory
) => {
	const widthAnimateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.PROGRESS)

	return (value?: number) => {
		if (typeof value !== 'number') {
			return
		}

		widthAnimateSharedValueTo(value)
	}
}

export const updateProgressValue = (setState: Updater<ProgressActiveIndicatorLinearState>) => (value?: number) => {
	if (typeof value !== 'number') {
		return
	}

	setState(draft => {
		if (draft.value === value) {
			return
		}

		draft.value = value
	})
}

export const handleProgressStateChange = (
	_event: InteractionEvent,
	setState: Updater<ProgressActiveIndicatorLinearState>,
	{eventName}: HandleInteractionStateChangeOptions
) =>
	setState(draft => {
		if (eventName === EVENT_NAME.LAYOUT && draft.status !== COMPONENT_STATUS.SUCCEEDED) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})
