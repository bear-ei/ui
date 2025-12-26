import {COMPONENT_STATUS, EVENT_NAME, STATE} from '@/constants'
import {emitter, MODAL_TYPE} from '@/contexts'
import type {AnimateSharedValueTo, StateEvent} from '@/hooks'
import {debounce} from '@/utils'
import type {WritableDraft} from 'immer'
import type {TextInput, View} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {ListData} from '../List'
import type {OnVirtualListCloseOptions} from '../Virtual-list'
import type {AnimateSearchBorderRadiusOptions, SearchListProps} from './Search-list'
import type {HandleSearchInputStateChangeOptions, SearchState} from './Search.interface'

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

export const updateSearchListVisibility = (setState: Updater<SearchState>) => (visible?: boolean) => {
        if (typeof visible !== 'boolean') {
                return
        }

        const nextListVisibleEvent = debounce(() =>
                setState(draft => {
                        draft.listVisible = false
                })
        )(300)

        setState(draft => {
                if (visible && draft.eventName === EVENT_NAME.FOCUS) {
                        draft.listExpanded = true
                        draft.listVisible = visible

                        return
                }

                draft.elevation = 0
                draft.nextListVisibleEvent = nextListVisibleEvent
        })
}

export const updateSearchListExpanded = (setState: Updater<SearchState>) => (visible?: boolean) =>
        setState(draft => {
                if (!visible) {
                        draft.listExpanded = false

                        return
                }

                draft.elevation = 4
        })

export const createSearchLayoutMeasureHandler =
        (setState: Updater<SearchState>) => (containerCurrent?: View | null) => (listVisible?: boolean) =>
                listVisible &&
                containerCurrent?.measure((x, y, width, height, pageX, pageY) =>
                        setState(draft => {
                                draft.layout.height = height
                                draft.layout.pageX = pageX
                                draft.layout.pageY = pageY
                                draft.layout.width = width
                                draft.layout.x = x
                                draft.layout.y = y
                        })
                )

export const emitSearchList = (id: string) => (props: SearchListProps) => (visible?: boolean) =>
        typeof visible === 'boolean' &&
        emitter.emit('modal', {id: `search__list--${id}`, type: MODAL_TYPE.SEARCH_LIST, props: {...props, visible}})

export const unmountSearchList = (id: string) => () =>
        emitter.emit('modal', {id: `search__list--${id}`, type: MODAL_TYPE.SEARCH_LIST})

export const animateSearchColor =
        (animateSharedValueTo: AnimateSharedValueTo) =>
        (colorSharedValue: SharedValue<number>) =>
        (disabled?: boolean) =>
                animateSharedValueTo({sharedValue: colorSharedValue})(disabled ? 0 : 1)

export const updateSearchListData = (setState: Updater<SearchState>) => (data?: ListData[]) =>
        data &&
        setState(draft => {
                draft.data = data as WritableDraft<ListData>[]
        })

export const animateSearchBorderRadius =
        (animateSharedValueTo: AnimateSharedValueTo) =>
        ({borderBottomRadiusSharedValue, borderTopRadiusSharedValue}: AnimateSearchBorderRadiusOptions) =>
        (listExpanded?: boolean) => {
                const toValue = listExpanded ? 0 : 1

                animateSharedValueTo({sharedValue: borderBottomRadiusSharedValue})(toValue)
                animateSharedValueTo({sharedValue: borderTopRadiusSharedValue})(toValue)
        }

export const handleSearchListActive =
        (ref: React.RefObject<TextInput | null> | undefined) =>
        (onListActive?: (indexKey?: string) => void) =>
        (indexKey?: string) => {
                ref?.current?.focus()
                onListActive?.(indexKey)
        }

/**
	 * 
	
	 */
export const handleSearchListClose =
        (ref: React.RefObject<TextInput | null> | undefined) =>
        (onListClose?: (options: OnVirtualListCloseOptions) => void) =>
        (options: OnVirtualListCloseOptions) => {
                ref?.current?.focus()

                // setState(draft => {
                //         draft.data = data as WritableDraft<ListData>[]
                // })

                onListClose?.(options)
        }
