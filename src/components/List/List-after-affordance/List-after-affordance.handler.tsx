import type {GestureResponderEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimateSharedValueTo} from '../../../hooks'
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
	(animateSharedValueTo: AnimateSharedValueTo) =>
	(translateXSharedValue: SharedValue<number>) =>
	(doubleConfirmed?: boolean) =>
		typeof doubleConfirmed === 'boolean' &&
		animateSharedValueTo({sharedValue: translateXSharedValue})(doubleConfirmed ? 1 : 0)
