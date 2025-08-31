import type {WritableDraft} from 'immer'
import type {View} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimateSharedValueTo, StateEvent} from '../../hooks'
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
		const focusTextInput = () => ref?.current?.focus()
		const nextEvent = {
			[EVENT_NAME.PRESS_OUT]: () => focusTextInput()
		} as Record<EventName, () => void>

		if (eventName === EVENT_NAME.LAYOUT) {
			return
		}

		setState(draft => {
			if (draft.state === STATE.FOCUSED && eventName !== EVENT_NAME.BLUR) {
				return
			}

			if (eventName) {
				draft.eventName = eventName
			}

			if (state) {
				draft.state = state
			}

			if (eventName === EVENT_NAME.PRESS_OUT) {
				draft.nextPressOutEvent = nextEvent[eventName]
			}
		})
	}

export const updateSearchTextWithMatch =
	({data = [], onChangeText}: UpdateSearchTextWithMatchOptions = {}) =>
	(setState: Updater<SearchState>) =>
	(value: string) => {
		const matchedData = value ? textSearch(data)(['headline', 'supporting'])(value) : []
		const nextChangeTextEvent = () => onChangeText?.(value)

		setState(draft => {
			if (draft.value !== value) {
				draft.nextChangeTextEvent = nextChangeTextEvent
			}

			draft.data = (matchedData.length ? matchedData : undefined) as WritableDraft<ListData>[]
			draft.value = value
		})
	}

export const updateSearchInputValue =
	(data: ListData[] = []) =>
	(setState: Updater<SearchState>) =>
	(value?: string) => {
		const matchedData = value ? textSearch(data)(['headline', 'supporting'])(value) : []

		setState(draft => {
			draft.data = (matchedData.length ? matchedData : undefined) as WritableDraft<ListData>[]
			draft.value = value ?? ''

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

export const animateSearch =
	(animateSharedValueTo: AnimateSharedValueTo) =>
	(colorSharedValue: SharedValue<number>) =>
	(disabled?: boolean) =>
		animateSharedValueTo({sharedValue: colorSharedValue})(disabled ? 0 : 1)

export const clearSearchEvent = (setState: Updater<SearchState>) => (eventName: 'changeText' | 'pressOut') => {
	const event = {
		changeText: () =>
			setState(draft => {
				draft.nextChangeTextEvent = undefined
			}),
		pressOut: () =>
			setState(draft => {
				draft.nextPressOutEvent = undefined
			})
	}

	event[eventName]?.()
}
