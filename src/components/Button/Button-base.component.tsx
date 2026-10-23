import {useCallback, useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {ButtonBaseProps, ButtonState} from './Button.interface'

import {COMPONENT_STATUS, EVENT_NAME, type State} from '../../constants'
import {useTheme, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {BUTTON_TYPE} from './Button.enum'
import {
	getButtonUnderlayColor,
	handleButtonStateChange,
	updateButtonDisabledState,
	updateButtonStatus
} from './Button.handler'
import {RenderButton, RenderButtonIcon} from './Button.render'
import {useButtonAnimated} from './use-button-animated.hook'

export const ButtonBase: FC<ButtonBaseProps> = ({
	disabled: rawDisabled,
	error,
	icon,
	labelText = 'Label',
	linkColor,
	loading,
	size,
	type = BUTTON_TYPE.FILLED,
	...renderButtonProps
}) => {
	const [{elevation, eventName, status}, setState] = useImmer<ButtonState>({
		eventName: EVENT_NAME.NONE,
		status: COMPONENT_STATUS.IDLE
	})

	const id = useId()
	const isDisabled = loading || rawDisabled
	const {token} = useTheme()
	const underlayColor = getButtonUnderlayColor(type, token, linkColor)
	const onStateEventChange = useCallback(
		(event: StateEvent, state: State, options: HandleStateEventChangeOptions) =>
			handleButtonStateChange(event, setState, {...options, state, type}),
		[setState, type]
	)

	const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useButtonAnimated({
		disabled: rawDisabled,
		error,
		eventName,
		linkColor,
		type
	})

	const runUpdateStatus = useMemo(() => updateButtonStatus(setState, isDisabled), [isDisabled, setState])
	const runUpdateDisabledState = useMemo(() => updateButtonDisabledState(setState, type), [setState, type])
	const iconElement = icon && (
		<RenderButtonIcon
			disabled={rawDisabled}
			icon={icon}
			id={id}
			size={size}
			type={type}
		/>
	)

	useEffect(() => {
		runUpdateStatus(type)
	}, [type, runUpdateStatus])

	useEffect(() => {
		runUpdateDisabledState(isDisabled)
	}, [isDisabled, runUpdateDisabledState])

	return (
		<RenderButton
			{...renderButtonProps}
			backgroundUnderlayAnimatedStyle={backgroundUnderlayAnimatedStyle}
			disabled={isDisabled}
			elevation={elevation}
			eventName={eventName}
			iconElement={iconElement}
			id={id}
			labelText={labelText}
			labelTextAnimatedStyle={labelTextAnimatedStyle}
			linkColor={linkColor}
			loading={loading}
			onStateEventChange={onStateEventChange}
			size={size}
			status={status}
			type={type}
			underlayColor={underlayColor}
		/>
	)
}
