import {useCallback, useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {CheckboxBaseProps, CheckboxState} from './Checkbox.interface'

import {COMPONENT_STATUS, type State} from '../../constants'
import {usePendingEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {CHECKBOX_VALUE} from './Checkbox.enum'
import {
	handleCheckboxStateChange,
	updateCheckboxActive,
	updateCheckboxIndeterminate,
	updateCheckboxStatus
} from './Checkbox.handler'
import {RenderCheckbox} from './Checkbox.render'

export const CheckboxBase: FC<CheckboxBaseProps> = ({
	active: rawActive,
	defaultActive,
	disabled,
	error,
	indeterminate,
	onActive,
	...renderCheckboxProps
}) => {
	const [{active: isActive, eventName, pendingActiveEvent, status, value}, setState] = useImmer<CheckboxState>({
		active: rawActive ?? defaultActive,
		status: COMPONENT_STATUS.IDLE,
		value: CHECKBOX_VALUE.UNSELECTED
	})

	usePendingEvent('pendingActiveEvent', onActive, {pendingEvent: pendingActiveEvent, setState})

	const id = useId()
	const onStateEventChange = useCallback(
		(event: StateEvent, state: State, options: HandleStateEventChangeOptions) =>
			handleCheckboxStateChange(event, setState, {
				...options,
				active: isActive,
				indeterminate,
				onActive,
				state
			}),
		[indeterminate, isActive, onActive, setState]
	)

	const runUpdateStatus = useMemo(() => updateCheckboxStatus(setState), [setState])
	const runUpdateIndeterminate = useMemo(() => updateCheckboxIndeterminate(setState), [setState])

	// updateCheckboxActive is the "prop sync" path: it intentionally omits
	// onActive, so prop-driven updates do NOT fire the callback. Only the
	// user interaction path (handleCheckboxStateChange) passes onActive.
	const runUpdateActive = useMemo(() => updateCheckboxActive(setState, {indeterminate}), [indeterminate, setState])

	useEffect(() => {
		runUpdateIndeterminate(indeterminate)
		runUpdateStatus(indeterminate)
	}, [indeterminate, runUpdateIndeterminate, runUpdateStatus])

	useEffect(() => {
		runUpdateActive(rawActive)
	}, [runUpdateActive, rawActive])

	return (
		<RenderCheckbox
			{...renderCheckboxProps}
			disabled={disabled}
			error={error}
			eventName={eventName}
			id={id}
			onStateEventChange={onStateEventChange}
			status={status}
			value={value}
		/>
	)
}
