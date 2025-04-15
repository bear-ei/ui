import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimatedTiming, StateEvent} from '../../../hooks'
import type {
	HandleListAffordanceButtonStateEventChangeOptions,
	ListAffordanceButtonState
} from './List-affordance-button.interface'

export const handleListAffordanceButtonStateChange =
	({eventName, visible}: HandleListAffordanceButtonStateEventChangeOptions) =>
	(setState: Updater<ListAffordanceButtonState>) =>
	(_event: StateEvent) => {
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
