import type {GestureResponderEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimateSharedValueTo, HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import {COMPONENT_STATUS, EVENT_NAME} from '../../Common'
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
	(_event: GestureResponderEvent) => {
		const nextCancelEvent = () => onCancel?.({indexKey, doubleConfirmed})

		setState(draft => {
			draft.doubleConfirmed = !doubleConfirmed
			draft.nextCancelEvent = nextCancelEvent
		})
	}

export const resetAffordanceConfirmationOnHide = (setState: Updater<ListAfterAffordanceState>) => (visible?: boolean) =>
	!visible &&
	setState(draft => {
		draft.doubleConfirmed = false
	})

export const animateListAfterAffordance =
	(animateSharedValueTo: AnimateSharedValueTo) => (sharedValue: SharedValue<number>) => (value?: boolean) =>
		typeof value === 'boolean' && animateSharedValueTo({sharedValue: sharedValue})(value ? 1 : 0)

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

export const clearAffordanceEvent = (setState: Updater<ListAfterAffordanceState>) => (eventName: 'cancel') => {
	const event = {
		cancel: () =>
			setState(draft => {
				draft.nextCancelEvent = undefined
			})
	}

	event[eventName]?.()
}
