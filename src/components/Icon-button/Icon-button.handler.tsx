import type {DefaultTheme} from 'styled-components/native'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../hooks'
import {EVENT_NAME} from '../Common'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import type {
	AnimateIconButtonColorAndBorderOptions,
	AnimateIconButtonColorAndBorderSharedValues,
	HandleIconButtonStateChangeOptions,
	IconButtonState,
	IconButtonType
} from './Icon-button.interface'

export const handleIconButtonStateChange =
	({eventName}: HandleIconButtonStateChangeOptions) =>
	(setState: Updater<IconButtonState>) =>
	(_event: StateEvent) => {
		if (eventName === EVENT_NAME.LAYOUT) {
			return
		}

		setState(draft => {
			draft.eventName = eventName
		})
	}

export const updateIconButtonDisabledState = (setState: Updater<IconButtonState>) => (disabled?: boolean) =>
	disabled &&
	setState(draft => {
		draft.eventName = EVENT_NAME.NONE
	})

export const getButtonUnderlayColor = (theme: DefaultTheme) => {
	const underlay = {
		[ICON_BUTTON_TYPE.ACTIVE]: theme.token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.FILLED]: theme.token.scheme.onPrimary,
		[ICON_BUTTON_TYPE.OUTLINED]: theme.token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.STANDARD]: theme.token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.TONAL]: theme.token.scheme.onSecondaryContainer
	}

	return (type: IconButtonType = ICON_BUTTON_TYPE.FILLED) => underlay[type]
}

export const animateIconButtonColorAndBorder =
	({animatedTiming, type}: AnimateIconButtonColorAndBorderOptions) =>
	({borderSharedValue, colorSharedValue}: AnimateIconButtonColorAndBorderSharedValues) =>
	(disabled?: boolean) => {
		const toValue = disabled ? 0 : 1

		if (type === ICON_BUTTON_TYPE.OUTLINED) {
			animatedTiming()(borderSharedValue)(toValue)
			animatedTiming()(colorSharedValue)(toValue)

			return
		}

		animatedTiming()(colorSharedValue)(toValue)
	}
