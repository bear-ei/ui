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
        ({onConfirm, doubleConfirmed, itemKey}: HandleListAfterAffordanceConfirmOptions) =>
        (_event: GestureResponderEvent) =>
                onConfirm?.({itemKey, doubleConfirmed})

export const handleListAfterAffordanceCancel =
        ({onCancel, doubleConfirmed, itemKey}: HandleListAfterAffordanceCancelOptions) =>
        (setState: Updater<ListAfterAffordanceState>) =>
        (_event: GestureResponderEvent) => {
                const handleNextCancelEvent = () => onCancel?.({itemKey, doubleConfirmed})

                setState(draft => {
                        draft.doubleConfirmed = !doubleConfirmed
                        draft.nextCancelEvent = handleNextCancelEvent
                })
        }

export const handleListAfterAffordanceVisible = (setState: Updater<ListAfterAffordanceState>) => (value?: boolean) =>
        !value &&
        setState(draft => {
                draft.doubleConfirmed = false
        })

export const handleListAfterAffordanceAnimatedTiming =
        (animatedTiming: AnimatedTiming) =>
        (translateXSharedValue: SharedValue<number>) =>
        (doubleConfirmed?: boolean) =>
                typeof doubleConfirmed === 'boolean' && animatedTiming()(translateXSharedValue)(doubleConfirmed ? 1 : 0)
