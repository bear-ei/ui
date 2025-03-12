import {SharedValue} from 'react-native-reanimated'
import {Updater} from 'use-immer'
import {AnimatedTiming, StateEventType} from '../../../hooks'
import {
        HandleListAffordanceButtonStateEventChangeOptions,
        ListAffordanceButtonState
} from './List-affordance-button.interface'

export const handleListAffordanceButtonStateChange =
        ({eventName, visible}: HandleListAffordanceButtonStateEventChangeOptions) =>
        (setState: Updater<ListAffordanceButtonState>) =>
        (_event: StateEventType) => {
                if (eventName === 'layout' || !visible) {
                        return
                }

                setState(draft => {
                        draft.eventName = eventName
                })
        }

export const handleListAffordanceButtonAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (colorSharedValue: SharedValue<number>) => (disabled?: boolean) =>
                animatedTiming()(colorSharedValue)(disabled ? 0 : 1)
