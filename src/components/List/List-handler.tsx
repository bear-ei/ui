import type {WritableDraft} from 'immer'
import type {DefaultTheme} from 'styled-components/native'
import type {Updater} from 'use-immer'
import {DENSITY_SCALE} from '../Common'
import type {OnVirtualListCloseOptions, RenderVirtualListItemInfo} from '../Virtual-list'
import {LIST_SELECT_TYPE, LIST_TYPE} from './List.enum'
import type {
	CreateListItemSizeOptions,
	CreateRenderListItemOptions,
	HandleListItemActiveChangeOptions,
	ListData,
	ListState,
	OnListItemAfterAffordanceActiveOptions
} from './List.interface'
import {renderDefaultListItem} from './List.render'

const updateItemActiveKey =
	(draft: WritableDraft<ListState>) => (deselect?: boolean) => (activeKeys?: string | string[]) => {
		const prevActiveKey = draft.activeKey

		if (Array.isArray(activeKeys) || activeKeys === prevActiveKey) {
			return
		}

		draft.activeKey = activeKeys === prevActiveKey && deselect ? undefined : activeKeys

		if (draft.afterAffordanceActiveKey !== activeKeys) {
			draft.afterAffordanceActiveKey = undefined
		}

		return draft.activeKey
	}

const filterPrevActiveKeys = (activeKey: string) => (key: string) => key !== activeKey
const updateItemActiveKeys = (draft: WritableDraft<ListState>) => (activeKeys: string | string[]) => {
	const prevActiveKeys = draft.activeKeys
	const nextActiveKeys = Array.isArray(activeKeys) ? activeKeys : [...(prevActiveKeys ?? []), activeKeys]

	if (prevActiveKeys?.join() === nextActiveKeys?.join()) {
		return
	}

	if (typeof activeKeys === 'string') {
		draft.activeKeys =
			prevActiveKeys?.includes(activeKeys) ?
				prevActiveKeys?.filter(filterPrevActiveKeys(activeKeys))
			:	nextActiveKeys
	}

	if (Array.isArray(activeKeys)) {
		draft.activeKeys = nextActiveKeys
	}

	return draft.activeKeys
}

const createNextActiveCallback =
	({onActive, onActives}: HandleListItemActiveChangeOptions) =>
	(activeKeys?: string | string[]) =>
	() =>
		typeof activeKeys === 'string' ? onActive?.(activeKeys) : onActives?.(activeKeys)

export const handleItemActiveChange =
	({onActive, selectType, onActives, deselect}: HandleListItemActiveChangeOptions = {}) =>
	(setState: Updater<ListState>) =>
	(activeKeys?: string | string[]) =>
		selectType &&
		setState(draft => {
			const callbackValue =
				selectType === LIST_SELECT_TYPE.SINGLE ?
					updateItemActiveKey(draft)(deselect)(activeKeys)
				:	updateItemActiveKeys(draft)(activeKeys ?? [])

			if (!callbackValue) {
				return
			}

			draft.nextActiveEvent = createNextActiveCallback(
				selectType === LIST_SELECT_TYPE.MULTIPLE ? {onActives} : {onActive}
			)(callbackValue)
		})

export const createItemSize =
	({density, type}: CreateListItemSizeOptions) =>
	(theme: DefaultTheme) =>
	(itemSize?: number) =>
		itemSize ??
		theme.adaptSize(
			theme.token.spacing.extraSmall * (type === LIST_TYPE.STANDARD ? 14 : 12) +
				DENSITY_SCALE[density ?? theme.density] * theme.token.spacing.extraSmall
		)

export const handleAffordanceActiveChange =
	({onActive, selectType}: HandleListItemActiveChangeOptions) =>
	(setState: Updater<ListState>) =>
	({activeKey, callback} = {} as OnListItemAfterAffordanceActiveOptions) => {
		const triggerNextAfterAffordanceActiveEvent = () => onActive?.(activeKey)

		if (selectType === LIST_SELECT_TYPE.MULTIPLE) {
			return
		}

		setState(draft => {
			const prevActiveKey = draft.activeKey

			if (draft.afterAffordanceActiveKey === activeKey) {
				draft.afterAffordanceActiveKey = undefined

				return
			}

			draft.afterAffordanceActiveKey = activeKey

			if (activeKey) {
				draft.activeKey = activeKey
			}

			if (prevActiveKey !== draft.activeKey) {
				draft.nextAfterAffordanceActiveEvent = triggerNextAfterAffordanceActiveEvent
			}

			if (callback) {
				draft.nextAfterAffordanceEvent = callback
			}
		})
	}

export const handleItemClose = (onClose?: (options: OnVirtualListCloseOptions) => void) => {
	const createNextCloseEvent = (options: OnVirtualListCloseOptions) => () => onClose?.(options)

	return (setState: Updater<ListState>) =>
		({activeKey, indexKey}: OnVirtualListCloseOptions) => {
			setState(draft => {
				draft.activeKey = activeKey
				draft.nextCloseEvent = createNextCloseEvent({indexKey, activeKey})
			})
		}
}

export const createItemRenderer =
	({renderItem, ...options}: CreateRenderListItemOptions) =>
	(props: RenderVirtualListItemInfo<ListData>) =>
		renderItem ? renderItem({...options, ...props}) : renderDefaultListItem({...options, ...props})
