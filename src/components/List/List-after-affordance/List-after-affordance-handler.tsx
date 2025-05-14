import type {GestureResponderEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimatedTiming} from '../../../hooks'
import type {
	HandleListAffordanceCancelOptions,
	ListAfterAffordanceState,
	TriggerListAffordanceConfirmOptions
} from './List-after-affordance.interface'

export const triggerAffordanceConfirm =
	({onConfirm, doubleConfirmed, indexKey}: TriggerListAffordanceConfirmOptions) =>
	(_event: GestureResponderEvent) =>
		onConfirm?.({indexKey, doubleConfirmed})

export const handleAffordanceCancel =
	({onCancel, doubleConfirmed, indexKey}: HandleListAffordanceCancelOptions) =>
	(setState: Updater<ListAfterAffordanceState>) =>
	(_event: GestureResponderEvent) => {
		const triggerNextCancelEvent = () => onCancel?.({indexKey, doubleConfirmed})

		setState(draft => {
			draft.doubleConfirmed = !doubleConfirmed
			draft.nextCancelEvent = triggerNextCancelEvent
		})
	}

export const updateAffordanceVisible = (setState: Updater<ListAfterAffordanceState>) => (visible?: boolean) =>
	!visible &&
	setState(draft => {
		draft.doubleConfirmed = false
	})

export const animateAffordanceTranslateX =
	(animatedTiming: AnimatedTiming) =>
	(translateXSharedValue: SharedValue<number>) =>
	(doubleConfirmed?: boolean) =>
		typeof doubleConfirmed === 'boolean' && animatedTiming()(translateXSharedValue)(doubleConfirmed ? 1 : 0)
