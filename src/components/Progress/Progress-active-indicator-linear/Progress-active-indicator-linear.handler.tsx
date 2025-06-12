import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimateSharedValueTo, HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import {COMPONENT_STATUS, EVENT_NAME} from '../../Common'
import type {ProgressActiveIndicatorLinearState} from './Progress-active-indicator-linear.interface'

export const animateProgressActiveIndicatorLinear =
	(animateSharedValueTo: AnimateSharedValueTo) => (scaleXSharedValue: SharedValue<number>) => (value?: number) =>
		typeof value === 'number' && animateSharedValueTo({sharedValue: scaleXSharedValue})(value)

export const handleProgressStateChange =
	({eventName}: HandleStateEventChangeOptions) =>
	(setState: Updater<ProgressActiveIndicatorLinearState>) =>
	(_event: StateEvent) =>
		setState(draft => {
			if (eventName === EVENT_NAME.LAYOUT && draft.status !== COMPONENT_STATUS.SUCCEEDED) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}
		})
