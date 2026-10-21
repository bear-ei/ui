import type {WritableDraft} from 'immer'
import type {Updater} from 'use-immer'

import type {StateEvent} from '../../hooks'
import type {
	AnimateButtonOptions,
	AnimateButtonSharedValues,
	ButtonState,
	ButtonType,
	HandleButtonStateChangeOptions
} from './Button.interface'

import {COMPONENT_STATUS, EVENT_NAME, type EventName, type State, STATE} from '../../constants'
import {DURATION, EASING, type Token} from '../../theme'
import {ELEVATION_VALUE, type ElevationValue} from '../Elevation'
import {BUTTON_TYPE} from './Button.enum'

export const updateButtonStatus = (disabled?: boolean) => (setState: Updater<ButtonState>) => (type?: ButtonType) =>
	setState(draft => {
		if (draft.status !== COMPONENT_STATUS.IDLE) {
			return
		}

		if (type === BUTTON_TYPE.ELEVATED && !disabled) {
			draft.elevation = ELEVATION_VALUE.LEVEL_1
		}

		draft.status = COMPONENT_STATUS.SUCCEEDED
	})

const ELEVATED_BUTTON_TYPES = [BUTTON_TYPE.ELEVATED, BUTTON_TYPE.FILLED, BUTTON_TYPE.TONAL] as readonly ButtonType[]
const ELEVATION_VALUE_MAP = {
	[STATE.DISABLED]: ELEVATION_VALUE.LEVEL_0,
	[STATE.ENABLED]: ELEVATION_VALUE.LEVEL_0,
	[STATE.ERROR]: ELEVATION_VALUE.LEVEL_0,
	[STATE.FOCUSED]: ELEVATION_VALUE.LEVEL_0,
	[STATE.HOVERED]: ELEVATION_VALUE.LEVEL_1,
	[STATE.LONG_PRESS]: ELEVATION_VALUE.LEVEL_0,
	[STATE.PRESS_IN]: ELEVATION_VALUE.LEVEL_0
}

export const updateButtonElevation = (draft: WritableDraft<ButtonState>) => (type?: ButtonType) => (state?: State) => {
	const isElevated = type && ELEVATED_BUTTON_TYPES.includes(type)

	if (!isElevated) {
		return
	}

	const correctionCoefficient = type === BUTTON_TYPE.ELEVATED ? ELEVATION_VALUE.LEVEL_1 : ELEVATION_VALUE.LEVEL_0

	if (!state) {
		return
	}

	draft.elevation = (
		state === STATE.DISABLED ?
			ELEVATION_VALUE_MAP[state]
		:	ELEVATION_VALUE_MAP[state] + correctionCoefficient) as ElevationValue
}

export const handleButtonStateChange =
	({eventName, state, type}: HandleButtonStateChangeOptions) =>
	(setState: Updater<ButtonState>) =>
	(_event: StateEvent) => {
		if (eventName === EVENT_NAME.LAYOUT) {
			return
		}

		setState(draft => {
			if (draft.eventName === eventName) {
				return
			}

			draft.eventName = eventName

			updateButtonElevation(draft)(type)(state)
		})
	}

export const updateButtonDisabledState =
	(type?: ButtonType) => (setState: Updater<ButtonState>) => (disabled?: boolean) => {
		if (typeof disabled !== 'boolean') {
			return
		}

		setState(draft => {
			if (disabled) {
				draft.eventName = EVENT_NAME.NONE
				draft.elevation = ELEVATION_VALUE.LEVEL_0

				return
			}

			if (type === BUTTON_TYPE.ELEVATED) {
				draft.elevation = ELEVATION_VALUE.LEVEL_1
			}
		})
	}

export const getButtonUnderlayColor = (token: Token) => (linkColor?: string) => {
	const underlay = {
		[BUTTON_TYPE.ELEVATED]: token.scheme.primary,
		[BUTTON_TYPE.FILLED]: token.scheme.onPrimary,
		[BUTTON_TYPE.LINK]: linkColor ?? token.scheme.primary,
		[BUTTON_TYPE.OUTLINED]: token.scheme.primary,
		[BUTTON_TYPE.TEXT]: token.scheme.primary,
		[BUTTON_TYPE.TONAL]: token.scheme.onSecondaryContainer
	}

	return (type: ButtonType) => underlay[type]
}

export const animateButton = ({animatedTiming, borderColorInputRanges, disabled, type}: AnimateButtonOptions) => {
	const animateSharedValue = animatedTiming({duration: DURATION.SHORT_2, easing: EASING.STANDARD})
	const toValue = disabled ? 0 : 1
	const animateOutlinedButton = (borderAnimateSharedValueTo: (toValue: number) => void) => {
		const value = disabled ? 0 : borderColorInputRanges[borderColorInputRanges.length - 2]

		return (eventName?: EventName) =>
			borderAnimateSharedValueTo(eventName === EVENT_NAME.FOCUS ? borderColorInputRanges[2] : value)
	}

	return ({borderSharedValue, colorSharedValue}: AnimateButtonSharedValues) => {
		const colorAnimateSharedValueTo = animateSharedValue({sharedValue: colorSharedValue})
		const borderAnimateSharedValueTo = animateSharedValue({sharedValue: borderSharedValue})

		return (eventName?: EventName) => {
			if (type === BUTTON_TYPE.OUTLINED) {
				animateOutlinedButton(borderAnimateSharedValueTo)(eventName)
				colorAnimateSharedValueTo(toValue)

				return
			}

			colorAnimateSharedValueTo(toValue)
		}
	}
}
