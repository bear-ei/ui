import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useStateEvent} from '../../hooks'
import type {State} from '../Common'
import {
	handleButtonDisabled,
	handleButtonStateChange,
	handleButtonStatus,
	handleButtonUnderlayColor,
	renderButtonIcon
} from './Button-handle'
import {BUTTON_TYPE} from './Button.enum'
import type {ButtonBaseProps, ButtonState} from './Button.interface'
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
		const [{elevation, eventName, status}, setState] = useImmer<ButtonState>({status: 'idle'})
		const id = useId()
		const theme = useTheme()
		const onButtonDisabled = useMemo(() => handleButtonDisabled(setState)(type), [setState, type])
		const onButtonStatus = useMemo(() => handleButtonStatus(setState)(rawDisabled), [rawDisabled, setState])
		const underlayColor = handleButtonUnderlayColor(theme)(type)
		const onStateEventChange =
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleButtonStateChange({...options, state, type})(setState)(event)

		const disabled = useMemo(() => loading || rawDisabled, [loading, rawDisabled])
		const interactionHandlers = useStateEvent({...renderButtonProps, disabled, onStateEventChange})
		const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useButtonAnimated({
			disabled: rawDisabled,
			error,
			eventName,
			type
		})

		const iconButtonElement = renderButtonIcon({eventName, type, disabled: rawDisabled, id})(theme)(icon)

		useEffect(() => {
			onButtonStatus(type)
		}, [onButtonStatus, type])

		useEffect(() => {
			onButtonDisabled(disabled)
		}, [disabled, onButtonDisabled])

		if (status === 'idle') {
			return <></>
		}

		return renderButton({
			...renderButtonProps,
			backgroundUnderlayAnimatedStyle,
			disabled,
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
