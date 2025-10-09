import {Theme} from '@/contexts'
import {arrayEqual} from '@/utils'
import {Size, SIZE} from '@bearei/theme-token'
import type {WritableDraft} from 'immer'
import type {Updater} from 'use-immer'
import type {OnVirtualListCloseOptions, RenderVirtualListItemInfo} from '../Virtual-list'
import {LIST_SELECT_TYPE} from './List.enum'
import type {
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
                        :       activeKeys

                if (typeof activeKeys === 'string') {
                        draft.activeKeys =
                                prevActiveKeys?.includes(activeKeys) && deselect ?
                                        prevActiveKeys?.filter(filterPrevActiveKeys)
                                :       nextActiveKeys
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
                                :       updateListActiveKeys(draft)(activeKeys ?? [])

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
        (size = SIZE.MEDIUM as Size) =>
        (theme: Theme) =>
        (itemSize?: number) => {
                if (itemSize) {
                        return itemSize
                }

                const listItemSize = {
                        [SIZE.LARGE]: theme.token.spacing.extraSmall * 12,
                        [SIZE.MEDIUM]: theme.token.spacing.extraSmall * 10,
                        [SIZE.SMALL]: theme.token.spacing.extraLarge
                }

                return listItemSize[size]
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
        (props: RenderVirtualListItemInfo<ListData>) => {
                const itemElement =
                        renderItem ?
                                renderItem({...options, ...props})
                        :       <RenderDefaultListItem
                                        {...options}
                                        {...props}
                                />

                return itemElement
        }
