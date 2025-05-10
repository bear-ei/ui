import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {useStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {createHandler} from '../../utils'
import type {State} from '../Common'
import {
	handleButtonDisabled,
	handleButtonInit,
	handleButtonStateChange,
	handleButtonUnderlayColor
} from './Button-handle'
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
		const [{elevation, eventName, status}, setState] = useImmer<ButtonState>({status: 'idle'})
		const id = useId()
		const theme = useTheme()
		const isDisabled = useMemo(() => loading || rawDisabled, [loading, rawDisabled])
		const underlayColor = handleButtonUnderlayColor(theme)(type)
		const onButtonInit = useMemo(
			() => createHandler(handleButtonInit(rawDisabled), setState),
			[rawDisabled, setState]
		)

		const onButtonDisabled = useMemo(
			() => createHandler(handleButtonDisabled(type), setState),
			[setState, type]
		)

		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleButtonStateChange({...options, state, type})(setState)(event),
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
			onButtonInit(type)
		}, [onButtonInit, type])

		useEffect(() => {
			onButtonDisabled(isDisabled)
		}, [isDisabled, onButtonDisabled])

		if (status === 'idle') {
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
