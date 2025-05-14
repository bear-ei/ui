import type {WritableDraft} from 'immer'
import type {DefaultTheme} from 'styled-components/native'
import type {Updater} from 'use-immer'
import {DENSITY_SCALE} from '../Common'
import type {OnVirtualListCloseOptions, RenderVirtualListItemInfo} from '../Virtual-list'
import {LIST_SELECT_TYPE, LIST_TYPE} from './List.enum'
import type {
	CreateListItemSizeOptions,
	CreateRenderListItemOptions,
	HandleListActiveChangeOptions,
	HandleListAffordanceActiveChangeOptions,
	ListData,
	ListState
} from './List.interface'
import {renderDefaultListItem} from './List.render'

const updateListItemActiveKey =
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

const updateListItemActiveKeys = (draft: WritableDraft<ListState>) => (activeKeys: string | string[]) => {
	const filterPrevActiveKeys = (activeKey: string) => (key: string) => key !== activeKey
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

export const handleListActiveChange = ({
	deselect,
	onActive,
	onActives,
	selectType
}: HandleListActiveChangeOptions = {}) => {
	const createNextActiveEvent = (activeKeys?: string | string[]) => () =>
		typeof activeKeys === 'string' ? onActive?.(activeKeys) : onActives?.(activeKeys)

	return (setState: Updater<ListState>) => (activeKeys?: string | string[]) =>
		selectType &&
		setState(draft => {
			const callbackValue =
				selectType === LIST_SELECT_TYPE.SINGLE ?
					updateListItemActiveKey(draft)(deselect)(activeKeys)
				:	updateListItemActiveKeys(draft)(activeKeys ?? [])

			if (!callbackValue) {
				return
			}

			draft.nextActiveEvent = createNextActiveEvent(callbackValue)
		})
}

export const createListItemSize =
	({density, type}: CreateListItemSizeOptions) =>
	(theme: DefaultTheme) =>
	(itemSize?: number) =>
		itemSize ??
		theme.adaptSize(
			theme.token.spacing.extraSmall * (type === LIST_TYPE.STANDARD ? 14 : 12) +
				DENSITY_SCALE[density ?? theme.density] * theme.token.spacing.extraSmall
		)

export const handleListAffordanceActiveChange =
	({onActive, selectType}: HandleListActiveChangeOptions) =>
	(setState: Updater<ListState>) =>
	({activeKey, callback} = {} as HandleListAffordanceActiveChangeOptions) => {
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

export const handleListClose = (onClose?: (options: OnVirtualListCloseOptions) => void) => {
	const createNextCloseEvent = (options: OnVirtualListCloseOptions) => () => onClose?.(options)

	return (setState: Updater<ListState>) =>
		({activeKey, indexKey}: OnVirtualListCloseOptions) => {
			setState(draft => {
				draft.activeKey = activeKey
				draft.nextCloseEvent = createNextCloseEvent({indexKey, activeKey})
			})
		}
}

export const createListItemRenderer =
	({renderItem, ...options}: CreateRenderListItemOptions) =>
	(props: RenderVirtualListItemInfo<ListData>) =>
		renderItem ? renderItem({...options, ...props}) : renderDefaultListItem({...options, ...props})
