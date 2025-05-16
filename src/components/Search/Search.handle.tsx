import type {WritableDraft} from 'immer'
import type {View} from 'react-native'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../hooks'
import {textSearch} from '../../utils'
import {COMPONENT_STATUS, EVENT_NAME, STATE, type EventName} from '../Common'
import type {ListData} from '../List'
import type {
	HandleSearchInputStateChangeOptions,
	SearchState,
	UpdateSearchTextWithMatchOptions
} from './Search.interface'

export const handleSearchInputStateChange =
	({eventName, ref, state}: HandleSearchInputStateChangeOptions) =>
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

export const updateSearchTextWithMatch =
	({data = [], onChangeText}: UpdateSearchTextWithMatchOptions = {}) =>
	(setState: Updater<SearchState>) =>
	(value?: string) => {
		const nextChangeTextEvent = () => value && onChangeText?.(value)
		const matchedData = value ? textSearch(data)(['headline', 'supporting'])(value) : []

		setState(draft => {
			const prevValue = draft.value

			draft.data = (matchedData.length ? matchedData : undefined) as WritableDraft<ListData>[]
			draft.value = value

			if (typeof value === 'string' && value !== prevValue) {
				draft.nextChangeTextEvent = nextChangeTextEvent
			}
		})
	}

export const updateSearchInputValue =
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

export const updateSearchListVisibility = (setState: Updater<SearchState>) => (visible?: boolean) =>
	typeof visible === 'boolean' &&
	setState(draft => {
		draft.listVisible = visible
	})

export const createSearchLayoutMeasureHandler = (containerCurrent?: View | null) => {
	const measureSearchContainerLayout = (setState: Updater<SearchState>) =>
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
		listVisible && measureSearchContainerLayout(setState)
}
