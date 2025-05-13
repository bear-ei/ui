import type {WritableDraft} from 'immer'
import type {DefaultTheme} from 'styled-components/native'
import type {Updater} from 'use-immer'
import {DENSITY_SCALE} from '../Common'
import type {OnVirtualListCloseOptions, RenderVirtualListItemInfo} from '../Virtual-list'
import {LIST_SELECT_TYPE, LIST_TYPE} from './List.enum'
import type {
	CreateRenderItemOptions,
	HandleListActiveOptions,
	HandleListItemSizeOptions,
	ListData,
	ListState,
	OnActiveAfterAffordanceOptions
} from './List.interface'
import {renderDefaultListItem} from './List.render'

const handleListSelect =
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

const handlePrevListActiveKeysFilter = (activeKey: string) => (key: string) => key !== activeKey
const handleListMultiselect = (draft: WritableDraft<ListState>) => (activeKeys: string | string[]) => {
	const prevActiveKeys = draft.activeKeys
	const nextActiveKeys = Array.isArray(activeKeys) ? activeKeys : [...(prevActiveKeys ?? []), activeKeys]

	if (prevActiveKeys?.join() === nextActiveKeys?.join()) {
		return
	}

	if (typeof activeKeys === 'string') {
		draft.activeKeys =
			prevActiveKeys?.includes(activeKeys) ?
				prevActiveKeys?.filter(handlePrevListActiveKeysFilter(activeKeys))
			:	nextActiveKeys
	}

	if (Array.isArray(activeKeys)) {
		draft.activeKeys = nextActiveKeys
	}

	return draft.activeKeys
}

const createNextActiveEvent =
	({onActive, onActives}: HandleListActiveOptions) =>
	(activeKeys?: string | string[]) =>
	() =>
		typeof activeKeys === 'string' ? onActive?.(activeKeys) : onActives?.(activeKeys)

export const handleListActive =
	({onActive, selectType, onActives, deselect}: HandleListActiveOptions = {}) =>
	(setState: Updater<ListState>) =>
	(activeKeys?: string | string[]) =>
		selectType &&
		setState(draft => {
			const callbackValue =
				selectType === LIST_SELECT_TYPE.SINGLE ?
					handleListSelect(draft)(deselect)(activeKeys)
				:	handleListMultiselect(draft)(activeKeys ?? [])

			if (!callbackValue) {
				return
			}

			draft.nextActiveEvent = createNextActiveEvent(
				selectType === LIST_SELECT_TYPE.MULTIPLE ? {onActives} : {onActive}
			)(callbackValue)
		})

export const createListItemSize =
	({density, type}: HandleListItemSizeOptions) =>
	(theme: DefaultTheme) =>
	(itemSize?: number) =>
		itemSize ??
		theme.adaptSize(
			theme.token.spacing.extraSmall * (type === LIST_TYPE.STANDARD ? 14 : 12) +
				DENSITY_SCALE[density ?? theme.density] * theme.token.spacing.extraSmall
		)

export const handleListActiveAfterAffordance =
	({onActive, selectType}: HandleListActiveOptions) =>
	(setState: Updater<ListState>) =>
	({activeKey, callback} = {} as OnActiveAfterAffordanceOptions) => {
		const handleNextAfterAffordanceActiveEvent = () => onActive?.(activeKey)

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
				draft.nextAfterAffordanceActiveEvent = handleNextAfterAffordanceActiveEvent
			}

			if (callback) {
				draft.nextAfterAffordanceCallbackEvent = callback
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

export const createRenderListItem =
	({renderItem, ...options}: CreateRenderItemOptions) =>
	(props: RenderVirtualListItemInfo<ListData>) =>
		renderItem ? renderItem({...options, ...props}) : renderDefaultListItem({...options, ...props})
