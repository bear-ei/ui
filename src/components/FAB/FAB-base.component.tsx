import {SIZE} from '@bearei/material-token'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useStateEvent} from '../../hooks'
import type {State} from '../Common'
import {
	handleFABDisabled,
	handleFABStateChange,
	handleFABStatus,
	handleFABUnderlayColor,
	renderFABIcon
} from './FAB-handle'
import {FAB_TYPE} from './FAB.enum'
import type {FABBaseProps, FABState} from './FAB.interface'
import {useFABAnimated} from './use-fab-animated.hook'

export const FABBase = forwardRef<View, FABBaseProps>(
	(
		{
			disabled: rawDisabled,
			elevated = true,
			extendedFAB,
			icon,
			labelText,
			loading,
			renderFAB,
			size = SIZE.MEDIUM,
			type = FAB_TYPE.PRIMARY,
			...renderFABProps
		},
		ref
	) => {
		const [{elevation, eventName, status}, setState] = useImmer<FABState>({status: 'idle'})
		const id = useId()
		const theme = useTheme()
		const fabIconElement = renderFABIcon({eventName, type, disabled: rawDisabled, size, id})(theme)(icon)
		const onFABDisabled = useMemo(() => handleFABDisabled(setState)(elevated), [elevated, setState])
		const onFABStatus = useMemo(() => handleFABStatus(setState)(rawDisabled), [rawDisabled, setState])
		const underlayColor = handleFABUnderlayColor(theme)(type)
		const disabled = loading || rawDisabled
		const onStateEventChange =
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleFABStateChange({...options, state, elevated})(setState)(event)

		const interactionHandlers = useStateEvent({...renderFABProps, disabled, onStateEventChange})
		const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useFABAnimated({
			disabled: rawDisabled,
			type
		})

		useEffect(() => {
			onFABDisabled(rawDisabled)
		}, [rawDisabled, onFABDisabled])

		useEffect(() => {
			onFABStatus(elevated)
		}, [elevated, onFABStatus])

		if (status === 'idle') {
			return <></>
		}

		return renderFAB({
			...renderFABProps,
			backgroundUnderlayAnimatedStyle,
			disabled,
			elevation,
			eventName,
			extendedFAB: extendedFAB ?? !!labelText,
			icon: fabIconElement,
			id,
			interactionHandlers,
			labelText,
			labelTextAnimatedStyle,
			loading,
			ref,
			size,
			type,
			underlayColor
		})
	}
)
