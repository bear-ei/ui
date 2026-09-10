import {EVENT_NAME} from '@/constants'
import type {AnimateSharedValueTo, HandleStateEventChangeOptions, StateEvent} from '@/hooks'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {ListAffordanceButtonState} from './List-affordance-button.interface'

export const handleListAffordanceButtonStateChange =
	({eventName}: HandleStateEventChangeOptions) =>
	(setState: Updater<ListAffordanceButtonState>) =>
	(_event: StateEvent) =>
		eventName !== EVENT_NAME.LAYOUT &&
		setState(draft => {
			draft.eventName = eventName
		})

export const animateListAffordanceButton =
	(animateSharedValueTo: AnimateSharedValueTo) => (colorSharedValue: SharedValue<number>) => (value: number) =>
		animateSharedValueTo({sharedValue: colorSharedValue})(value)
