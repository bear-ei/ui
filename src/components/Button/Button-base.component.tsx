import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {useStateEvent, type ProcessStateEventChangeOptions, type StateEvent} from '../../hooks'
import {createHandlerWithUpdater} from '../../utils'
import {COMPONENT_STATUS, type State} from '../Common'
import {
	processButtonDisabled,
	processButtonStateChange,
	processButtonStatus,
	processButtonUnderlayColor
} from './Button-handler'
import {BUTTON_TYPE} from './Button.enum'
import type {ButtonBaseProps, ButtonState} from './Button.interface'
import {renderButtonIcon} from './Button.render'
import {useButtonAnimated} from './use-button-animated.hook'

export const ButtonBase = forwardRef<View, ButtonBaseProps>(
	(
		{
			disabled: rawDisabled,
			error,
			icon,
			labelText = 'Label',
			loading,
			renderButton,
			type = BUTTON_TYPE.FILLED,
			...renderButtonProps
		},
		ref
	) => {
		const [{elevation, eventName, status}, setState] = useImmer<ButtonState>({
			status: COMPONENT_STATUS.IDLE
		})

		const id = useId()
		const isDisabled = loading || rawDisabled
		const theme = useTheme()
		const underlayColor = processButtonUnderlayColor(theme)(type)
		const buttonStatusHandler = useMemo(
			() => createHandlerWithUpdater(processButtonStatus(rawDisabled))(setState)(),
			[rawDisabled, setState]
		)

		const buttonDisabledHandler = useMemo(
			() => createHandlerWithUpdater(processButtonDisabled(type))(setState)(),
			[setState, type]
		)

		const onStateEventChange = useCallback(
			(options: ProcessStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				processButtonStateChange({...options, state, type})(setState)(event),
			[setState, type]
		)

		const interactionHandlers = useStateEvent({
			...renderButtonProps,
			disabled: isDisabled,
			onStateEventChange
		})

		const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useButtonAnimated({
			disabled: rawDisabled,
			error,
			eventName,
			type
		})

		const iconButtonElement = useMemo(
			() => renderButtonIcon({type, disabled: rawDisabled, id})(theme)(icon),
			[icon, id, rawDisabled, theme, type]
		)

		useEffect(() => {
			buttonStatusHandler(type)
		}, [buttonStatusHandler, type])

		useEffect(() => {
			buttonDisabledHandler(isDisabled)
		}, [isDisabled, buttonDisabledHandler])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return renderButton({
			...renderButtonProps,
			backgroundUnderlayAnimatedStyle,
			disabled: isDisabled,
			elevation,
			eventName,
			icon: iconButtonElement,
			id,
			interactionHandlers,
			labelText,
			labelTextAnimatedStyle,
			loading,
			ref,
			type,
			underlayColor
		})
	}
)
