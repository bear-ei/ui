import type {WritableDraft} from 'immer'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../hooks'
import {COMPONENT_STATUS, EVENT_NAME} from '../Common'
import {CHECKBOX_VALUE} from './Checkbox.enum'
import type {CheckboxState, HandleCheckboxStateChangeOptions, UpdateCheckboxActiveOptions} from './Checkbox.interface'

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

const applyCheckboxActiveStateToDraft =
	(draft: WritableDraft<CheckboxState>) =>
	({indeterminate, onActive}: UpdateCheckboxActiveOptions) =>
	(active?: boolean) => {
		if (typeof active !== 'boolean') {
			return
		}

		const activeValue = indeterminate ? CHECKBOX_VALUE.INDETERMINATE : CHECKBOX_VALUE.SELECTED
		const nextValue = active ? activeValue : CHECKBOX_VALUE.UNSELECTED

		draft.value = nextValue

		if (draft.active !== active && onActive) {
			draft.nextActiveEvent = () => onActive?.(active)
		}

		draft.active = active
	}

export const updateCheckboxActive =
	(options: UpdateCheckboxActiveOptions) => (setState: Updater<CheckboxState>) => (active?: boolean) =>
		setState(draft => {
			applyCheckboxActiveStateToDraft(draft)(options)(active)
		})

export const handleCheckboxStateChange =
	({active, eventName, indeterminate, onActive}: HandleCheckboxStateChangeOptions) =>
	(setState: Updater<CheckboxState>) =>
	(_event: StateEvent) => {
		if (eventName === EVENT_NAME.LAYOUT) {
			return
		}

		setState(draft => {
			if (eventName) {
				draft.eventName = eventName
			}

			if (eventName === EVENT_NAME.PRESS_OUT) {
				applyCheckboxActiveStateToDraft(draft)({indeterminate, onActive})(!active)
			}
		})
	}

export const updateCheckboxIndeterminate = (setState: Updater<CheckboxState>) => (indeterminate?: boolean) =>
	typeof indeterminate === 'boolean' &&
	setState(draft => {
		if (indeterminate) {
			draft.active = indeterminate
			draft.value = CHECKBOX_VALUE.INDETERMINATE

			return
		}

		draft.value = draft.active ? CHECKBOX_VALUE.SELECTED : CHECKBOX_VALUE.UNSELECTED
	})
