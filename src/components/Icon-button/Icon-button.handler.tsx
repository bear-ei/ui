import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {Theme} from '../../contexts'
import type {AnimatedTiming, StateEvent} from '../../hooks'
import type {
	AnimateIconButtonOptions,
	HandleIconButtonStateChangeOptions,
	IconButtonState,
	IconButtonType
} from './Icon-button.interface'

import {EVENT_NAME} from '../../constants'
import {DURATION, EASING} from '../../theme'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'

const ANIMATED_TIMING_OPTIONS = {duration: DURATION.SHORT_2, easing: EASING.STANDARD}
export const handleIconButtonStateChange = (
	_event: StateEvent,
	setState: Updater<IconButtonState>,
	{eventName}: HandleIconButtonStateChangeOptions
) => {
	if (eventName === EVENT_NAME.LAYOUT) {
		return
	}

	setState(draft => {
		draft.eventName = eventName
	})
}

export const updateIconButtonDisabledState = (setState: Updater<IconButtonState>) => (disabled?: boolean) => {
	if (typeof disabled !== 'boolean') {
		return
	}

	setState(draft => {
		if (disabled) {
			draft.eventName = EVENT_NAME.NONE
		}
	})
}

export const getIconButtonUnderlayColor = (type: IconButtonType, {token}: Theme) => {
	const underlay = {
		[ICON_BUTTON_TYPE.ACTIVE]: token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.FILLED]: token.scheme.onPrimary,
		[ICON_BUTTON_TYPE.OUTLINED]: token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.STANDARD]: token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.TONAL]: token.scheme.onSecondaryContainer
	}

	return underlay[type]
}

export const animateIconButton = (
	[borderSharedValue, colorSharedValue]: [SharedValue<number>, SharedValue<number>],
	animatedTiming: AnimatedTiming,
	{type}: AnimateIconButtonOptions
) => {
	const borderAnimateSharedValueTo = animatedTiming(borderSharedValue, ANIMATED_TIMING_OPTIONS)
	const colorAnimateSharedValueTo = animatedTiming(colorSharedValue, ANIMATED_TIMING_OPTIONS)

	return (disabled?: boolean) => {
		const toValue = disabled ? 0 : 1

		if (type === ICON_BUTTON_TYPE.OUTLINED) {
			borderAnimateSharedValueTo(toValue)
			colorAnimateSharedValueTo(toValue)

			return
		}

		colorAnimateSharedValueTo(toValue)
	}
}
