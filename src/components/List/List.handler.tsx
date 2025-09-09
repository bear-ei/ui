import type {WritableDraft} from 'immer'
import type {DefaultTheme} from 'styled-components/native'
import type {Updater} from 'use-immer'
import {arrayEqual, getScaledSpacing} from '../../utils'
import type {OnVirtualListCloseOptions, RenderVirtualListItemInfo} from '../Virtual-list'
import {LIST_SELECT_TYPE, LIST_TYPE} from './List.enum'
import type {
	CreateListItemSizeOptions,
	CreateRenderListItemOptions,
	ListData,
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
			typeof activeKeys === 'string' ? [...(prevActiveKeys ?? []), activeKeys] : activeKeys

		if (typeof activeKeys === 'string') {
			draft.activeKeys =
				prevActiveKeys?.includes(activeKeys) ?
					prevActiveKeys?.filter(filterPrevActiveKeys)
				:	nextActiveKeys
		}

		if (Array.isArray(activeKeys)) {
			draft.activeKeys = nextActiveKeys
		}

		return draft.activeKeys
	}

	const createNextActiveEvent = (activeKeys?: string | string[]) => () =>
		selectType === LIST_SELECT_TYPE.SINGLE ?
			onActive?.(activeKeys as string | undefined)
		:	onActives?.(activeKeys as string[] | undefined)

	return (setState: Updater<ListState>) => (activeKeys?: string | string[]) =>
		selectType &&
		setState(draft => {
			const callbackValue =
				selectType === LIST_SELECT_TYPE.SINGLE ?
					updateListActiveKey(draft)(activeKeys)
				:	updateListActiveKeys(draft)(activeKeys ?? [])

			if (selectType === LIST_SELECT_TYPE.SINGLE && draft.activeKey !== callbackValue) {
				draft.nextActiveEvent = createNextActiveEvent(callbackValue)

				return
			}

			const isAreArraysEqual =
				Array.isArray(callbackValue) && arrayEqual([...(draft.activeKeys ?? [])])(callbackValue)

			if (selectType === LIST_SELECT_TYPE.MULTIPLE && !isAreArraysEqual) {
				draft.nextActiveEvent = createNextActiveEvent(callbackValue)
			}
		})
}

export const createListItemSize =
	({density, type}: CreateListItemSizeOptions) =>
	(theme: DefaultTheme) =>
	(itemSize?: number) =>
		itemSize ??
		theme.adaptSize(
			theme.token.spacing.extraSmall * (type === LIST_TYPE.STANDARD ? 14 : 12) +
				getScaledSpacing(density)(theme) * theme.token.spacing.extraSmall
		)

export const updateListAffordanceActiveState =
	({onActive, selectType}: UpdateListActiveStateOptions) =>
	(setState: Updater<ListState>) =>
	({activeKey, callback} = {} as UpdateListAffordanceActiveStateOptions) => {
		if (selectType === LIST_SELECT_TYPE.MULTIPLE) {
			return
		}

		const nextAfterAffordanceActiveEvent = () => onActive?.(activeKey)
		const nextAfterAffordanceEvent = () => callback?.()

		setState(draft => {
			if (draft.afterAffordanceActiveKey === activeKey) {
				draft.afterAffordanceActiveKey = undefined

				return
			}

			draft.afterAffordanceActiveKey = activeKey
			draft.nextAfterAffordanceActiveEvent = nextAfterAffordanceActiveEvent

			if (activeKey) {
				draft.activeKey = activeKey
			}

			if (callback) {
				draft.nextAfterAffordanceEvent = nextAfterAffordanceEvent
			}
		})
	}

export const triggerListClose = (onClose?: (options: OnVirtualListCloseOptions) => void) => {
	const createNextCloseEvent = (options: OnVirtualListCloseOptions) => () => onClose?.(options)

	return (setState: Updater<ListState>) =>
		({activeKey, indexKey}: OnVirtualListCloseOptions) => {
			setState(draft => {
				if (activeKey) {
					draft.activeKey = activeKey
				}

				draft.nextCloseEvent = createNextCloseEvent({indexKey, activeKey})
			})
		}
}

export const createListItemRenderer =
	({renderItem, ...options}: CreateRenderListItemOptions) =>
	(props: RenderVirtualListItemInfo<ListData>) =>
		renderItem ?
			renderItem({...options, ...props})
		:	<RenderDefaultListItem
				{...options}
				{...props}
			/>
