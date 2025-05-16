import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {createStableHandlerWithState} from '../../utils'
import {COMPONENT_STATUS, type State} from '../Common'
import {BUTTON_TYPE} from './Button.enum'
import {
	getButtonUnderlayColor,
	handleButtonStateChange,
	updateButtonDisabledState,
	updateButtonState
} from './Button.handler'
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
		const underlayColor = getButtonUnderlayColor(theme)(type)
		const runUpdateButtonStateEffect = useMemo(
			() => createStableHandlerWithState(updateButtonState(rawDisabled))(setState)(),
			[rawDisabled, setState]
		)

		const runUpdateButtonDisabledStateEffect = useMemo(
			() => createStableHandlerWithState(updateButtonDisabledState(type))(setState)(),
			[setState, type]
		)

		const onButtonStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleButtonStateChange({...options, state, type})(setState)(event),
			[setState, type]
		)

		const interactionHandlers = useInteractionStateEvent({
			...renderButtonProps,
			disabled: isDisabled,
			onStateEventChange: onButtonStateEventChange
		})

		const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useButtonAnimated({
			disabled: rawDisabled,
			error,
			eventName,
			type
		})

		const iconElement = useMemo(
			() => renderButtonIcon({type, disabled: rawDisabled, id})(theme)(icon),
			[icon, id, rawDisabled, theme, type]
		)

		useEffect(() => {
			runUpdateButtonStateEffect(type)
		}, [type, runUpdateButtonStateEffect])

		useEffect(() => {
			runUpdateButtonDisabledStateEffect(isDisabled)
		}, [isDisabled, runUpdateButtonDisabledStateEffect])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return renderButton({
			...renderButtonProps,
			backgroundUnderlayAnimatedStyle,
			disabled: isDisabled,
			elevation,
			eventName,
			iconElement,
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
