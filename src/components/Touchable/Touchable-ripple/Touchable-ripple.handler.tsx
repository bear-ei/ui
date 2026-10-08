import type {Updater} from 'use-immer'
import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import type {HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import {DURATION, EASING} from '../../../theme'
import type {
	AnimateTouchableRippleOptions,
	AnimateTouchableRippleSharedValues,
	TouchableRippleProps,
	TouchableRippleState
} from './Touchable-ripple.interface'

export const compareTouchableRippleProps = (prevProps: TouchableRippleProps) => {
	const {indexKey: prevIndexKey} = prevProps

	return (nextProps: TouchableRippleProps) => prevIndexKey === nextProps.indexKey
}

export const handleTouchableRippleStateChange =
	({eventName}: HandleStateEventChangeOptions) =>
	(setState: Updater<TouchableRippleState>) =>
	(_event: StateEvent) =>
		setState(draft => {
			if (eventName === EVENT_NAME.LAYOUT && draft.status !== COMPONENT_STATUS.SUCCEEDED) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}
		})

export const animateTouchableRipple =
	({animatedTiming, onAnimateFinished, indexKey}: AnimateTouchableRippleOptions) =>
	({opacitySharedValue, scaleSharedValue}: AnimateTouchableRippleSharedValues) => {
		const entryAnimateSharedValueTo = animatedTiming({
			duration: DURATION.SHORT_2,
			easing: EASING.STANDARD_DECELERATE
		})({sharedValue: scaleSharedValue})

		const exitAnimateSharedValueTo = animatedTiming({
			delay: 50,
			duration: DURATION.SHORT_3,
			easing: EASING.STANDARD_ACCELERATE,
			callback: (finished?: boolean) => finished && indexKey && onAnimateFinished?.(indexKey)
		})({sharedValue: opacitySharedValue})

		return () => {
			entryAnimateSharedValueTo(1)
			exitAnimateSharedValueTo(0)
		}
	}
