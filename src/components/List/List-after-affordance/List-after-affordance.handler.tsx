import type {GestureResponderEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
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
	ListAfterAffordanceState,
	TriggerListAfterAffordanceConfirmOptions,
	UpdateListAffordanceCancelStateOptions
} from './List-after-affordance.interface'

export const triggerListAfterAffordanceConfirm =
	({onConfirm, doubleConfirmed, indexKey}: TriggerListAfterAffordanceConfirmOptions) =>
	(_event: GestureResponderEvent) =>
		onConfirm?.({indexKey, doubleConfirmed})

export const updateListAffordanceCancelState =
	({onCancel, doubleConfirmed, indexKey}: UpdateListAffordanceCancelStateOptions) =>
	(setState: Updater<ListAfterAffordanceState>) =>
	(_event: GestureResponderEvent) =>
		setState(draft => {
			draft.doubleConfirmed = !doubleConfirmed

			if (onCancel) {
				draft.pendingCancelEvent = {indexKey, doubleConfirmed}
			}
		})

export const resetAffordanceConfirmationOnHide =
	(setState: Updater<ListAfterAffordanceState>) => (visible?: boolean) => {
		if (visible) {
			return
		}

		setState(draft => {
			draft.doubleConfirmed = false
		})
	}

export const animateListAfterAffordance =
	(animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) =>
	(translateXSharedValue: SharedValue<number>) => {
		const animateSharedValueTo = animatedTiming({
			easing: EASING.STANDARD_DECELERATE,
			duration: DURATION.SHORT_2
		})({
			sharedValue: translateXSharedValue
		})

		return (value?: boolean) => typeof value === 'boolean' && animateSharedValueTo(value ? 1 : 0)
	}

export const handleAffordanceStateChange =
	({eventName}: HandleStateEventChangeOptions) =>
	(setState: Updater<ListAfterAffordanceState>) =>
	(_event: StateEvent) =>
		eventName === EVENT_NAME.LAYOUT &&
		setState(draft => {
			if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}
		})
