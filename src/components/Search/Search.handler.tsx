import {textSearch} from '@/utils'
import type {WritableDraft} from 'immer'
import type {TextInput} from 'react-native'
import type {Updater} from 'use-immer'
import type {ListItemData} from '../List'
import type {OnVirtualListCloseOptions} from '../Virtual-list'
import type {HandleSearchActiveKeyOptions, SearchState, UpdateSearchDataOptions} from './Search.interface'

export const updateSearchText =
        (onChangeText?: (text: string) => void) => (setState: Updater<SearchState>) => (value: string) =>
                setState(draft => {
                        if (draft.value === value) {
                                return
                        }

                        draft.value = value
                        draft.filterValue = value

                        if (onChangeText) {
                                draft.nextChangeTextEvent = () => onChangeText?.(value)
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

export const updateSearchMenuVisible = (setState: Updater<SearchState>) => (visible?: boolean) =>
        typeof visible === 'boolean' &&
        setState(draft => {
                if (visible) {
                        draft.expanded = true
                        draft.listVisible = visible

                        return
                }

                draft.listVisible = false
        })

export const updateSearchExpanded = (setState: Updater<SearchState>) => (visible?: boolean) => {
        return (
                typeof visible === 'boolean' &&
                setState(draft => {
                        if (!visible) {
                                draft.expanded = false
                        }
                })
        )
}

export const handleSearchMenuClose =
        (ref?: React.RefObject<TextInput | null>) =>
        (onMenuClose?: (options: OnVirtualListCloseOptions) => void) =>
        (options: OnVirtualListCloseOptions) => {
                ref?.current?.focus?.()
                onMenuClose?.(options)
        }

export const handleSearchFocusKey = (setState: Updater<SearchState>) => (key?: string) =>
        setState(draft => {
                const {indexKey, supporting} = draft.data?.find(datum => datum.indexKey === key) ?? {}

                draft.focusKey = indexKey

                if (typeof supporting === 'string') {
                        draft.value = supporting as string
                }
        })

export const handleSearchActiveKey =
        ({onActive, ref}: HandleSearchActiveKeyOptions) =>
        (setState: Updater<SearchState>) =>
        (key?: string) => {
                ref?.current?.focus?.()

                setState(draft => {
                        draft.activeKey = key
                        draft.value = draft.data?.find(({indexKey}) => indexKey === key)?.supporting as string

                        if (onActive) {
                                draft.nextActiveEvent = () => onActive?.(key)
                        }
                })
        }

export const updateSearchData =
        ({data, filter}: UpdateSearchDataOptions) =>
        (setState: Updater<SearchState>) =>
        (value?: string) =>
                filter &&
                data &&
                setState(draft => {
                        draft.data = (
                                value ?
                                        textSearch(data)(['headline', 'supporting'])(value)
                                :       []) as WritableDraft<ListItemData>[]
                })
