import type {GestureResponderEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTimingFactory, HandleInteractionStateChangeOptions, InteractionEvent} from '../../../hooks'
import type {
	ListAfterAffordancePhase,
	ListAfterAffordanceState,
	TriggerListAfterAffordancePrimaryActionOptions,
	UpdateListAffordanceSecondaryPressOptions
} from './List-after-affordance.interface'

import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import {ANIMATED_TIMING} from '../../../theme'
import {LIST_AFTER_AFFORDANCE_PHASE} from './List-after-affordance.enum'

export const triggerListAfterAffordancePrimaryAction =
	({itemKey, onPrimaryAction, phase}: TriggerListAfterAffordancePrimaryActionOptions) =>
	(_event: GestureResponderEvent) =>
		onPrimaryAction?.({itemKey, phase})

export const updateListAffordanceSecondaryPressState =
	(
		setState: Updater<ListAfterAffordanceState>,
		{itemKey, onSecondaryPress, phase}: UpdateListAffordanceSecondaryPressOptions
	) =>
	(_event: GestureResponderEvent) =>
		setState(draft => {
			draft.phase =
				phase === LIST_AFTER_AFFORDANCE_PHASE.DANGER ?
					LIST_AFTER_AFFORDANCE_PHASE.IDLE
				:	LIST_AFTER_AFFORDANCE_PHASE.DANGER

			if (onSecondaryPress) {
				draft.pendingSecondaryPressEvent = {itemKey, phase}
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

export const animateListAfterAffordance = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTimingFactory) => {
	const animateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.ENTER)

	return (phase?: ListAfterAffordancePhase) => {
		if (!phase) {
			return
		}

		animateSharedValueTo(phase === LIST_AFTER_AFFORDANCE_PHASE.DANGER ? 1 : 0)
	}
}

export const handleAffordanceStateChange = (
	_event: InteractionEvent,
	setState: Updater<ListAfterAffordanceState>,
	{eventName}: HandleInteractionStateChangeOptions
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
