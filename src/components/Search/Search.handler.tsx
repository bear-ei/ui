import {COMPONENT_STATUS, EVENT_NAME, STATE} from '@/constants'
import type {AnimateSharedValueTo, StateEvent} from '@/hooks'
import {textSearch} from '@/utils'
import type {WritableDraft} from 'immer'
import type {TextInput} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {ListItemData} from '../List'
import type {OnVirtualListCloseOptions} from '../Virtual-list'
import type {
        AnimateSearchBorderRadiusOptions,
        HandleSearchInputStateChangeOptions,
        HandleSearchListActiveKeyOptions,
        SearchState,
        UpdateSearchListDataOptions
} from './Search.interface'

export const handleSearchInputStateChange =
        ({eventName, ref, state}: HandleSearchInputStateChangeOptions) =>
        (setState: Updater<SearchState>) =>
        (_event: StateEvent) => {
                if (eventName === EVENT_NAME.LAYOUT) {
                        return
                }

                setState(draft => {
                        if (draft.state === STATE.FOCUSED && eventName !== EVENT_NAME.BLUR) {
                                return
                        }

                        if (eventName) {
                                draft.eventName = eventName
                        }

                        if (state) {
                                draft.state = state
                        }
                })

                if (eventName === EVENT_NAME.PRESS_OUT) {
                        ref?.current?.focus()
                }
        }

export const updateSearchText =
        (onChangeText?: (text: string) => void) => (setState: Updater<SearchState>) => (value: string) =>
                setState(draft => {
                        if (draft.value !== value && onChangeText) {
                                draft.nextChangeTextEvent = () => onChangeText?.(value)
                        }

                        draft.value = value
                })

export const updateSearchInputValue = (setState: Updater<SearchState>) => (value?: string) =>
        setState(draft => {
                draft.value = value ?? ''

                if (draft.status === COMPONENT_STATUS.IDLE) {
                        draft.status = COMPONENT_STATUS.SUCCEEDED
                }
        })

export const updateSearchListVisibility = (setState: Updater<SearchState>) => (visible?: boolean) =>
        typeof visible === 'boolean' &&
        setState(draft => {
                if (visible) {
                        draft.listExpanded = true
                        draft.listVisible = visible

                        return
                }

                draft.listVisible = false
        })

export const updateSearchListExpanded = (setState: Updater<SearchState>) => (visible?: boolean) =>
        typeof visible === 'boolean' &&
        setState(draft => {
                if (!visible) {
                        draft.listExpanded = false
                }
        })

export const handleSearchListClose =
        (ref?: React.RefObject<TextInput | null>) =>
        (onListClose?: (options: OnVirtualListCloseOptions) => void) =>
        (options: OnVirtualListCloseOptions) => {
                ref?.current?.focus()

                // setState(draft => {
                //         draft.data = data as WritableDraft<ListItemData>[]
                // })

                // onListClose?.(options)
        }

export const handleSearchListFocusKey = (setState: Updater<SearchState>) => (key?: string) =>
        setState(draft => {
                draft.value = draft.data?.find(({indexKey}) => indexKey === key)?.supporting as string
        })

export const handleSearchListActiveKey =
        ({onActive, ref}: HandleSearchListActiveKeyOptions) =>
        (setState: Updater<SearchState>) =>
        (key?: string) => {
                ref?.current?.focus()

                setState(draft => {
                        draft.activeKey = key
                        draft.value = draft.data?.find(({indexKey}) => indexKey === key)?.supporting as string

                        if (onActive) {
                                draft.nextActiveEvent = () => onActive?.(key)
                        }
                })
        }

export const updateSearchListData =
        ({data, filter}: UpdateSearchListDataOptions) =>
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

export const animateSearchColor =
        (animateSharedValueTo: AnimateSharedValueTo) =>
        (colorSharedValue: SharedValue<number>) =>
        (disabled?: boolean) =>
                animateSharedValueTo({sharedValue: colorSharedValue})(disabled ? 0 : 1)

export const animateSearchBorderRadius =
        (animateSharedValueTo: AnimateSharedValueTo) =>
        ({borderBottomRadiusSharedValue, borderTopRadiusSharedValue}: AnimateSearchBorderRadiusOptions) =>
        (listExpanded?: boolean) => {
                const toValue = listExpanded ? 0 : 1

                animateSharedValueTo({sharedValue: borderBottomRadiusSharedValue})(toValue)
                animateSharedValueTo({sharedValue: borderTopRadiusSharedValue})(toValue)
        }
