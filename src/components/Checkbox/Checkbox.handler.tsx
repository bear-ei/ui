import type {WritableDraft} from 'immer'
import type {Updater} from 'use-immer'

import type {StateEvent} from '../../hooks'
import type {CheckboxState, HandleCheckboxStateChangeOptions, UpdateCheckboxActiveOptions} from './Checkbox.interface'

import {COMPONENT_STATUS, EVENT_NAME} from '../../constants'
import {CHECKBOX_VALUE} from './Checkbox.enum'

export const updateCheckboxStatus = (setState: Updater<CheckboxState>) => (indeterminate?: boolean) =>
	setState(draft => {
		if (draft.status !== COMPONENT_STATUS.IDLE) {
			return
		}

		if (typeof draft.active === 'boolean') {
			const defaultValue = draft.active ? CHECKBOX_VALUE.SELECTED : CHECKBOX_VALUE.UNSELECTED

			draft.value = indeterminate ? CHECKBOX_VALUE.INDETERMINATE : defaultValue
		}

		draft.status = COMPONENT_STATUS.SUCCEEDED
	})

const applyCheckboxActiveStateToDraft = (
	draft: WritableDraft<CheckboxState>,
	{indeterminate, onActive, triggerEvent = true}: UpdateCheckboxActiveOptions,
	active?: boolean
) => {
	if (typeof active !== 'boolean') {
		return
	}

	const activeValue = indeterminate ? CHECKBOX_VALUE.INDETERMINATE : CHECKBOX_VALUE.SELECTED
	const nextValue = active ? activeValue : CHECKBOX_VALUE.UNSELECTED

	draft.value = nextValue

	if (draft.active !== active && onActive && triggerEvent) {
		draft.pendingActiveEvent = active
	}

	draft.active = active
}

export const updateCheckboxActive =
	(setState: Updater<CheckboxState>, options: UpdateCheckboxActiveOptions) => (active?: boolean) =>
		setState(draft => {
			applyCheckboxActiveStateToDraft(draft, {...options, triggerEvent: false}, active)
		})

export const handleCheckboxStateChange = (
	_event: StateEvent,
	setState: Updater<CheckboxState>,
	{active, eventName, indeterminate, onActive}: HandleCheckboxStateChangeOptions
) => {
	if (eventName === EVENT_NAME.LAYOUT) {
		return
	}

	setState(draft => {
		draft.eventName = eventName

		if (eventName === EVENT_NAME.PRESS_OUT) {
			applyCheckboxActiveStateToDraft(draft, {indeterminate, onActive}, !active)
		}
	})
}

export const updateCheckboxIndeterminate = (setState: Updater<CheckboxState>) => (indeterminate?: boolean) => {
	if (typeof indeterminate !== 'boolean') {
		return
	}

	setState(draft => {
		if (indeterminate) {
			if (draft.active === true && draft.value === CHECKBOX_VALUE.INDETERMINATE) {
				return
			}

			draft.active = true
			draft.value = CHECKBOX_VALUE.INDETERMINATE

			return
		}

		draft.value = draft.active ? CHECKBOX_VALUE.SELECTED : CHECKBOX_VALUE.UNSELECTED
	})
}
