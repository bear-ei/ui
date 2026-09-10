import {COMPONENT_STATUS, EVENT_NAME, STATE} from '@/constants'
import type {Theme} from '@/contexts'
import type {AnimateSharedValueTo, StateEvent} from '@/hooks'
import type {WritableDraft} from 'immer'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import {ELEVATION, type ElevationLevel} from '../Elevation'
import {FAB_TYPE} from './FAB.enum'
import type {FABState, FABType, HandleFABStateChangeOptions} from './FAB.interface'

export const updateFABStatus = (disabled?: boolean) => (setState: Updater<FABState>) => (elevated?: boolean) =>
	setState(draft => {
		if (draft.status !== COMPONENT_STATUS.IDLE) {
			return
		}

		if (elevated && !disabled) {
			draft.elevation = ELEVATION.LEVEL_3
		}

		draft.status = COMPONENT_STATUS.SUCCEEDED
	})

export const handleFABStateChange = ({eventName, elevated, state}: HandleFABStateChangeOptions) => {
	const applyFABElevationToDraft = (draft: WritableDraft<FABState>) => {
		if (!elevated) {
			return
		}

		const level = {
			[STATE.DISABLED]: ELEVATION.LEVEL_0,
			[STATE.ENABLED]: ELEVATION.LEVEL_0,
			[STATE.ERROR]: ELEVATION.LEVEL_0,
			[STATE.FOCUSED]: ELEVATION.LEVEL_0,
			[STATE.HOVERED]: ELEVATION.LEVEL_1,
			[STATE.LONG_PRESS_IN]: ELEVATION.LEVEL_0,
			[STATE.PRESS_IN]: ELEVATION.LEVEL_0
		}

		if (state) {
			draft.elevation = (
				state === STATE.DISABLED ?
					level[state]
				:	level[state] + ELEVATION.LEVEL_3) as ElevationLevel
		}
	}

	return (setState: Updater<FABState>) => (_event: StateEvent) =>
		eventName !== EVENT_NAME.LAYOUT &&
		setState(draft => {
			if (eventName) {
				draft.eventName = eventName
			}

			applyFABElevationToDraft(draft)
		})
}

export const updateFABDisabledState = (elevated?: boolean) => (setState: Updater<FABState>) => (disabled?: boolean) =>
	typeof disabled === 'boolean' &&
	setState(draft => {
		if (disabled) {
			draft.eventName = EVENT_NAME.NONE
		}

		if (elevated) {
			draft.elevation = disabled ? ELEVATION.LEVEL_0 : ELEVATION.LEVEL_1
		}
	})

export const getFABUnderlayColor = (theme: Theme) => {
	const underlay = {
		[FAB_TYPE.PRIMARY]: theme.token.scheme.onPrimaryContainer,
		[FAB_TYPE.SECONDARY]: theme.token.scheme.onSecondaryContainer,
		[FAB_TYPE.SURFACE]: theme.token.scheme.primary,
		[FAB_TYPE.TERTIARY]: theme.token.scheme.onTertiaryContainer
	}

	return (type: FABType) => underlay[type]
}

export const animateFAB =
	(animateSharedValueTo: AnimateSharedValueTo) => (colorSharedValue: SharedValue<number>) => (disabled?: boolean) =>
		animateSharedValueTo({sharedValue: colorSharedValue})(disabled ? 0 : 1)
