import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimatedTiming, StateEvent} from '../../../hooks'
import {EVENT_NAME} from '../../Common'
import type {
	HandleListAffordanceButtonStateEventChangeOptions,
	ListAffordanceButtonState
} from './List-affordance-button.interface'

export const handleListAffordanceButtonStateChange =
	({eventName, visible}: HandleListAffordanceButtonStateEventChangeOptions) =>
	(setState: Updater<ListAffordanceButtonState>) =>
	(_event: StateEvent) => {
		if (eventName === EVENT_NAME.LAYOUT || !visible) {
			return
		}

		setState(draft => {
			draft.eventName = eventName
		})
	}

export const animateListAffordanceButtonColor =
	(animatedTiming: AnimatedTiming) => (colorSharedValue: SharedValue<number>) => (disabled?: boolean) =>
		animatedTiming()(colorSharedValue)(disabled ? 0 : 1)
