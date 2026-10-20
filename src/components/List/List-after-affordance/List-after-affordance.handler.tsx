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
	ListAfterAffordancePhase,
	ListAfterAffordanceState,
	TriggerListAfterAffordanceConfirmOptions,
	UpdateListAffordanceSecondaryActionStateOptions
} from './List-after-affordance.interface'
import {LIST_AFTER_AFFORDANCE_PHASE} from './List-after-affordance.enum'

export const triggerListAfterAffordanceConfirm =
	({onConfirm, phase, indexKey}: TriggerListAfterAffordanceConfirmOptions) =>
	(_event: GestureResponderEvent) =>
		onConfirm?.({indexKey, phase})

export const updateListAffordanceSecondaryActionState =
	({onSecondaryAction, phase, indexKey}: UpdateListAffordanceSecondaryActionStateOptions) =>
	(setState: Updater<ListAfterAffordanceState>) =>
	(_event: GestureResponderEvent) =>
		setState(draft => {
			draft.phase =
				phase === LIST_AFTER_AFFORDANCE_PHASE.DANGER ?
					LIST_AFTER_AFFORDANCE_PHASE.IDLE
				:	LIST_AFTER_AFFORDANCE_PHASE.DANGER

			if (onSecondaryAction) {
				draft.pendingSecondaryActionEvent = {indexKey, phase}
			}
		})

export const resetAffordanceConfirmationOnHide =
	(setState: Updater<ListAfterAffordanceState>) => (visible?: boolean) => {
		if (visible) {
			return
		}

		setState(draft => {
			draft.phase = LIST_AFTER_AFFORDANCE_PHASE.IDLE
		})
	}

export const animateListAfterAffordance =
	(animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) =>
	(translateXSharedValue: SharedValue<number>) => {
		const animateSharedValueTo = animatedTiming({easing: EASING.STANDARD_DECELERATE, duration: DURATION.SHORT_2})({
			sharedValue: translateXSharedValue
		})

		return (phase?: ListAfterAffordancePhase) => {
			if (!phase) {
				return
			}

			animateSharedValueTo(phase === LIST_AFTER_AFFORDANCE_PHASE.DANGER ? 1 : 0)
		}
	}

export const handleAffordanceStateChange =
	({eventName}: HandleStateEventChangeOptions) =>
	(setState: Updater<ListAfterAffordanceState>) =>
	(_event: StateEvent) => {
		if (eventName !== EVENT_NAME.LAYOUT) {
			return
		}

		return setState(draft => {
			if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}
		})
	}
