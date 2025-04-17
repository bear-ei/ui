import {SIZE} from '@bearei/material-token'
import type {WritableDraft} from 'immer'
import {cloneElement} from 'react'
import type {SharedValue} from 'react-native-reanimated'
import type {DefaultTheme} from 'styled-components/native'
import type {Updater} from 'use-immer'
import type {AnimatedTiming, StateEvent} from '../../hooks'
import type {State} from '../Common'
import {ELEVATION, type ElevationLevel} from '../Elevation'
import type {IconProps} from '../Icon'
import {FAB_TYPE} from './FAB.enum'
import type {FABState, FABType, HandleFABStateChangeOptions, RenderFABIconOptions} from './FAB.interface'

export const handleFABStatus = (setState: Updater<FABState>) => (disabled?: boolean) => (elevated?: boolean) =>
	setState(draft => {
		if (draft.status !== 'idle') {
			return
		}

		if (elevated && !disabled) {
			draft.elevation = ELEVATION.LEVEL_3
		}

		draft.status = 'succeeded'
	})

const handleFABElevation = (draft: WritableDraft<FABState>) => (elevated?: boolean) => (state?: State) => {
	if (!elevated) {
		return
	}

	const level = {
		disabled: ELEVATION.LEVEL_0,
		enabled: ELEVATION.LEVEL_0,
		error: ELEVATION.LEVEL_0,
		focused: ELEVATION.LEVEL_0,
		hovered: ELEVATION.LEVEL_1,
		longPressIn: ELEVATION.LEVEL_0,
		pressIn: ELEVATION.LEVEL_0
	}

	if (state) {
		draft.elevation = (
			state === 'disabled' ?
				level[state]
			:	level[state] + ELEVATION.LEVEL_3) as ElevationLevel
	}
}

export const handleFABStateChange =
	({eventName, elevated, state}: HandleFABStateChangeOptions) =>
	(setState: Updater<FABState>) =>
	(_event: StateEvent) => {
		if (eventName === 'layout') {
			return
		}

		setState(draft => {
			const prevEventName = draft.eventName

			if (eventName) {
				draft.eventName = eventName
			}

			if (prevEventName !== eventName) {
				handleFABElevation(draft)(elevated)(state)
			}
		})
	}

export const handleFABDisabled = (setState: Updater<FABState>) => (elevated?: boolean) => (disabled?: boolean) =>
	typeof disabled === 'boolean' &&
	setState(draft => {
		if (disabled) {
			draft.eventName = 'none'
		}

		if (elevated) {
			draft.elevation = disabled ? ELEVATION.LEVEL_0 : ELEVATION.LEVEL_1
		}
	})

export const handleFABUnderlayColor = (theme: DefaultTheme) => {
	const underlay = {
		[FAB_TYPE.PRIMARY]: theme.token.scheme.onPrimaryContainer,
		[FAB_TYPE.SECONDARY]: theme.token.scheme.onSecondaryContainer,
		[FAB_TYPE.SURFACE]: theme.token.scheme.primary,
		[FAB_TYPE.TERTIARY]: theme.token.scheme.onTertiaryContainer
	}

	return (type: FABType) => underlay[type]
}

export const renderFABIcon =
	({disabled, eventName, size, type = FAB_TYPE.PRIMARY, testID}: RenderFABIconOptions) =>
	(theme: DefaultTheme) => {
		const fillType = {
			[FAB_TYPE.PRIMARY]: theme.token.scheme.onPrimaryContainer,
			[FAB_TYPE.SECONDARY]: theme.token.scheme.onSecondaryContainer,
			[FAB_TYPE.SURFACE]: theme.token.scheme.primary,
			[FAB_TYPE.TERTIARY]: theme.token.scheme.onTertiaryContainer
		} as Record<FABType, string>

		return (icon?: React.JSX.Element) => {
			if (!icon) {
				return icon
			}

			const iconSize = theme.adaptSize(theme.token.spacing.large + 3 * theme.token.spacing.extraSmall)

			return cloneElement<IconProps>(icon, {
				...(size === SIZE.LARGE && {width: iconSize, height: iconSize}),
				disabled,
				eventName,
				fill: fillType[type],
				testID
			})
		}
	}

export const handleFABAnimatedTiming =
	(animatedTiming: AnimatedTiming) => (colorSharedValue: SharedValue<number>) => (disabled?: boolean) =>
		animatedTiming()(colorSharedValue)(disabled ? 0 : 1)
