import {cancelAnimation} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import type {
	AnimatedTimingOptions,
	AnimateSharedValueTo,
	HandleStateEventChangeOptions,
	StateEvent
} from '../../../hooks'
import type {
	AnimateProgressActiveIndicatorCircularSharedValues,
	ProgressActiveIndicatorCircularState
} from './Progress-active-indicator-circular.interface'
import {DURATION, EASING} from '../../../theme'

// TODO: DETERMINATE
// const determinateAnimation = {
// 	duration: DURATION.MEDIUM_1,
// 	easing: EASING.STANDARD_DECELERATE
// }
//
export const animateProgressActiveIndicatorCircular = (
	animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo
) => {
	const indeterminateAnimation = {duration: DURATION.LOOP_2, easing: EASING.LINEAR, repeat: -1}
	const animateSharedValueTo = animatedTiming(indeterminateAnimation)

	return ({containerSharedValue, circleSharedValue}: AnimateProgressActiveIndicatorCircularSharedValues) =>
		(enableAnimated?: boolean) => {
			if (enableAnimated) {
				animateSharedValueTo({sharedValue: circleSharedValue})(2)
				animateSharedValueTo({sharedValue: containerSharedValue})(2)

				return
			}

			cancelAnimation(circleSharedValue)
			cancelAnimation(containerSharedValue)
		}
}

export const computeProgressStrokeDashoffset = (circumference: number) => (value: number) => circumference * (1 - value)
export const handleProgressStateChange =
	({eventName}: HandleStateEventChangeOptions) =>
	(setState: Updater<ProgressActiveIndicatorCircularState>) =>
	(_event: StateEvent) =>
		setState(draft => {
			if (eventName === EVENT_NAME.LAYOUT && draft.status !== COMPONENT_STATUS.SUCCEEDED) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}
		})
