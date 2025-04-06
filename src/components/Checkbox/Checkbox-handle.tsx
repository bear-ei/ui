import {WritableDraft} from 'immer'
import {Updater} from 'use-immer'
import {StateEvent} from '../../hooks'
import {CheckboxValue} from './Checkbox.enum'
import {CheckboxState, HandleCheckboxActiveOptions, HandleCheckboxStateChangeOptions} from './Checkbox.interface'

export const handleCheckboxStatus = (setState: Updater<CheckboxState>) => (indeterminate?: boolean) =>
        setState(draft => {
                if (draft.status !== 'idle') {
                        return
                }

                if (typeof draft.active === 'boolean') {
                        const defaultValue = draft.active ? CheckboxValue.SELECTED : CheckboxValue.UNSELECTED

                        draft.value = indeterminate ? CheckboxValue.INDETERMINATE : defaultValue
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

                const activeValue = indeterminate ? CheckboxValue.INDETERMINATE : CheckboxValue.SELECTED
                const nextValue = active ? activeValue : CheckboxValue.UNSELECTED

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
                        draft.value = CheckboxValue.INDETERMINATE

                        return
                }

                draft.value = draft.active ? CheckboxValue.UNSELECTED : CheckboxValue.SELECTED
        })
