import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {useImmer} from 'use-immer'

import {COMPONENT_STATUS, type State} from '../../constants'
import {type HandleStateEventChangeOptions, type StateEvent, usePendingEvent} from '../../hooks'
import type {PressableType} from '../Touchable'

import {CHECKBOX_VALUE} from './Checkbox.enum'
import {
	handleCheckboxStateChange,
	updateCheckboxActive,
	updateCheckboxIndeterminate,
	updateCheckboxStatus
} from './Checkbox.handler'
import type {CheckboxBaseProps, CheckboxState} from './Checkbox.interface'
import {RenderCheckbox} from './Checkbox.render'

export const CheckboxBase = forwardRef<PressableType, CheckboxBaseProps>(
	({active: rawActive, defaultActive, disabled, error, indeterminate, onActive, ...renderCheckboxProps}, ref) => {
		const [{active: isActive, eventName, value, pendingActiveEvent, status}, setState] = useImmer<CheckboxState>({
			active: rawActive ?? defaultActive,
			status: COMPONENT_STATUS.IDLE,
			value: CHECKBOX_VALUE.UNSELECTED
		})

		usePendingEvent({eventKey: 'pendingActiveEvent', func: onActive, pendingEvent: pendingActiveEvent, setState})

		const id = useId()
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleCheckboxStateChange({...options, active: isActive, indeterminate, onActive, state})(setState)(
					event
				),
			[indeterminate, isActive, onActive, setState]
		)

		const runUpdateStatus = useMemo(() => updateCheckboxStatus(setState), [setState])
		const runUpdateIndeterminate = useMemo(() => updateCheckboxIndeterminate(setState), [setState])

		// updateCheckboxActive is the "prop sync" path: it intentionally omits
		// onActive, so prop-driven updates do NOT fire the callback. Only the
		// user interaction path (handleCheckboxStateChange) passes onActive.
		const runUpdateActive = useMemo(
			() => updateCheckboxActive({indeterminate})(setState),
			[indeterminate, setState]
		)

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
				ref={ref}
				status={status}
				value={value}
			/>
		)
	}
)

CheckboxBase.displayName = 'CheckboxBase'
