import {useCallback, useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {IconButtonBaseProps, IconButtonState} from './Icon-button.interface'

import {EVENT_NAME, type InteractionState} from '../../constants'
import {useTheme, type HandleInteractionStateChangeOptions, type InteractionEvent} from '../../hooks'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import {
	getIconButtonUnderlayColor,
	handleIconButtonStateChange,
	updateIconButtonDisabledState
} from './Icon-button.handler'
import {RenderIconButton, RenderIconButtonIcon} from './Icon-button.render'
import {useIconButtonAnimated} from './use-icon-button-animated.hook'

export const IconButtonBase: FC<IconButtonBaseProps> = ({
	disabled: rawDisabled = false,
	icon,
	iconColor,
	loading,
	size,
	type = ICON_BUTTON_TYPE.STANDARD,
	...renderIconButtonProps
}) => {
	const [{eventName}, setState] = useImmer<IconButtonState>({eventName: EVENT_NAME.NONE})
	const id = useId()
	const isDisabled = loading || rawDisabled
	const theme = useTheme()
	const underlayColor = getIconButtonUnderlayColor(type, theme)
	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, interactionState: InteractionState, options: HandleInteractionStateChangeOptions) =>
			handleIconButtonStateChange(event, setState, {...options, interactionState}),
		[setState]
	)

	const {backgroundUnderlayAnimatedStyle} = useIconButtonAnimated({disabled: rawDisabled, type})
	const runUpdateDisabledState = useMemo(() => updateIconButtonDisabledState(setState), [setState])
	const iconElement = (
		<RenderIconButtonIcon
			disabled={isDisabled}
			icon={icon}
			iconColor={iconColor}
			id={id}
			size={size}
			type={type}
		/>
	)

	useEffect(() => {
		runUpdateDisabledState(isDisabled)
	}, [runUpdateDisabledState, isDisabled])

	return (
		<RenderIconButton
			{...renderIconButtonProps}
			backgroundUnderlayAnimatedStyle={backgroundUnderlayAnimatedStyle}
			disabled={isDisabled}
			eventName={eventName}
			iconElement={iconElement}
			id={id}
			loading={loading}
			onInteractionStateChange={onInteractionStateChange}
			size={size}
			type={type}
			underlayColor={underlayColor}
		/>
	)
}
