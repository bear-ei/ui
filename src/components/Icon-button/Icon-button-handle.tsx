import {cloneElement} from 'react'
import type {DefaultTheme} from 'styled-components/native'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../hooks'
import type {IconProps} from '../Icon'
import {ICON_STYLE, ICON_TYPE, Icon} from '../Icon'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import type {
	HandleIconButtonAnimatedTimingOptions,
	HandleIconButtonAnimatedTimingSharedValue,
	HandleIconButtonStateChangeOptions,
	IconButtonState,
	IconButtonType,
	RenderIconButtonIconOptions
} from './Icon-button.interface'

export const handleIconButtonStateChange =
	({eventName}: HandleIconButtonStateChangeOptions) =>
	(setState: Updater<IconButtonState>) =>
	(_event: StateEvent) => {
		if (eventName === 'layout') {
			return
		}

		setState(draft => {
			draft.eventName = eventName
		})
	}

export const handleIconButtonDisabled = (setState: Updater<IconButtonState>) => (disabled?: boolean) =>
	disabled &&
	setState(draft => {
		draft.eventName = 'none'
	})

export const handleIconButtonUnderlayColor = (theme: DefaultTheme) => {
	const underlay = {
		[ICON_BUTTON_TYPE.ACTIVE]: theme.token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.FILLED]: theme.token.scheme.onPrimary,
		[ICON_BUTTON_TYPE.OUTLINED]: theme.token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.STANDARD]: theme.token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.TONAL]: theme.token.scheme.onSecondaryContainer
	}

	return (type: IconButtonType = ICON_BUTTON_TYPE.FILLED) => underlay[type]
}

export const renderIconButtonIcon =
	({disabled, type, fill: rawFill, loading, id}: RenderIconButtonIconOptions) =>
	(theme: DefaultTheme) => {
		const fillType = {
			[ICON_BUTTON_TYPE.ACTIVE]: theme.token.scheme.onSurfaceVariant,
			[ICON_BUTTON_TYPE.FILLED]: theme.token.scheme.onPrimary,
			[ICON_BUTTON_TYPE.OUTLINED]: theme.token.scheme.onSurfaceVariant,
			[ICON_BUTTON_TYPE.STANDARD]: theme.token.scheme.onSurfaceVariant,
			[ICON_BUTTON_TYPE.TONAL]: theme.token.scheme.onSecondaryContainer
		}

		const fill =
			rawFill ??
			(!loading ? fillType[type as keyof typeof fillType] : theme.token.scheme.onSurfaceVariant)

		return (icon?: React.JSX.Element) =>
			cloneElement<IconProps>(
				icon ?? (
					<Icon
						iconStyle={ICON_STYLE.ROUNDED}
						type={ICON_TYPE.OUTLINED}
					/>
				),
				{
					disabled,
					fill,
					testID: `iconButton__icon--${id}`
				}
			)
	}

export const handleIconButtonAnimatedTiming =
	({animatedTiming, type}: HandleIconButtonAnimatedTimingOptions) =>
	({borderSharedValue, colorSharedValue}: HandleIconButtonAnimatedTimingSharedValue) =>
	(disabled?: boolean) => {
		const toValue = disabled ? 0 : 1

		if (type === ICON_BUTTON_TYPE.OUTLINED) {
			animatedTiming()(borderSharedValue)(toValue)
			animatedTiming()(colorSharedValue)(toValue)

			return
		}

		animatedTiming()(colorSharedValue)(toValue)
	}
