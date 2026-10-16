import {cancelAnimation} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import type {
	AnimatedTimingOptions,
	AnimateSharedValueTo,
	HandleStateEventChangeOptions,
	StateEvent
} from '../../../hooks'
import {EASING, LOOP} from '../../../theme'
import type {
	AnimateProgressActiveIndicatorCircularSharedValues,
	ProgressActiveIndicatorCircularState
} from './Progress-active-indicator-circular.interface'

// TODO: DETERMINATE
// const determinateAnimation = {
// 	duration: DURATION.MEDIUM_1,
// 	easing: EASING.STANDARD_DECELERATE
// }

const INDETERMINATE_TIMING_OPTIONS = {duration: LOOP.LOOP_2, easing: EASING.LINEAR, repeat: -1}
export const animateProgressActiveIndicatorCircular =
	(animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) =>
	({containerSharedValue, circleSharedValue}: AnimateProgressActiveIndicatorCircularSharedValues) => {
		const circleAnimateSharedValueTo = animatedTiming(INDETERMINATE_TIMING_OPTIONS)({
			sharedValue: circleSharedValue
		})

		const containerAnimateSharedValueTo = animatedTiming(INDETERMINATE_TIMING_OPTIONS)({
			sharedValue: containerSharedValue
		})

		return (enableAnimated?: boolean) => {
			if (typeof enableAnimated !== 'boolean') {
				return
			}

			if (enableAnimated) {
				circleAnimateSharedValueTo(2)
				containerAnimateSharedValueTo(2)

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
