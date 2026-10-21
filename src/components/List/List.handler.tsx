import type {WritableDraft} from 'immer'
import type {Updater} from 'use-immer'

import {DENSITY_SIZE, type DensitySizeScale, type Token} from '../../theme'
import {arrayEqual} from '../../utils'
import type {RenderVirtualListItemInfo, VirtualListCloseEvent} from '../Virtual-list'

import type {ListItemData} from './List-item'
import {LIST_SELECT_TYPE} from './List.enum'
import type {
	CreateRenderListItemOptions,
	ListAffordanceActiveStateEvent,
	ListState,
	UpdateListActiveStateOptions
} from './List.interface'
import {RenderDefaultListItem} from './List.render'

export const updateListActiveState = ({
	deselect,
	onActive,
	onActives,
	selectType
}: UpdateListActiveStateOptions = {}) => {
	const updateListActiveKey = (draft: WritableDraft<ListState>) => (activeKeys?: string | string[]) => {
		const prevActiveKey = draft.activeKey

		if (Array.isArray(activeKeys)) {
			return
		}

		draft.activeKey = activeKeys === prevActiveKey && deselect ? undefined : activeKeys

		if (draft.afterAffordanceActiveKey !== activeKeys) {
			draft.afterAffordanceActiveKey = undefined
		}

		return draft.activeKey
	}

	const updateListActiveKeys = (draft: WritableDraft<ListState>) => (activeKeys: string | string[]) => {
		const filterPrevActiveKeys = (key: string) => key !== activeKeys
		const prevActiveKeys = draft.activeKeys
		const nextActiveKeys =
			typeof activeKeys === 'string' ? [...new Set([...(prevActiveKeys ?? []), activeKeys])] : activeKeys

		if (typeof activeKeys === 'string') {
			draft.activeKeys =
				prevActiveKeys?.includes(activeKeys) && deselect ?
					prevActiveKeys.filter(filterPrevActiveKeys)
				:	nextActiveKeys
		}

		if (Array.isArray(activeKeys)) {
			draft.activeKeys = nextActiveKeys
		}

		return draft.activeKeys
	}

	return (setState: Updater<ListState>) => (activeKeys?: string | string[]) => {
		if (!selectType) {
			return
		}

		setState(draft => {
			const preActiveKey = draft.activeKey
			const preActiveKeys = draft.activeKeys
			const callbackValue =
				selectType === LIST_SELECT_TYPE.SINGLE ?
					updateListActiveKey(draft)(activeKeys)
				:	updateListActiveKeys(draft)(activeKeys ?? [])

			const isUpdateSingleNextActiveEvent =
				selectType === LIST_SELECT_TYPE.SINGLE &&
				preActiveKey !== callbackValue &&
				onActive &&
				!Array.isArray(callbackValue)

			if (isUpdateSingleNextActiveEvent) {
				draft.pendingActiveEvent = callbackValue

				return
			}

			const isArrayEqual = Array.isArray(callbackValue) && arrayEqual(preActiveKeys, callbackValue)
			const isUpdateMultipleNextActiveEvent =
				selectType === LIST_SELECT_TYPE.MULTIPLE && !isArrayEqual && onActives

			if (isUpdateMultipleNextActiveEvent) {
				draft.pendingActivesEvent = callbackValue as string[]
			}
		})
	}
}

export const createListItemSize =
	(size: DensitySizeScale = DENSITY_SIZE.MEDIUM) =>
	(token: Token) =>
	(itemSize?: number) => {
		if (itemSize) {
			return itemSize
		}

		return token.density.control[size]
	}

export const updateListAffordanceActiveState =
	({onActive, selectType}: UpdateListActiveStateOptions) =>
	(setState: Updater<ListState>) =>
	({activeKey, callbackEvent}: ListAffordanceActiveStateEvent = {}) => {
		if (selectType === LIST_SELECT_TYPE.MULTIPLE) {
			return
		}

		setState(draft => {
			if (onActive && draft.afterAffordanceActiveKey !== activeKey) {
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

			if (callbackEvent) {
				draft.pendingAfterAffordanceEvent = callbackEvent
			}
		})
	}

export const triggerListClose =
	(onClose?: (event: VirtualListCloseEvent) => void) =>
	(setState: Updater<ListState>) =>
	({activeKey, indexKey}: VirtualListCloseEvent) => {
		setState(draft => {
			if (activeKey) {
				draft.activeKey = activeKey
			}

			if (onClose) {
				draft.pendingCloseEvent = {indexKey, activeKey}
			}
		})
	}

export const createListItemRenderer =
	({renderItem, ...options}: CreateRenderListItemOptions) =>
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
