import {COMPONENT_STATUS, EVENT_NAME, STATE} from '@/constants'
import {AnimateSharedValueTo, StateEvent} from '@/hooks'
import {textSearch} from '@/utils'
import type {WritableDraft} from 'immer'
import type {View} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {ListData} from '../List'
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

export const updateSearchListVisibility = (setState: Updater<SearchState>) => (visible?: boolean) =>
        typeof visible === 'boolean' &&
        setState(draft => {
                draft.listVisible = visible
        })

export const createSearchLayoutMeasureHandler = (containerCurrent?: View | null) => {
        const measureSearchContainerLayout = (setState: Updater<SearchState>) =>
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

        return (setState: Updater<SearchState>) => (listVisible?: boolean) =>
                listVisible && measureSearchContainerLayout(setState)
}

export const animateSearch =
        (animateSharedValueTo: AnimateSharedValueTo) =>
        (colorSharedValue: SharedValue<number>) =>
        (disabled?: boolean) =>
                animateSharedValueTo({sharedValue: colorSharedValue})(disabled ? 0 : 1)
