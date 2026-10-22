import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTiming, HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import type {ProgressActiveIndicatorLinearState} from './Progress-active-indicator-linear.interface'

import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import {DURATION, EASING} from '../../../theme'

// TODO: INDETERMINATE
// const indeterminateAnimation = {
// 	duration: DURATION.EXTRA_LONG_3,
// 	easing: EASING.LINEAR
// }
export const animateProgressActiveIndicatorLinear = (
	sharedValue: SharedValue<number>,
	animatedTiming: AnimatedTiming
) => {
	const widthAnimateSharedValueTo = animatedTiming(sharedValue, {
		duration: DURATION.MEDIUM_1,
		easing: EASING.STANDARD_DECELERATE
	})

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
	_event: StateEvent,
	setState: Updater<ProgressActiveIndicatorLinearState>,
	{eventName}: HandleStateEventChangeOptions
) =>
	setState(draft => {
		if (eventName === EVENT_NAME.LAYOUT && draft.status !== COMPONENT_STATUS.SUCCEEDED) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})
