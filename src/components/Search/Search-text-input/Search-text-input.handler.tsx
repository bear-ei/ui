import {COMPONENT_STATUS, EVENT_NAME, STATE} from '@/constants'
import type {AnimateSharedValueTo, StateEvent} from '@/hooks'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {
        AnimateSearchTextInputBorderRadiusOptions,
        HandleSearchTextInputStateChangeOptions,
        SearchTextInputState
} from './Search-text-input.interface'

export const handleSearchTextInputStateChange =
        ({eventName, ref, state}: HandleSearchTextInputStateChangeOptions) =>
        (setState: Updater<SearchTextInputState>) =>
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

export const updateSearchTextInputText =
        (onChangeText?: (text: string) => void) => (setState: Updater<SearchTextInputState>) => (value: string) =>
                setState(draft => {
                        if (draft.value === value) {
                                return
                        }

                        draft.value = value

                        if (onChangeText) {
                                draft.nextChangeTextEvent = () => onChangeText?.(value)
                        }
                })

export const updateSearchTextInputValue = (setState: Updater<SearchTextInputState>) => (value?: string) =>
        setState(draft => {
                draft.value = value ?? ''

                if (draft.status === COMPONENT_STATUS.IDLE) {
                        draft.status = COMPONENT_STATUS.SUCCEEDED
                }
        })

export const animateSearchColor =
        (animateSharedValueTo: AnimateSharedValueTo) =>
        (colorSharedValue: SharedValue<number>) =>
        (disabled?: boolean) =>
                animateSharedValueTo({sharedValue: colorSharedValue})(disabled ? 0 : 1)

export const animateSearchBorderRadius =
        (animateSharedValueTo: AnimateSharedValueTo) =>
        ({borderBottomRadiusSharedValue, borderTopRadiusSharedValue}: AnimateSearchTextInputBorderRadiusOptions) =>
        (listExpanded?: boolean) => {
                const toValue = listExpanded ? 0 : 1

                animateSharedValueTo({sharedValue: borderBottomRadiusSharedValue})(toValue)
                animateSharedValueTo({sharedValue: borderTopRadiusSharedValue})(toValue)
        }
