import {useCallback, useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {CheckboxBaseProps, CheckboxState} from './Checkbox.interface'

import {COMPONENT_STATUS, type InteractionState} from '../../constants'
import {usePendingEvent, type HandleInteractionStateChangeOptions, type InteractionEvent} from '../../hooks'
import {CHECKBOX_VALUE} from './Checkbox.enum'
import {
	handleCheckboxStateChange,
	updateCheckboxChecked,
	updateCheckboxIndeterminate,
	updateCheckboxStatus
} from './Checkbox.handler'
import {RenderCheckbox} from './Checkbox.render'

export const CheckboxBase: FC<CheckboxBaseProps> = ({
	checked: rawChecked,
	defaultChecked,
	disabled,
	error,
	indeterminate,
	onCheckedChange,
	...renderCheckboxProps
}) => {
	const [{checked: isChecked, eventName, pendingCheckedEvent, status, value}, setState] = useImmer<CheckboxState>({
		checked: rawChecked ?? defaultChecked,
		status: COMPONENT_STATUS.IDLE,
		value: CHECKBOX_VALUE.UNSELECTED
	})

	usePendingEvent('pendingCheckedEvent', onCheckedChange, {pendingEvent: pendingCheckedEvent, setState})

	const id = useId()
	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, interactionState: InteractionState, options: HandleInteractionStateChangeOptions) =>
			handleCheckboxStateChange(event, setState, {
				...options,
				checked: isChecked,
				indeterminate,
				interactionState,
				onCheckedChange
			}),
		[indeterminate, isChecked, onCheckedChange, setState]
	)

	const runUpdateStatus = useMemo(() => updateCheckboxStatus(setState), [setState])
	const runUpdateIndeterminate = useMemo(() => updateCheckboxIndeterminate(setState), [setState])

	// updateCheckboxChecked is the "prop sync" path: it intentionally omits
	// onCheckedChange, so prop-driven updates do NOT fire the callback. Only the
	// user interaction path (handleCheckboxStateChange) passes onCheckedChange.
	const runUpdateChecked = useMemo(() => updateCheckboxChecked(setState, {indeterminate}), [indeterminate, setState])

	useEffect(() => {
		runUpdateIndeterminate(indeterminate)
		runUpdateStatus(indeterminate)
	}, [indeterminate, runUpdateIndeterminate, runUpdateStatus])

	useEffect(() => {
		runUpdateChecked(rawChecked)
	}, [runUpdateChecked, rawChecked])

	return (
		<RenderCheckbox
			{...renderCheckboxProps}
			disabled={disabled}
			error={error}
			eventName={eventName}
			id={id}
			onInteractionStateChange={onInteractionStateChange}
			status={status}
			value={value}
		/>
	)
}
