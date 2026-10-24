import type {Updater} from 'use-immer'

import {cancelAnimation, type SharedValue} from 'react-native-reanimated'

import type {AnimatedTimingFactory, HandleInteractionStateChangeOptions, InteractionEvent} from '../../../hooks'
import type {ProgressActiveIndicatorCircularState} from './Progress-active-indicator-circular.interface'

import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import {ANIMATED_TIMING} from '../../../theme'

// TODO: DETERMINATE
// const determinateAnimation = {
// 	duration: DURATION.MEDIUM_1,
// 	easing: EASING.STANDARD_DECELERATE
// }

export const animateProgressActiveIndicatorCircular = (
	[circleSharedValue, containerSharedValue]: [SharedValue<number>, SharedValue<number>],
	animatedTiming: AnimatedTimingFactory
) => {
	const circleAnimateSharedValueTo = animatedTiming(circleSharedValue, ANIMATED_TIMING.LOOP)
	const containerAnimateSharedValueTo = animatedTiming(containerSharedValue, ANIMATED_TIMING.LOOP)

	return (enableLoop?: boolean) => {
		if (typeof enableLoop !== 'boolean') {
			return
		}

		if (enableLoop) {
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
	_event: InteractionEvent,
	setState: Updater<ProgressActiveIndicatorCircularState>,
	{eventName}: HandleInteractionStateChangeOptions
) =>
	setState(draft => {
		if (eventName === EVENT_NAME.LAYOUT && draft.status !== COMPONENT_STATUS.SUCCEEDED) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})
