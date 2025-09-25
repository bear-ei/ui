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
			typeof activeKeys === 'string' ?
				[...new Set([...(prevActiveKeys ?? []), activeKeys])]
			:	activeKeys

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

			const isAreArraysEqual =
				Array.isArray(callbackValue) && arrayEqual([...(preActiveKeys ?? [])])(callbackValue)

			const isUpdateMultipleNextActiveEvent =
				selectType === LIST_SELECT_TYPE.MULTIPLE && !isAreArraysEqual && onActives

			if (isUpdateMultipleNextActiveEvent) {
				draft.nextActiveEvent = () => onActives?.(callbackValue as string[] | undefined)
			}
		})
}

export const createListItemSize =
	({density, type}: CreateListItemSizeOptions) =>
	(theme: DefaultTheme) =>
	(itemSize?: number) => {
		if (itemSize) {
			return itemSize
		}

		const densityScale = getScaledSpacing(density)(theme) * theme.token.spacing.extraSmall
		const typeItemSize = {
			[LIST_TYPE.STANDARD]: theme.adaptSize(theme.token.spacing.extraSmall * 14 + densityScale),
			[LIST_TYPE.MENU]: theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale),
			[LIST_TYPE.LABEL]: theme.adaptSize(theme.token.spacing.extraSmall * 10 + densityScale)
		}

		return type ? typeItemSize[type] : theme.adaptSize(theme.token.spacing.extraSmall * 14 + densityScale)
	}

export const updateListAffordanceActiveState =
	({onActive, selectType}: UpdateListActiveStateOptions) =>
	(setState: Updater<ListState>) =>
	({activeKey, callback} = {} as UpdateListAffordanceActiveStateOptions) =>
		selectType !== LIST_SELECT_TYPE.MULTIPLE &&
		setState(draft => {
			if (draft.afterAffordanceActiveKey === activeKey) {
				draft.afterAffordanceActiveKey = undefined

				return
			}

			draft.afterAffordanceActiveKey = activeKey

			if (onActive) {
				draft.nextAfterAffordanceActiveEvent = () => onActive?.(activeKey)
			}

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
	(props: RenderVirtualListItemInfo<ListData>) =>
		renderItem ?
			renderItem({...options, ...props})
		:	<RenderDefaultListItem
				{...options}
				{...props}
			/>
