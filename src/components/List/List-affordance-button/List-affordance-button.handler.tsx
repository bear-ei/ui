import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimatedTiming, HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import {EVENT_NAME} from '../../Common'
import type {ListAffordanceButtonState} from './List-affordance-button.interface'

export const handleListAffordanceButtonStateChange =
	({eventName}: HandleStateEventChangeOptions) =>
	(setState: Updater<ListAffordanceButtonState>) =>
	(_event: StateEvent) => {
		if (eventName === EVENT_NAME.LAYOUT) {
			return
		}

		setState(draft => {
			draft.eventName = eventName
		})
	}

export const animateListAffordanceButton =
	(animatedTiming: AnimatedTiming) => (colorSharedValue: SharedValue<number>) => (disabled?: boolean) =>
		animatedTiming()(colorSharedValue)(disabled ? 0 : 1)
