import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useStateEvent} from '../../hooks'
import {runAfterInteractions} from '../../utils'
import type {State} from '../Common'
import {
	handleCheckboxActive,
	handleCheckboxIndeterminate,
	handleCheckboxStateChange,
	handleCheckboxStatus
} from './Checkbox-handle'
import {CHECKBOX_VALUE} from './Checkbox.enum'
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
		const [{active, eventName, status, value, nextActiveEvent}, setState] = useImmer<CheckboxState>({
			status: 'idle',
			value: CHECKBOX_VALUE.UNSELECTED
		})

		const id = useId()
		const theme = useTheme()
		const onCheckboxStatus = useMemo(() => handleCheckboxStatus(setState), [setState])
		const onCheckboxIndeterminate = useMemo(() => handleCheckboxIndeterminate(setState), [setState])
		const onCheckboxRawActive = useMemo(
			() => handleCheckboxActive({indeterminate})(setState),
			[indeterminate, setState]
		)

		const onStateEventChange =
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleCheckboxStateChange({...options, active, indeterminate, state, onActive})(
					setState
				)(event)

		const interactionHandlers = useStateEvent({...renderCheckboxProps, disabled, onStateEventChange})

		useEffect(() => {
			onCheckboxStatus(indeterminate)
			onCheckboxIndeterminate(indeterminate)
		}, [indeterminate, onCheckboxIndeterminate, onCheckboxStatus])

		useEffect(() => {
			onCheckboxRawActive(rawActive ?? defaultActive)
		}, [rawActive, defaultActive, onCheckboxRawActive])

		useEffect(() => {
			runAfterInteractions(nextActiveEvent)()
		}, [nextActiveEvent])

		if (status === 'idle') {
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
