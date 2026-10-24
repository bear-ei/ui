import type {WritableDraft} from 'immer'
import type {Updater} from 'use-immer'

import type {InteractionEvent} from '../../hooks'
import type {
	CheckboxState,
	HandleCheckboxInteractionStateChangeOptions,
	UpdateCheckboxCheckedOptions
} from './Checkbox.interface'

import {COMPONENT_STATUS, EVENT_NAME} from '../../constants'
import {CHECKBOX_VALUE} from './Checkbox.enum'

export const updateCheckboxStatus = (setState: Updater<CheckboxState>) => (indeterminate?: boolean) =>
	setState(draft => {
		if (draft.status !== COMPONENT_STATUS.IDLE) {
			return
		}

		if (typeof draft.checked === 'boolean') {
			const defaultValue = draft.checked ? CHECKBOX_VALUE.SELECTED : CHECKBOX_VALUE.UNSELECTED

			draft.value = indeterminate ? CHECKBOX_VALUE.INDETERMINATE : defaultValue
		}

		draft.status = COMPONENT_STATUS.SUCCEEDED
	})

const applyCheckboxCheckedStateToDraft = (
	draft: WritableDraft<CheckboxState>,
	{indeterminate, notify = true, onCheckedChange}: UpdateCheckboxCheckedOptions,
	checked?: boolean
) => {
	if (typeof checked !== 'boolean') {
		return
	}

	const checkedValue = indeterminate ? CHECKBOX_VALUE.INDETERMINATE : CHECKBOX_VALUE.SELECTED
	const nextValue = checked ? checkedValue : CHECKBOX_VALUE.UNSELECTED

	draft.value = nextValue

	if (draft.checked !== checked && onCheckedChange && notify) {
		draft.pendingCheckedEvent = checked
	}

	draft.checked = checked
}

export const updateCheckboxChecked =
	(setState: Updater<CheckboxState>, options: UpdateCheckboxCheckedOptions) => (checked?: boolean) =>
		setState(draft => {
			applyCheckboxCheckedStateToDraft(draft, {...options, notify: false}, checked)
		})

export const handleCheckboxStateChange = (
	_event: InteractionEvent,
	setState: Updater<CheckboxState>,
	{checked, eventName, indeterminate, onCheckedChange}: HandleCheckboxInteractionStateChangeOptions
) => {
	if (eventName === EVENT_NAME.LAYOUT) {
		return
	}

	setState(draft => {
		draft.eventName = eventName

		if (eventName === EVENT_NAME.PRESS_OUT) {
			applyCheckboxCheckedStateToDraft(draft, {indeterminate, onCheckedChange}, !checked)
		}
	})
}

export const updateCheckboxIndeterminate = (setState: Updater<CheckboxState>) => (indeterminate?: boolean) => {
	if (typeof indeterminate !== 'boolean') {
		return
	}

	setState(draft => {
		if (indeterminate) {
			if (draft.checked === true && draft.value === CHECKBOX_VALUE.INDETERMINATE) {
				return
			}

			draft.checked = true
			draft.value = CHECKBOX_VALUE.INDETERMINATE

			return
		}

		draft.value = draft.checked ? CHECKBOX_VALUE.SELECTED : CHECKBOX_VALUE.UNSELECTED
	})
}
