import type {WritableDraft} from 'immer'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import {COMPONENT_STATUS, EVENT_NAME, STATE} from '../../constants'
import type {Theme} from '../../contexts'
import type {AnimatedTimingOptions, AnimateSharedValueTo, StateEvent} from '../../hooks'
import {FAB_TYPE} from './FAB.enum'
import type {FABState, FABType, HandleFABStateChangeOptions} from './FAB.interface'
import {ELEVATION_VALUE, type ElevationValue} from '../Elevation'
import {DURATION, EASING} from '../../theme'

export const updateFABStatus = (disabled?: boolean) => (setState: Updater<FABState>) => (elevated?: boolean) =>
	setState(draft => {
		if (draft.status !== COMPONENT_STATUS.IDLE) {
			return
		}

		if (!disabled) {
			draft.elevation = elevated ? ELEVATION_VALUE.LEVEL_3 : ELEVATION_VALUE.LEVEL_0
		}

		draft.status = COMPONENT_STATUS.SUCCEEDED
	})

export const handleFABStateChange = ({eventName, elevated, state}: HandleFABStateChangeOptions) => {
	const applyFABElevationToDraft = (draft: WritableDraft<FABState>) => {
		if (!elevated) {
			return
		}
		const baseElevation = ELEVATION_VALUE.LEVEL_3
		const level = {
			[STATE.DISABLED]: ELEVATION_VALUE.LEVEL_0,
			[STATE.ENABLED]: ELEVATION_VALUE.LEVEL_0,
			[STATE.ERROR]: ELEVATION_VALUE.LEVEL_0,
			[STATE.FOCUSED]: ELEVATION_VALUE.LEVEL_0,
			[STATE.HOVERED]: ELEVATION_VALUE.LEVEL_1,
			[STATE.LONG_PRESS_IN]: ELEVATION_VALUE.LEVEL_0,
			[STATE.PRESS_IN]: ELEVATION_VALUE.LEVEL_0
		}

		if (state) {
			draft.elevation = (state === STATE.DISABLED ? level[state] : level[state] + baseElevation) as ElevationValue
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
			draft.elevation = disabled ? ELEVATION_VALUE.LEVEL_0 : ELEVATION_VALUE.LEVEL_3
		}
	})

export const getFABUnderlayColor = ({token}: Theme) => {
	const underlay = {
		[FAB_TYPE.PRIMARY]: token.scheme.onPrimaryContainer,
		[FAB_TYPE.SECONDARY]: token.scheme.onSecondaryContainer,
		[FAB_TYPE.SURFACE]: token.scheme.primary,
		[FAB_TYPE.TERTIARY]: token.scheme.onTertiaryContainer
	}

	return (type: FABType) => underlay[type]
}

export const animateFAB =
	(animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) =>
	(colorSharedValue: SharedValue<number>) => {
		const animateSharedValueTo = animatedTiming({duration: DURATION.SHORT_2, easing: EASING.STANDARD})({
			sharedValue: colorSharedValue
		})

		return (disabled?: boolean) => animateSharedValueTo(disabled ? 0 : 1)
	}
