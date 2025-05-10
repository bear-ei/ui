import {SIZE} from '@bearei/material-token'
import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {useStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {createHandler} from '../../utils'
import type {State} from '../Common'
import {handleFABDisabled, handleFABInit, handleFABStateChange, handleFABUnderlayColor} from './FAB-handle'
import {FAB_TYPE} from './FAB.enum'
import type {FABBaseProps, FABState} from './FAB.interface'
import {renderFABIcon} from './FAB.render'
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
		const isDisabled = useMemo(() => loading || rawDisabled, [loading, rawDisabled])
		const underlayColor = handleFABUnderlayColor(theme)(type)
		const onFABInit = useMemo(
			() => createHandler(handleFABInit(rawDisabled), setState),
			[rawDisabled, setState]
		)

		const onFABDisabled = useMemo(
			() => createHandler(handleFABDisabled(elevated), setState),
			[elevated, setState]
		)

		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleFABStateChange({...options, state, elevated})(setState)(event),
			[elevated, setState]
		)

		const interactionHandlers = useStateEvent({...renderFABProps, disabled: isDisabled, onStateEventChange})
		const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useFABAnimated({
			disabled: rawDisabled,
			type
		})

		const fabIconElement = useMemo(
			() => renderFABIcon({type, disabled: rawDisabled, size, id})(theme)(icon),
			[icon, id, rawDisabled, size, theme, type]
		)

		useEffect(() => {
			onFABDisabled(isDisabled)
		}, [isDisabled, onFABDisabled])

		useEffect(() => {
			onFABInit(elevated)
		}, [elevated, onFABInit])

		if (status === 'idle') {
			return <></>
		}

		return renderFAB({
			...renderFABProps,
			backgroundUnderlayAnimatedStyle,
			disabled: isDisabled,
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
