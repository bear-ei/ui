import type {Updater} from 'use-immer'

import {cancelAnimation, type SharedValue} from 'react-native-reanimated'

import type {AnimatedTiming, HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import type {ProgressActiveIndicatorCircularState} from './Progress-active-indicator-circular.interface'

import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import {EASING, LOOP} from '../../../theme'

// TODO: DETERMINATE
// const determinateAnimation = {
// 	duration: DURATION.MEDIUM_1,
// 	easing: EASING.STANDARD_DECELERATE
// }

const INDETERMINATE_TIMING_OPTIONS = {duration: LOOP.LOOP_2, easing: EASING.LINEAR, repeat: -1}
export const animateProgressActiveIndicatorCircular = (
	[circleSharedValue, containerSharedValue]: [SharedValue<number>, SharedValue<number>],
	animatedTiming: AnimatedTiming
) => {
	const circleAnimateSharedValueTo = animatedTiming(circleSharedValue, INDETERMINATE_TIMING_OPTIONS)
	const containerAnimateSharedValueTo = animatedTiming(containerSharedValue, INDETERMINATE_TIMING_OPTIONS)

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
export const handleProgressStateChange = (
	_event: StateEvent,
	setState: Updater<ProgressActiveIndicatorCircularState>,
	{eventName}: HandleStateEventChangeOptions
) =>
	setState(draft => {
		if (eventName === EVENT_NAME.LAYOUT && draft.status !== COMPONENT_STATUS.SUCCEEDED) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})
