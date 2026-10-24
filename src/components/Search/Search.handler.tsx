import type {WritableDraft} from 'immer'
import type {NativeSyntheticEvent, TargetedEvent, TextInput} from 'react-native'
import type {Updater} from 'use-immer'

import type {ListItemData} from '../List'
import type {VirtualListCloseEvent} from '../Virtual-list'
import type {HandleSearchActiveKeyOptions, SearchState, UpdateSearchDataOptions} from './Search.interface'

import {searchItemsByText} from '../../utils'

export const handleSearchTextChange =
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
	(setState: Updater<SearchState>, onFocusTarget?: (target: number) => void) =>
	(event: NativeSyntheticEvent<TargetedEvent>) =>
		setState(draft => {
			syncVisible(draft, !!draft.value)

			if (onFocusTarget) {
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

export const updateSearchFocusKey = (setState: Updater<SearchState>) => (key?: string) =>
	setState(draft => {
		const {itemKey, supporting} = draft.data?.find(datum => datum.itemKey === key) ?? {}

		draft.focusKey = itemKey

		if (typeof supporting === 'string') {
			draft.value = supporting
			draft.filterValue = supporting
		}
	})

export const updateSearchActiveKey =
	(setState: Updater<SearchState>, {onActiveKeyChange, ref}: HandleSearchActiveKeyOptions) =>
	(key?: string) => {
		ref?.current?.focus()

		setState(draft => {
			const datum = draft.data?.find(({itemKey}) => itemKey === key)

			draft.activeKey = key

			if (typeof datum?.supporting === 'string') {
				draft.value = datum.supporting
				draft.filterValue = datum.supporting
			}

			if (onActiveKeyChange) {
				draft.pendingActiveEvent = key
			}
		})
	}

export const updateSearchData =
	(setState: Updater<SearchState>, {data, enableLocalFilter}: UpdateSearchDataOptions) =>
	(value?: string) => {
		if (!(enableLocalFilter && data)) {
			return
		}

		setState(draft => {
			draft.data = (
				value ?
					searchItemsByText(value, data, ['headline', 'supporting'])
				:	[]) as WritableDraft<ListItemData>[]
		})
	}
