import type {WritableDraft} from 'immer'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTiming, StateEvent} from '../../hooks'
import type {AnimateButtonOptions, ButtonState, ButtonType, HandleButtonStateChangeOptions} from './Button.interface'

import {COMPONENT_STATUS, EVENT_NAME, type EventName, type State, STATE} from '../../constants'
import {DURATION, EASING, type Token} from '../../theme'
import {ELEVATION_VALUE, type ElevationValue} from '../Elevation'
import {BUTTON_TYPE} from './Button.enum'

export const updateButtonStatus = (setState: Updater<ButtonState>, disabled?: boolean) => (type?: ButtonType) =>
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

export const handleButtonStateChange = (
	_event: StateEvent,
	setState: Updater<ButtonState>,
	{eventName, state, type}: HandleButtonStateChangeOptions
) => {
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
	(setState: Updater<ButtonState>, type?: ButtonType) => (disabled?: boolean) => {
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

export const animateButton = (
	[borderSharedValue, colorSharedValue]: [SharedValue<number>, SharedValue<number>],
	animatedTiming: AnimatedTiming,
	{borderColorInputRanges, disabled, type}: AnimateButtonOptions
) => {
	const animatedTimingOptions = {duration: DURATION.SHORT_2, easing: EASING.STANDARD}
	const colorAnimateSharedValueTo = animatedTiming(colorSharedValue, animatedTimingOptions)
	const borderAnimateSharedValueTo = animatedTiming(borderSharedValue, animatedTimingOptions)
	const toValue = disabled ? 0 : 1
	const animateOutlinedButton = (eventName: EventName, animateSharedValueTo: (toValue: number) => void) => {
		const value = disabled ? 0 : borderColorInputRanges[borderColorInputRanges.length - 2]

		return animateSharedValueTo(eventName === EVENT_NAME.FOCUS ? borderColorInputRanges[2] : value)
	}

	return (eventName: EventName) => {
		if (type === BUTTON_TYPE.OUTLINED) {
			animateOutlinedButton(eventName, borderAnimateSharedValueTo)
			colorAnimateSharedValueTo(toValue)

			return
		}

		colorAnimateSharedValueTo(toValue)
	}
}
