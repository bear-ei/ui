import type {GestureResponderEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTiming, HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import type {
	ListAfterAffordancePhase,
	ListAfterAffordanceState,
	TriggerListAfterAffordanceConfirmOptions,
	UpdateListAffordanceSecondaryActionStateOptions
} from './List-after-affordance.interface'

import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import {DURATION, EASING} from '../../../theme'
import {LIST_AFTER_AFFORDANCE_PHASE} from './List-after-affordance.enum'

export const triggerListAfterAffordanceConfirm =
	({indexKey, onConfirm, phase}: TriggerListAfterAffordanceConfirmOptions) =>
	(_event: GestureResponderEvent) =>
		onConfirm?.({indexKey, phase})

export const updateListAffordanceSecondaryActionState =
	(
		setState: Updater<ListAfterAffordanceState>,
		{indexKey, onSecondaryAction, phase}: UpdateListAffordanceSecondaryActionStateOptions
	) =>
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

export const animateListAfterAffordance = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTiming) => {
	const animateSharedValueTo = animatedTiming(sharedValue, {
		duration: DURATION.SHORT_2,
		easing: EASING.STANDARD_DECELERATE
	})

	return (phase?: ListAfterAffordancePhase) => {
		if (!phase) {
			return
		}

		animateSharedValueTo(phase === LIST_AFTER_AFFORDANCE_PHASE.DANGER ? 1 : 0)
	}
}

export const handleAffordanceStateChange = (
	_event: StateEvent,
	setState: Updater<ListAfterAffordanceState>,
	{eventName}: HandleStateEventChangeOptions
) => {
	if (eventName !== EVENT_NAME.LAYOUT) {
		return
	}

	return setState(draft => {
		if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})
}
