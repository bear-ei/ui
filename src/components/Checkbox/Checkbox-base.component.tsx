import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {createStableHandlerWithState, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, type State} from '../Common'
import {CHECKBOX_VALUE} from './Checkbox.enum'
import {
	handleCheckboxStateChange,
	updateCheckboxActive,
	updateCheckboxIndeterminate,
	updateCheckboxStatus
} from './Checkbox.handler'
import type {CheckboxBaseProps, CheckboxState} from './Checkbox.interface'

export const CheckboxBase = forwardRef<View, CheckboxBaseProps>(
	(
		{
			active: rawActive,
			defaultActive,
			disabled,
			error,
			indeterminate,
			onActive,
			renderCheckbox,
			...renderCheckboxProps
		},
		ref
	) => {
		const [{active: isActive, eventName, status, value, nextActiveEvent}, setState] =
			useImmer<CheckboxState>({status: COMPONENT_STATUS.IDLE, value: CHECKBOX_VALUE.UNSELECTED})

		const id = useId()
		const theme = useTheme()
		const applyUpdateCheckboxStatusEffect = useMemo(
			() => createStableHandlerWithState(updateCheckboxStatus)(setState)(),
			[setState]
		)

		const applyUpdateCheckboxIndeterminateEffect = useMemo(
			() => createStableHandlerWithState(updateCheckboxIndeterminate)(setState)(),
			[setState]
		)

		const applyUpdateCheckboxActiveEffect = useMemo(
			() => createStableHandlerWithState(updateCheckboxActive({indeterminate}))(setState)(),
			[indeterminate, setState]
		)

		const onCheckboxStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleCheckboxStateChange({
					...options,
					active: isActive,
					indeterminate,
					onActive,
					state
				})(setState)(event),
			[indeterminate, isActive, onActive, setState]
		)

		const interactionHandlers = useInteractionStateEvent({
			...renderCheckboxProps,
			disabled,
			onStateEventChange: onCheckboxStateEventChange
		})

		useEffect(() => {
			applyUpdateCheckboxStatusEffect(indeterminate)
			applyUpdateCheckboxIndeterminateEffect(indeterminate)
		}, [applyUpdateCheckboxIndeterminateEffect, applyUpdateCheckboxStatusEffect, indeterminate])

		useEffect(() => {
			applyUpdateCheckboxActiveEffect(rawActive ?? defaultActive)
		}, [applyUpdateCheckboxActiveEffect, defaultActive, rawActive])

		useEffect(() => {
			runAfterInteractions(nextActiveEvent)()
		}, [nextActiveEvent])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return renderCheckbox({
			...renderCheckboxProps,
			disabled,
			error,
			eventName,
			id,
			interactionHandlers,
			ref,
			theme,
			value
		})
	}
)
