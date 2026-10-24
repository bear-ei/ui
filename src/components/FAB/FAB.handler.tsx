import type {WritableDraft} from 'immer'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {Theme} from '../../contexts'
import type {AnimatedTiming, StateEvent} from '../../hooks'
import type {FABState, FABType, HandleFABStateChangeOptions} from './FAB.interface'

import {COMPONENT_STATUS, EVENT_NAME, STATE, type State} from '../../constants'
import {ANIMATED_TIMING} from '../../theme'
import {ELEVATION_VALUE, type ElevationValue} from '../Elevation'
import {FAB_TYPE} from './FAB.enum'

const ELEVATION_VALUE_MAP = {
	[STATE.DISABLED]: ELEVATION_VALUE.LEVEL_0,
	[STATE.ENABLED]: ELEVATION_VALUE.LEVEL_0,
	[STATE.ERROR]: ELEVATION_VALUE.LEVEL_0,
	[STATE.FOCUSED]: ELEVATION_VALUE.LEVEL_0,
	[STATE.HOVERED]: ELEVATION_VALUE.LEVEL_1,
	[STATE.LONG_PRESS]: ELEVATION_VALUE.LEVEL_0,
	[STATE.PRESS_IN]: ELEVATION_VALUE.LEVEL_0
}

export const updateFABStatus = (setState: Updater<FABState>, disabled?: boolean) => (elevated?: boolean) =>
	setState(draft => {
		if (draft.status !== COMPONENT_STATUS.IDLE) {
			return
		}

		if (!disabled) {
			draft.elevation = elevated ? ELEVATION_VALUE.LEVEL_3 : ELEVATION_VALUE.LEVEL_0
		}

		draft.status = COMPONENT_STATUS.SUCCEEDED
	})

const applyFABElevationToDraft = (draft: WritableDraft<FABState>, elevated?: boolean, state?: State) => {
	if (!elevated) {
		return
	}
	const baseElevation = ELEVATION_VALUE.LEVEL_3

	if (state) {
		draft.elevation = (
			state === STATE.DISABLED ?
				ELEVATION_VALUE_MAP[state]
			:	ELEVATION_VALUE_MAP[state] + baseElevation) as ElevationValue
	}
}

export const handleFABStateChange = (
	_event: StateEvent,
	setState: Updater<FABState>,
	{elevated, eventName, state}: HandleFABStateChangeOptions
) => {
	if (eventName === EVENT_NAME.LAYOUT) {
		return
	}

	setState(draft => {
		draft.eventName = eventName

		applyFABElevationToDraft(draft, elevated, state)
	})
}

export const updateFABDisabledState = (setState: Updater<FABState>, elevated?: boolean) => (disabled?: boolean) => {
	if (typeof disabled !== 'boolean') {
		return
	}

	setState(draft => {
		if (disabled) {
			draft.eventName = EVENT_NAME.NONE
		}

		if (elevated) {
			draft.elevation = disabled ? ELEVATION_VALUE.LEVEL_0 : ELEVATION_VALUE.LEVEL_3
		}
	})
}

export const getFABUnderlayColor = (type: FABType, {token}: Theme) => {
	const underlay = {
		[FAB_TYPE.PRIMARY]: token.scheme.onPrimaryContainer,
		[FAB_TYPE.SECONDARY]: token.scheme.onSecondaryContainer,
		[FAB_TYPE.SURFACE]: token.scheme.primary,
		[FAB_TYPE.TERTIARY]: token.scheme.onTertiaryContainer
	}

	return underlay[type]
}

export const animateFAB = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTiming) => {
	const animateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.STANDARD)

	return (disabled?: boolean) => animateSharedValueTo(disabled ? 0 : 1)
}
