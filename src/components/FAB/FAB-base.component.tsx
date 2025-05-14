import {SIZE} from '@bearei/material-token'
import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {useStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {createStableHandlerWithState} from '../../utils'
import {COMPONENT_STATUS, type State} from '../Common'
import {getFABUnderlayColor, handleFABStateChange, updateFABDisabledState, updateFABStatus} from './FAB-handler'
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
		const [{elevation, eventName, status}, setState] = useImmer<FABState>({status: COMPONENT_STATUS.IDLE})
		const id = useId()
		const theme = useTheme()
		const isDisabled = loading || rawDisabled
		const underlayColor = getFABUnderlayColor(theme)(type)
		const updateFABStatusEffect = useMemo(
			() => createStableHandlerWithState(updateFABStatus(rawDisabled))(setState)(),
			[rawDisabled, setState]
		)

		const updateFABDisabledStateEffect = useMemo(
			() => createStableHandlerWithState(updateFABDisabledState(elevated))(setState)(),
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
			updateFABDisabledStateEffect(isDisabled)
		}, [isDisabled, updateFABDisabledStateEffect])

		useEffect(() => {
			updateFABStatusEffect(elevated)
		}, [elevated, updateFABStatusEffect])

		if (status === COMPONENT_STATUS.IDLE) {
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
