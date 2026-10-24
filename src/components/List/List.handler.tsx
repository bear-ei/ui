import type {WritableDraft} from 'immer'
import type {Updater} from 'use-immer'

import type {RenderVirtualListItemInfo, VirtualListCloseEvent} from '../Virtual-list'
import type {
	CreateListItemRendererOptions,
	ListAffordanceActiveChangeEvent,
	ListItemData,
	ListState,
	UpdateListActiveStateOptions
} from './List.interface'

import {isArrayEqual} from '../../utils'
import {LIST_SELECTION_TYPE} from './List.enum'
import {RenderDefaultListItem} from './List.render'

const updateListActiveKey = (
	draft: WritableDraft<ListState>,
	activeKeys?: string | string[],
	deselectable?: boolean
) => {
	const prevActiveKey = draft.activeKey

	if (Array.isArray(activeKeys)) {
		return
	}

	draft.activeKey = activeKeys === prevActiveKey && deselectable ? undefined : activeKeys

	if (draft.afterAffordanceActiveKey !== activeKeys) {
		draft.afterAffordanceActiveKey = undefined
	}

	return draft.activeKey
}

const updateListActiveKeys = (
	draft: WritableDraft<ListState>,
	activeKeys: string | string[],
	deselectable?: boolean
) => {
	const filterPrevActiveKeys = (key: string) => key !== activeKeys
	const prevActiveKeys = draft.activeKeys
	const nextActiveKeys =
		typeof activeKeys === 'string' ? [...new Set([...(prevActiveKeys ?? []), activeKeys])] : activeKeys

	if (typeof activeKeys === 'string') {
		draft.activeKeys =
			prevActiveKeys?.includes(activeKeys) && deselectable ?
				prevActiveKeys.filter(filterPrevActiveKeys)
			:	nextActiveKeys
	}

	if (Array.isArray(activeKeys)) {
		draft.activeKeys = nextActiveKeys
	}

	return draft.activeKeys
}

export const updateListActiveState = (
	setState: Updater<ListState>,
	{deselectable, onActiveKeyChange, onActiveKeysChange, selectionType}: UpdateListActiveStateOptions = {}
) => {
	return (activeKeys?: string | string[]) => {
		if (!selectionType) {
			return
		}

		setState(draft => {
			const preActiveKey = draft.activeKey
			const preActiveKeys = draft.activeKeys
			const callbackValue =
				selectionType === LIST_SELECTION_TYPE.SINGLE ?
					updateListActiveKey(draft, activeKeys, deselectable)
				:	updateListActiveKeys(draft, activeKeys ?? [], deselectable)

			const isUpdateSingleNextActiveEvent =
				selectionType === LIST_SELECTION_TYPE.SINGLE &&
				preActiveKey !== callbackValue &&
				onActiveKeyChange &&
				!Array.isArray(callbackValue)

			if (isUpdateSingleNextActiveEvent) {
				draft.pendingActiveEvent = callbackValue

				return
			}

			const isActiveKeysEqual = Array.isArray(callbackValue) && isArrayEqual(preActiveKeys, callbackValue)
			const isUpdateMultipleNextActiveEvent =
				selectionType === LIST_SELECTION_TYPE.MULTIPLE && !isActiveKeysEqual && onActiveKeysChange

			if (isUpdateMultipleNextActiveEvent) {
				draft.pendingActiveKeysEvent = callbackValue as string[]
			}
		})
	}
}

export const updateListAffordanceActiveState =
	(
		setState: Updater<ListState>,
		{onActiveKeyChange, onAfterAffordanceActiveChange, selectionType}: UpdateListActiveStateOptions
	) =>
	({activeKey, pressOutEvent}: ListAffordanceActiveChangeEvent = {}) => {
		if (selectionType === LIST_SELECTION_TYPE.MULTIPLE) {
			return
		}

		setState(draft => {
			if ((onActiveKeyChange || onAfterAffordanceActiveChange) && draft.afterAffordanceActiveKey !== activeKey) {
				draft.pendingAfterAffordanceActiveEvent = activeKey
			}

			if (draft.afterAffordanceActiveKey === activeKey) {
				draft.afterAffordanceActiveKey = undefined

				return
			}

			draft.afterAffordanceActiveKey = activeKey

			if (activeKey) {
				draft.activeKey = activeKey
			}

			if (pressOutEvent) {
				draft.pendingAfterAffordancePrimaryActionEvent = pressOutEvent
			}
		})
	}

export const triggerListClose =
	(setState: Updater<ListState>, onClose?: (event: VirtualListCloseEvent) => void) =>
	({itemKey, nextActiveKey}: VirtualListCloseEvent) => {
		setState(draft => {
			if (nextActiveKey) {
				draft.activeKey = nextActiveKey
			}

			if (onClose) {
				draft.pendingCloseEvent = {itemKey, nextActiveKey}
			}
		})
	}

export const createListItemRenderer =
	({renderItem, ...options}: CreateListItemRendererOptions) =>
	(props: RenderVirtualListItemInfo<ListItemData>) => {
		const itemElement =
			renderItem ?
				renderItem({...options, ...props})
			:	<RenderDefaultListItem
					{...options}
					{...props}
				/>

		return itemElement
	}
