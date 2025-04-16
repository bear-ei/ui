import type {WritableDraft} from 'immer'
import type {View} from 'react-native'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../hooks'
import {textSearch} from '../../utils'
import type {EventName} from '../Common'
import type {ListData} from '../List'
import type {HandleSearchChangeTextOptions, HandleSearchStateChangeOptions, SearchState} from './Search.interface'

export const handleSearchStateChange =
	({eventName, ref, state}: HandleSearchStateChangeOptions) =>
	(setState: Updater<SearchState>) =>
	(_event: StateEvent) => {
		const handleTextInputFocus = () => ref?.current?.focus()
		const nextEvent = {
			pressOut: () => handleTextInputFocus()
		} as Record<EventName, () => void>

		if (eventName === 'layout') {
			return
		}

		setState(draft => {
			if (draft.state === 'focused' && eventName !== 'blur') {
				return
			}

			const prevEventName = draft.eventName

			if (eventName) {
				draft.eventName = eventName
			}

			if (state) {
				draft.state = state
			}

			if (prevEventName !== eventName && eventName === 'pressOut') {
				draft.nextPressOutEvent = nextEvent[eventName]
			}
		})
	}

export const handleSearchChangeText =
	({data = [], onChangeText}: HandleSearchChangeTextOptions = {}) =>
	(setState: Updater<SearchState>) =>
	(value?: string) => {
		const handleNextChangeTextEvent = () => {
			if (value) {
				onChangeText?.(value)
			}
		}

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

			if (draft.status === 'idle') {
				draft.status = 'succeeded'
			}
		})
	}

export const handleSearchListVisible = (setState: Updater<SearchState>) => (visible?: boolean) =>
	typeof visible === 'boolean' &&
	setState(draft => {
		draft.listVisible = visible
	})

export const handleSearchLayout = (setState: Updater<SearchState>) => (containerCurrent?: View | null) =>
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

export const handleSearchContainerLayout =
	(setState: Updater<SearchState>) => (containerCurrent?: View | null) => (listVisible?: boolean) =>
		listVisible && handleSearchLayout(setState)(containerCurrent)
