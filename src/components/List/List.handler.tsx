import type {WritableDraft} from 'immer'
import type {Updater} from 'use-immer'
import {DENSITY_SIZE, type DensitySizeScale, type Token} from '../../theme'
import {arrayEqual} from '../../utils'
import type {OnVirtualListCloseOptions, RenderVirtualListItemInfo} from '../Virtual-list'
import type {ListItemData} from './List-item'
import {LIST_SELECT_TYPE} from './List.enum'
import type {
	CreateRenderListItemOptions,
	ListState,
	UpdateListActiveStateOptions,
	UpdateListAffordanceActiveStateOptions
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
					prevActiveKeys?.filter(filterPrevActiveKeys)
				:	nextActiveKeys
		}

		if (Array.isArray(activeKeys)) {
			draft.activeKeys = nextActiveKeys
		}

		return draft.activeKeys
	}

	return (setState: Updater<ListState>) => (activeKeys?: string | string[]) =>
		selectType &&
		setState(draft => {
			const preActiveKey = draft.activeKey
			const preActiveKeys = draft.activeKeys
			const callbackValue =
				selectType === LIST_SELECT_TYPE.SINGLE ?
					updateListActiveKey(draft)(activeKeys)
				:	updateListActiveKeys(draft)(activeKeys ?? [])

			const isUpdateSingleNextActiveEvent =
				selectType === LIST_SELECT_TYPE.SINGLE && preActiveKey !== callbackValue && onActive

			if (isUpdateSingleNextActiveEvent) {
				draft.nextActiveEvent = () => onActive?.(callbackValue as string | undefined)

				return
			}

			const isArrayEqual = Array.isArray(callbackValue) && arrayEqual(preActiveKeys, callbackValue)
			const isUpdateMultipleNextActiveEvent =
				selectType === LIST_SELECT_TYPE.MULTIPLE && !isArrayEqual && onActives

			if (isUpdateMultipleNextActiveEvent) {
				draft.nextActiveEvent = () => onActives?.(callbackValue as string[] | undefined)
			}
		})
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
	({activeKey, callback} = {} as UpdateListAffordanceActiveStateOptions) =>
		selectType !== LIST_SELECT_TYPE.MULTIPLE &&
		setState(draft => {
			if (onActive && draft.afterAffordanceActiveKey !== activeKey) {
				draft.nextAfterAffordanceActiveEvent = () => onActive?.(activeKey)
			}

			if (draft.afterAffordanceActiveKey === activeKey) {
				draft.afterAffordanceActiveKey = undefined

				return
			}

			draft.afterAffordanceActiveKey = activeKey

			if (activeKey) {
				draft.activeKey = activeKey
			}

			if (callback) {
				draft.nextAfterAffordanceEvent = () => callback?.()
			}
		})

export const triggerListClose =
	(onClose?: (options: OnVirtualListCloseOptions) => void) =>
	(setState: Updater<ListState>) =>
	({activeKey, indexKey}: OnVirtualListCloseOptions) => {
		setState(draft => {
			if (activeKey) {
				draft.activeKey = activeKey
			}

			if (onClose) {
				draft.nextCloseEvent = () => onClose?.({indexKey, activeKey})
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
