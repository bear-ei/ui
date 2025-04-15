import type {WritableDraft} from 'immer'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../hooks'
import {CHECKBOX_VALUE} from './Checkbox.enum'
import type {CheckboxState, HandleCheckboxActiveOptions, HandleCheckboxStateChangeOptions} from './Checkbox.interface'

export const handleCheckboxStatus = (setState: Updater<CheckboxState>) => (indeterminate?: boolean) =>
	setState(draft => {
		if (draft.status !== 'idle') {
			return
		}

		if (typeof draft.active === 'boolean') {
			const defaultValue = draft.active ? CHECKBOX_VALUE.SELECTED : CHECKBOX_VALUE.UNSELECTED

			draft.value = indeterminate ? CHECKBOX_VALUE.INDETERMINATE : defaultValue
		}

		draft.status = 'succeeded'
	})

const handleCheckboxActiveDraftChange =
	(draft: WritableDraft<CheckboxState>) =>
	({indeterminate, onActive}: HandleCheckboxActiveOptions) =>
	(active?: boolean) => {
		const handleNextActiveEvent = () => onActive?.(active)

		if (typeof active !== 'boolean') {
			return
		}

		const activeValue = indeterminate ? CHECKBOX_VALUE.INDETERMINATE : CHECKBOX_VALUE.SELECTED
		const nextValue = active ? activeValue : CHECKBOX_VALUE.UNSELECTED

		draft.active = active
		draft.nextActiveEvent = handleNextActiveEvent
		draft.value = nextValue
	}

export const handleCheckboxActive =
	(options: HandleCheckboxActiveOptions) => (setState: Updater<CheckboxState>) => (active?: boolean) =>
		setState(draft => {
			if (active === draft.active) {
				return
			}

			handleCheckboxActiveDraftChange(draft)(options)(active)
		})

export const handleCheckboxStateChange =
	({active, eventName, indeterminate, onActive}: HandleCheckboxStateChangeOptions) =>
	(setState: Updater<CheckboxState>) =>
	(_event: StateEvent) => {
		if (eventName === 'layout') {
			return
		}

		setState(draft => {
			const prevEventName = draft.eventName

			if (eventName) {
				draft.eventName = eventName
			}

			if (prevEventName !== eventName && eventName === 'pressOut') {
				handleCheckboxActiveDraftChange(draft)({indeterminate, onActive})(!active)
			}
		})
	}

export const handleCheckboxIndeterminate = (setState: Updater<CheckboxState>) => (indeterminate?: boolean) =>
	typeof indeterminate === 'boolean' &&
	setState(draft => {
		if (indeterminate) {
			draft.active = indeterminate
			draft.value = CHECKBOX_VALUE.INDETERMINATE

			return
		}

		draft.value = draft.active ? CHECKBOX_VALUE.UNSELECTED : CHECKBOX_VALUE.SELECTED
	})
