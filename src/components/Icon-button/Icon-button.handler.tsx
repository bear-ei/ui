import type {Updater} from 'use-immer'
import {EVENT_NAME} from '../../constants'
import type {Theme} from '../../contexts'
import type {StateEvent} from '../../hooks'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import type {
	AnimateIconButtonOptions,
	AnimateIconButtonSharedValues,
	HandleIconButtonStateChangeOptions,
	IconButtonState,
	IconButtonType
} from './Icon-button.interface'
import {DURATION, EASING} from '../../theme'

export const handleIconButtonStateChange =
	({eventName}: HandleIconButtonStateChangeOptions) =>
	(setState: Updater<IconButtonState>) =>
	(_event: StateEvent) =>
		eventName !== EVENT_NAME.LAYOUT &&
		setState(draft => {
			draft.eventName = eventName
		})

export const updateIconButtonDisabledState = (setState: Updater<IconButtonState>) => (disabled?: boolean) =>
	setState(draft => {
		draft.eventName = disabled ? EVENT_NAME.NONE : undefined
	})

export const getIconButtonUnderlayColor = ({token}: Theme) => {
	const underlay = {
		[ICON_BUTTON_TYPE.ACTIVE]: token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.FILLED]: token.scheme.onPrimary,
		[ICON_BUTTON_TYPE.OUTLINED]: token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.STANDARD]: token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.TONAL]: token.scheme.onSecondaryContainer
	}

	return (type: IconButtonType = ICON_BUTTON_TYPE.FILLED) => underlay[type]
}

export const animateIconButton =
	({animatedTiming, type}: AnimateIconButtonOptions) =>
	({borderSharedValue, colorSharedValue}: AnimateIconButtonSharedValues) => {
		const animatedTimingOptions = {duration: DURATION.SHORT_2, easing: EASING.STANDARD}
		const borderAnimateSharedValueTo = animatedTiming(animatedTimingOptions)({sharedValue: borderSharedValue})
		const colorAnimateSharedValueTo = animatedTiming(animatedTimingOptions)({sharedValue: colorSharedValue})

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
