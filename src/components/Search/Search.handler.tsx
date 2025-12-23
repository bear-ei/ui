import {COMPONENT_STATUS, EVENT_NAME, STATE} from '@/constants'
import {emitter, MODAL_TYPE} from '@/contexts'
import type {AnimateSharedValueTo, StateEvent} from '@/hooks'
import {debounce, textSearch} from '@/utils'
import type {WritableDraft} from 'immer'
import type {View} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {ListData} from '../List'
import type {AnimateSearchBorderRadiusOptions, SearchListProps} from './Search-list'
import type {
        HandleSearchInputStateChangeOptions,
        SearchState,
        UpdateSearchTextWithMatchOptions
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

export const updateSearchTextWithMatch =
        ({data = [], onChangeText}: UpdateSearchTextWithMatchOptions = {}) =>
        (setState: Updater<SearchState>) =>
        (value: string) =>
                setState(draft => {
                        if (draft.value !== value && onChangeText) {
                                draft.nextChangeTextEvent = () => onChangeText?.(value)
                        }

                        const matchedData = value ? textSearch(data)(['headline', 'supporting'])(value) : []

                        draft.data = (matchedData.length ? matchedData : undefined) as WritableDraft<ListData>[]
                        draft.value = value
                })

export const updateSearchInputValue =
        (data: ListData[] = []) =>
        (setState: Updater<SearchState>) =>
        (value?: string) =>
                setState(draft => {
                        const matchedData = value ? textSearch(data)(['headline', 'supporting'])(value) : []

                        draft.data = (matchedData.length ? matchedData : undefined) as WritableDraft<ListData>[]
                        draft.value = value ?? ''

                        if (draft.status === COMPONENT_STATUS.IDLE) {
                                draft.status = COMPONENT_STATUS.SUCCEEDED
                        }
                })

export const updateSearchListVisibility = (setState: Updater<SearchState>) => (visible?: boolean) => {
        if (typeof visible === 'boolean') {
                const nextListVisibleEvent = debounce(() =>
                        setState(draft => {
                                draft.listVisible = false
                        })
                )(300)

                setState(draft => {
                        if (visible) {
                                draft.listExpanded = true
                                draft.listVisible = visible

                                return
                        }

                        draft.elevation = 0
                        draft.nextListVisibleEvent = nextListVisibleEvent
                })
        }
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

export const animateSearchBorderRadius =
        (animateSharedValueTo: AnimateSharedValueTo) =>
        ({borderBottomRadiusSharedValue, borderTopRadiusSharedValue}: AnimateSearchBorderRadiusOptions) =>
        (listExpanded?: boolean) => {
                const toValue = listExpanded ? 0 : 1

                animateSharedValueTo({sharedValue: borderBottomRadiusSharedValue})(toValue)
                animateSharedValueTo({sharedValue: borderTopRadiusSharedValue})(toValue)
        }
