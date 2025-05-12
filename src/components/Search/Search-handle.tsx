import type {WritableDraft} from 'immer'
import type {View} from 'react-native'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../hooks'
import {textSearch} from '../../utils'
import {COMPONENT_STATUS, EVENT_NAME, STATE, type EventName} from '../Common'
import type {ListData} from '../List'
import type {HandleSearchChangeTextOptions, HandleSearchStateChangeOptions, SearchState} from './Search.interface'

export const handleSearchStateChange =
	({eventName, ref, state}: HandleSearchStateChangeOptions) =>
	(setState: Updater<SearchState>) =>
	(_event: StateEvent) => {
		const handleTextInputFocus = () => ref?.current?.focus()
		const nextEvent = {
			[EVENT_NAME.PRESS_OUT]: () => handleTextInputFocus()
		} as Record<EventName, () => void>

		if (eventName === EVENT_NAME.LAYOUT) {
			return
		}

		setState(draft => {
			if (draft.state === STATE.FOCUSED && eventName !== EVENT_NAME.BLUR) {
				return
			}

			const prevEventName = draft.eventName

			if (eventName) {
				draft.eventName = eventName
			}

			if (state) {
				draft.state = state
			}

			if (prevEventName !== eventName && eventName === EVENT_NAME.PRESS_OUT) {
				draft.nextPressOutEvent = nextEvent[eventName]
			}
		})
	}

export const handleSearchChangeText =
	({data = [], onChangeText}: HandleSearchChangeTextOptions = {}) =>
	(setState: Updater<SearchState>) =>
	(value?: string) => {
		const handleNextChangeTextEvent = () => value && onChangeText?.(value)
		const matchedData = value ? textSearch(data)(['headline', 'supporting'])(value) : []

		setState(draft => {
			const prevValue = draft.value

			draft.data = (matchedData.length ? matchedData : undefined) as WritableDraft<ListData>[]
			draft.value = value

			if (typeof value === 'string' && value !== prevValue) {
				draft.nextChangeTextEvent = handleNextChangeTextEvent
			}
		})
	}

export const handleSearchTextInputRawChangeText =
	(data: ListData[] = []) =>
	(setState: Updater<SearchState>) =>
	(value?: string) => {
		const matchedData = value ? textSearch(data)(['headline', 'supporting'])(value) : []

		setState(draft => {
			if (value !== draft.value) {
				draft.data = (matchedData.length ? matchedData : undefined) as WritableDraft<ListData>[]
				draft.value = value ?? ''
			}

			if (draft.status === COMPONENT_STATUS.IDLE) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}
		})
	}

export const handleSearchListVisible = (setState: Updater<SearchState>) => (visible?: boolean) =>
	typeof visible === 'boolean' &&
	setState(draft => {
		draft.listVisible = visible
	})

export const handleSearchContainerLayout = (containerCurrent?: View | null) => {
	const handleSearchLayout = (setState: Updater<SearchState>) =>
		containerCurrent?.measure((x, y, width, height, pageX, pageY) =>
			setState(draft => {
				draft.layout.height = height
				draft.layout.pageX = pageX
				draft.layout.pageY = pageY
				draft.layout.width = width
				draft.layout.x = x
				draft.layout.y = y
			})
		)

	return (setState: Updater<SearchState>) => (listVisible?: boolean) =>
		listVisible && handleSearchLayout(setState)
}
