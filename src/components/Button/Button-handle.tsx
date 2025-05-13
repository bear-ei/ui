import type {WritableDraft} from 'immer'
import type {SharedValue} from 'react-native-reanimated'
import type {DefaultTheme} from 'styled-components/native'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../hooks'
import {COMPONENT_STATUS, EVENT_NAME, STATE, type EventName, type State} from '../Common'
import {ELEVATION, type ElevationLevel} from '../Elevation'
import {BUTTON_TYPE} from './Button.enum'
import type {
	ButtonState,
	ButtonType,
	HandleButtonAnimatedTimingOptions,
	HandleButtonAnimatedTimingSharedValueOptions,
	HandleButtonStateChangeOptions
} from './Button.interface'

export const handleButtonStatus = (disabled?: boolean) => (setState: Updater<ButtonState>) => (type?: ButtonType) =>
	setState(draft => {
		if (draft.status !== COMPONENT_STATUS.IDLE) {
			return
		}

		if (type === BUTTON_TYPE.ELEVATED && !disabled) {
			draft.elevation = ELEVATION.LEVEL_1
		}

		draft.status = COMPONENT_STATUS.SUCCEEDED
	})

export const handleButtonElevation = (draft: WritableDraft<ButtonState>) => (type?: ButtonType) => (state?: State) => {
	const elevatedTypes = [BUTTON_TYPE.ELEVATED, BUTTON_TYPE.FILLED, BUTTON_TYPE.TONAL] as const
	const isElevated = elevatedTypes.includes(type as (typeof elevatedTypes)[number])

	if (!isElevated) {
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

	const correctionCoefficient = type === BUTTON_TYPE.ELEVATED ? ELEVATION.LEVEL_1 : ELEVATION.LEVEL_0

	if (!state) {
		return
	}

	draft.elevation = (
		state === STATE.DISABLED ?
			level[state]
		:	level[state] + correctionCoefficient) as ElevationLevel
}

export const handleButtonStateChange =
	({eventName, type, state}: HandleButtonStateChangeOptions) =>
	(setState: Updater<ButtonState>) =>
	(_event: StateEvent) => {
		if (eventName === EVENT_NAME.LAYOUT) {
			return
		}

		setState(draft => {
			const prevEventName = draft.eventName

			draft.eventName = eventName

			if (prevEventName !== eventName) {
				handleButtonElevation(draft)(type)(state)
			}
		})
	}

export const handleButtonDisabled = (type?: ButtonType) => (setState: Updater<ButtonState>) => (disabled?: boolean) =>
	typeof disabled === 'boolean' &&
	setState(draft => {
		if (disabled) {
			draft.eventName = EVENT_NAME.NONE
		}

		if (type === BUTTON_TYPE.ELEVATED) {
			draft.elevation = disabled ? ELEVATION.LEVEL_0 : ELEVATION.LEVEL_1
		}
	})

export const createButtonUnderlayColor = (theme: DefaultTheme) => {
	const underlay = {
		[BUTTON_TYPE.ELEVATED]: theme.token.scheme.primary,
		[BUTTON_TYPE.FILLED]: theme.token.scheme.onPrimary,
		[BUTTON_TYPE.LINK]: theme.token.scheme.primary,
		[BUTTON_TYPE.OUTLINED]: theme.token.scheme.primary,
		[BUTTON_TYPE.TEXT]: theme.token.scheme.primary,
		[BUTTON_TYPE.TONAL]: theme.token.scheme.onSecondaryContainer
	}

	return (type: ButtonType) => underlay[type]
}

export const handleButtonOutlinedAnimatedTiming = ({
	animatedTiming,
	borderColorInputRanges,
	disabled
}: HandleButtonAnimatedTimingOptions) => {
	const value = disabled ? 0 : borderColorInputRanges[borderColorInputRanges.length - 2]

	return (borderSharedValue: SharedValue<number>) => (eventName?: EventName) => {
		const toValue = eventName === EVENT_NAME.FOCUS ? borderColorInputRanges[2] : value

		return animatedTiming()(borderSharedValue)(toValue)
	}
}

export const handleButtonAnimatedTiming = ({
	animatedTiming,
	borderColorInputRanges,
	disabled,
	type
}: HandleButtonAnimatedTimingOptions) => {
	const toValue = disabled ? 0 : 1

	return ({borderSharedValue, colorSharedValue}: HandleButtonAnimatedTimingSharedValueOptions) =>
		(eventName?: EventName) => {
			if (type === BUTTON_TYPE.OUTLINED) {
				handleButtonOutlinedAnimatedTiming({animatedTiming, borderColorInputRanges, disabled})(
					borderSharedValue
				)(eventName)

				animatedTiming()(colorSharedValue)(toValue)

				return
			}

			animatedTiming()(colorSharedValue)(toValue)
		}
}
