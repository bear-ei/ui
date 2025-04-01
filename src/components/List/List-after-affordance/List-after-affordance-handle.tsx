import {GestureResponderEvent} from 'react-native'
import {SharedValue} from 'react-native-reanimated'
import {Updater} from 'use-immer'
import {AnimatedTiming} from '../../../hooks'
import {
        HandleListAfterAffordanceCancelOptions,
        HandleListAfterAffordanceConfirmOptions,
        ListAfterAffordanceState
} from './List-after-affordance.interface'

export const handleListAfterAffordanceConfirm =
        ({onConfirm, doubleConfirmed, indexKey}: HandleListAfterAffordanceConfirmOptions) =>
        (_event: GestureResponderEvent) =>
                onConfirm?.({indexKey, doubleConfirmed})

export const handleListAfterAffordanceCancel =
        ({onCancel, doubleConfirmed, indexKey}: HandleListAfterAffordanceCancelOptions) =>
        (setState: Updater<ListAfterAffordanceState>) =>
        (_event: GestureResponderEvent) => {
                const handleNextCancelEvent = () => onCancel?.({indexKey, doubleConfirmed})

                setState(draft => {
                        draft.doubleConfirmed = !doubleConfirmed
                        draft.nextCancelEvent = handleNextCancelEvent
                })
        }

export const handleListAfterAffordanceVisible = (setState: Updater<ListAfterAffordanceState>) => (visible?: boolean) =>
        !visible &&
        setState(draft => {
                draft.doubleConfirmed = false
        })

export const handleListAfterAffordanceAnimatedTiming =
        (animatedTiming: AnimatedTiming) =>
        (translateXSharedValue: SharedValue<number>) =>
        (doubleConfirmed?: boolean) =>
                typeof doubleConfirmed === 'boolean' && animatedTiming()(translateXSharedValue)(doubleConfirmed ? 1 : 0)
