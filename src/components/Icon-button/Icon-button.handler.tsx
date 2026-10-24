import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {Theme} from '../../contexts'
import type {AnimatedTimingFactory, InteractionEvent} from '../../hooks'
import type {
	AnimateIconButtonOptions,
	HandleIconButtonInteractionStateChangeOptions,
	IconButtonState,
	IconButtonType
} from './Icon-button.interface'

import {EVENT_NAME} from '../../constants'
import {ANIMATED_TIMING} from '../../theme'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'

export const handleIconButtonStateChange = (
	_event: InteractionEvent,
	setState: Updater<IconButtonState>,
	{eventName}: HandleIconButtonInteractionStateChangeOptions
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
		[ICON_BUTTON_TYPE.FILLED]: token.colors.onPrimary,
		[ICON_BUTTON_TYPE.OUTLINED]: token.colors.onSurfaceVariant,
		[ICON_BUTTON_TYPE.SELECTED]: token.colors.onSurfaceVariant,
		[ICON_BUTTON_TYPE.STANDARD]: token.colors.onSurfaceVariant,
		[ICON_BUTTON_TYPE.TONAL]: token.colors.onSecondaryContainer
	}

	return underlay[type]
}

export const animateIconButton = (
	[borderSharedValue, colorSharedValue]: [SharedValue<number>, SharedValue<number>],
	animatedTiming: AnimatedTimingFactory,
	{type}: AnimateIconButtonOptions
) => {
	const borderAnimateSharedValueTo = animatedTiming(borderSharedValue, ANIMATED_TIMING.STANDARD)
	const colorAnimateSharedValueTo = animatedTiming(colorSharedValue, ANIMATED_TIMING.STANDARD)

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
