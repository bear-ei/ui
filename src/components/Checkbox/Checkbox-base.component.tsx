import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {useStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {createHandler, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, type State} from '../Common'
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
		const [{active: isActive, eventName, status, value, nextActiveEvent}, setState] =
			useImmer<CheckboxState>({status: COMPONENT_STATUS.IDLE, value: CHECKBOX_VALUE.UNSELECTED})

		const id = useId()
		const theme = useTheme()
		const onCheckboxStatus = useMemo(() => createHandler(handleCheckboxStatus)(setState)(), [setState])
		const onCheckboxIndeterminate = useMemo(
			() => createHandler(handleCheckboxIndeterminate)(setState)(),
			[setState]
		)

		const onCheckboxRawActive = useMemo(
			() => createHandler(handleCheckboxActive({indeterminate}))(setState)(),
			[indeterminate, setState]
		)

		const onStateEventChange = useCallback(
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
