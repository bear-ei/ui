import type {Updater} from 'use-immer'
import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import type {
	AnimatedTimingOptions,
	AnimateSharedValueTo,
	HandleStateEventChangeOptions,
	StateEvent
} from '../../../hooks'
import {DURATION, EASING} from '../../../theme'
import type {
	AnimateProgressActiveIndicatorLinearSharedValues,
	ProgressActiveIndicatorLinearState
} from './Progress-active-indicator-linear.interface'

// TODO: INDETERMINATE
// const indeterminateAnimation = {
// 	duration: DURATION.EXTRA_LONG_3,
// 	easing: EASING.LINEAR
// }
//
export const animateProgressActiveIndicatorLinear = (
	animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo
) => {
	const determinateAnimation = {duration: DURATION.MEDIUM_1, easing: EASING.STANDARD_DECELERATE}
	const animateSharedValueTo = animatedTiming(determinateAnimation)

	return ({widthSharedValue, translateXSharedValue}: AnimateProgressActiveIndicatorLinearSharedValues) =>
		(value?: number) => {
			if (typeof value !== 'number') {
				return
			}

			animateSharedValueTo({sharedValue: widthSharedValue})(value)
			animateSharedValueTo({sharedValue: translateXSharedValue})(value > 0 ? 1 : 0)
		}
}

export const handleProgressStateChange =
	({eventName}: HandleStateEventChangeOptions) =>
	(setState: Updater<ProgressActiveIndicatorLinearState>) =>
	(_event: StateEvent) =>
		setState(draft => {
			if (eventName === EVENT_NAME.LAYOUT && draft.status !== COMPONENT_STATUS.SUCCEEDED) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}
		})
