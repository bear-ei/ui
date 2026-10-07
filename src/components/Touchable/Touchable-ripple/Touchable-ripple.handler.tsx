import type {Updater} from 'use-immer'
import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import type {AnimateSharedValueToOptions, HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import type {
	AnimateTouchableRippleOptions,
	AnimateTouchableRippleSharedValues,
	TouchableRippleProps,
	TouchableRippleState
} from './Touchable-ripple.interface'
import {DURATION, EASING} from '../../../theme'

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

export const animateTouchableRipple = ({animatedTiming, onAnimateFinished}: AnimateTouchableRippleOptions) => {
	const createAnimatedTimingCallback = (callback?: () => void) => (finished?: boolean) => finished && callback?.()
	const createRippleAnimatedTiming =
		({
			sharedValue,
			animatedTimingOptions
		}: Pick<AnimateTouchableRippleSharedValues, 'animatedTimingOptions'> &
			Pick<AnimateSharedValueToOptions, 'sharedValue'>) =>
		(toValue: number) =>
		(callback?: () => void) =>
			animatedTiming({...animatedTimingOptions, callback: createAnimatedTimingCallback(callback)})({
				sharedValue
			})(toValue)

	return ({opacitySharedValue, scaleSharedValue}: AnimateTouchableRippleSharedValues) =>
		(index?: string) => {
			const entryAnimatedTiming = createRippleAnimatedTiming({
				sharedValue: scaleSharedValue,
				animatedTimingOptions: {easing: EASING.STANDARD_DECELERATE, duration: DURATION.SHORT_2}
			})(1)

			const exitAnimatedTiming = createRippleAnimatedTiming({
				sharedValue: opacitySharedValue,
				animatedTimingOptions: {easing: EASING.STANDARD_ACCELERATE, duration: DURATION.SHORT_3, delay: 50}
			})(0)

			const exitAnimatedFinished = () => index && onAnimateFinished?.(index)

			entryAnimatedTiming()
			exitAnimatedTiming(exitAnimatedFinished)
		}
}
