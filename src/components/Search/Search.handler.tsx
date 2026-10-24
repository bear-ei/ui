import type {WritableDraft} from 'immer'
import type {NativeSyntheticEvent, TargetedEvent, TextInput} from 'react-native'
import type {Updater} from 'use-immer'

import type {ListItemData} from '../List'
import type {VirtualListCloseEvent} from '../Virtual-list'
import type {HandleSearchActiveKeyOptions, SearchState, UpdateSearchDataOptions} from './Search.interface'

import {textSearch} from '../../utils'

export const updateSearchText =
	(setState: Updater<SearchState>, onChangeText?: (text: string) => void) => (value: string) =>
		setState(draft => {
			if (draft.value === value) {
				return
			}

			draft.value = value
			draft.filterValue = value

			if (onChangeText) {
				draft.pendingChangeTextEvent = value
			}
		})

export const updateSearchValue = (setState: Updater<SearchState>) => (value?: string) =>
	setState(draft => {
		const nextValue = value ?? ''

		if (nextValue !== draft.value) {
			draft.value = nextValue
			draft.filterValue = nextValue
		}
	})

const syncVisible = (draft: WritableDraft<SearchState>, visible?: boolean) => {
	if (visible) {
		draft.expanded = true
		draft.listVisible = visible

		return
	}

	draft.listVisible = false
}

export const handleSearchFocus =
	(setState: Updater<SearchState>, onFocus?: (target: number) => void) =>
	(event: NativeSyntheticEvent<TargetedEvent>) =>
		setState(draft => {
			syncVisible(draft, !!draft.value)

			if (onFocus) {
				draft.pendingFocusEvent = event.nativeEvent.target
			}
		})

export const updateSearchMenuVisible = (setState: Updater<SearchState>) => (visible?: boolean) => {
	if (typeof visible !== 'boolean') {
		return
	}

	setState(draft => {
		syncVisible(draft, visible)
	})
}

export const updateSearchExpanded = (setState: Updater<SearchState>) => (visible?: boolean) => {
	if (typeof visible !== 'boolean') {
		return
	}

	setState(draft => {
		if (!visible) {
			draft.expanded = false
		}
	})
}

export const handleSearchMenuClose =
	(ref?: React.RefObject<TextInput | null>, onMenuClose?: (event: VirtualListCloseEvent) => void) =>
	(event: VirtualListCloseEvent) => {
		ref?.current?.focus()
		onMenuClose?.(event)
	}

export const handleSearchFocusKey = (setState: Updater<SearchState>) => (key?: string) =>
	setState(draft => {
		const {indexKey, supporting} = draft.data?.find(datum => datum.indexKey === key) ?? {}

		draft.focusKey = indexKey

		if (typeof supporting === 'string') {
			draft.value = supporting
			draft.filterValue = supporting
		}
	})

export const handleSearchActiveKey =
	(setState: Updater<SearchState>, {onActive, ref}: HandleSearchActiveKeyOptions) =>
	(key?: string) => {
		ref?.current?.focus()

		setState(draft => {
			const datum = draft.data?.find(({indexKey}) => indexKey === key)

			draft.activeKey = key

			if (typeof datum?.supporting === 'string') {
				draft.value = datum.supporting
				draft.filterValue = datum.supporting
			}

			if (onActive) {
				draft.pendingActiveEvent = key
			}
		})
	}

export const updateSearchData =
	(setState: Updater<SearchState>, {data, filter}: UpdateSearchDataOptions) =>
	(value?: string) => {
		if (!(filter && data)) {
			return
		}

		setState(draft => {
			draft.data = (
				value ?
					textSearch(value, data, ['headline', 'supporting'])
				:	[]) as WritableDraft<ListItemData>[]
		})
	}
