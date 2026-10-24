import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {Theme} from '../../contexts'
import type {AnimatedTimingFactory, InteractionEvent} from '../../hooks'
import type {FABState, FABType, HandleFABInteractionStateChangeOptions} from './FAB.interface'

import {COMPONENT_STATUS, EVENT_NAME, INTERACTION_STATE} from '../../constants'
import {ANIMATED_TIMING} from '../../theme'
import {ELEVATION_VALUE, type ElevationValue} from '../Elevation'
import {FAB_TYPE} from './FAB.enum'

const ELEVATION_VALUE_MAP = {
	[INTERACTION_STATE.DISABLED]: ELEVATION_VALUE.LEVEL_0,
	[INTERACTION_STATE.ENABLED]: ELEVATION_VALUE.LEVEL_0,
	[INTERACTION_STATE.ERROR]: ELEVATION_VALUE.LEVEL_0,
	[INTERACTION_STATE.FOCUSED]: ELEVATION_VALUE.LEVEL_0,
	[INTERACTION_STATE.HOVERED]: ELEVATION_VALUE.LEVEL_1,
	[INTERACTION_STATE.LONG_PRESS]: ELEVATION_VALUE.LEVEL_0,
	[INTERACTION_STATE.PRESS_IN]: ELEVATION_VALUE.LEVEL_0
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

export const handleFABStateChange = (
	_event: InteractionEvent,
	setState: Updater<FABState>,
	{elevated, eventName, interactionState}: HandleFABInteractionStateChangeOptions
) => {
	if (eventName === EVENT_NAME.LAYOUT) {
		return
	}

	setState(draft => {
		draft.eventName = eventName

		if (!elevated) {
			return
		}

		const baseElevation = ELEVATION_VALUE.LEVEL_3

		if (interactionState) {
			draft.elevation = (
				interactionState === INTERACTION_STATE.DISABLED ?
					ELEVATION_VALUE_MAP[interactionState]
				:	ELEVATION_VALUE_MAP[interactionState] + baseElevation) as ElevationValue
		}
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
		[FAB_TYPE.PRIMARY]: token.colors.onPrimaryContainer,
		[FAB_TYPE.SECONDARY]: token.colors.onSecondaryContainer,
		[FAB_TYPE.SURFACE]: token.colors.primary,
		[FAB_TYPE.TERTIARY]: token.colors.onTertiaryContainer
	}

	return underlay[type]
}

export const animateFAB = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTimingFactory) => {
	const animateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.STANDARD)

	return (disabled?: boolean) => animateSharedValueTo(disabled ? 0 : 1)
}
