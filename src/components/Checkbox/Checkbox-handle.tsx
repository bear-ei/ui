import {WritableDraft} from 'immer'
import {Updater} from 'use-immer'
import {StateEventType} from '../../hooks'
import {CheckboxState, HandleCheckboxActiveOptions, HandleCheckboxStateChangeOptions} from './Checkbox.interface'

export const handleCheckboxStatus = (setState: Updater<CheckboxState>) => (indeterminate?: boolean) =>
        setState(draft => {
                if (draft.status !== 'idle') {
                        return
                }

                if (typeof draft.active === 'boolean') {
                        const defaultType = draft.active ? 'selected' : 'unselected'

                        draft.type = indeterminate ? 'indeterminate' : defaultType
                }

                draft.status = 'succeeded'
        })

const handleCheckboxActiveDraftChange =
        (draft: WritableDraft<CheckboxState>) =>
        ({indeterminate, onActive}: HandleCheckboxActiveOptions) =>
        (value?: boolean) => {
                const handleNextActiveEvent = () => onActive?.(value)

                if (typeof value !== 'boolean') {
                        return
                }

                const activeType = indeterminate ? 'indeterminate' : 'selected'
                const nextType = value ? activeType : 'unselected'

                draft.active = value
                draft.nextActiveEvent = handleNextActiveEvent
                draft.type = nextType
        }

export const handleCheckboxActive =
        (options: HandleCheckboxActiveOptions) => (setState: Updater<CheckboxState>) => (value?: boolean) =>
                setState(draft => {
                        if (value === draft.active) {
                                return
                        }

                        handleCheckboxActiveDraftChange(draft)(options)(value)
                })

export const handleCheckboxStateChange =
        ({active, eventName, indeterminate, onActive}: HandleCheckboxStateChangeOptions) =>
        (setState: Updater<CheckboxState>) =>
        (_event: StateEventType) => {
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
                        draft.type = 'indeterminate'

                        return
                }

                draft.type = draft.active ? 'unselected' : 'selected'
        })
