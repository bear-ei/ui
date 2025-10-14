import {arrayEqual} from '@/utils'
import type {Updater} from 'use-immer'
import type {ListData} from '../List'
import type {HandleMenuKeyDownOptions, MenuState} from './Menu.interface'

const handleMenuActiveKeys =
        (activeKeys = [] as string[]) =>
        (key: string) => {
                if (activeKeys.findIndex(item => item === key) !== -1) {
                        return activeKeys?.filter(item => item !== key)
                }

                return [...activeKeys, key]
        }

export const handleMenuKeyDown = ({
        activeKey,
        activeKeys,
        data,
        multiple,
        onActive,
        onActives
}: HandleMenuKeyDownOptions) => {
        const handleMenuKeyCode = (setState: Updater<MenuState>) => (keyCode?: string) =>
                setState(draft => {
                        const currentFocusedIndex = draft.focusedIndex ?? -1
                        const lastIndex = (data?.length ?? 0) - 1
                        const focusData =
                                currentFocusedIndex && currentFocusedIndex !== -1 ?
                                        data?.[currentFocusedIndex]
                                :       undefined

                        switch (true) {
                                case keyCode?.startsWith('ArrowUp'):
                                        draft.focusedIndex =
                                                currentFocusedIndex - 1 < 0 ? lastIndex : currentFocusedIndex - 1
                                        break

                                case keyCode?.startsWith('ArrowDown'):
                                        draft.focusedIndex =
                                                currentFocusedIndex + 1 > lastIndex ? 0 : currentFocusedIndex + 1

                                        break

                                case keyCode?.startsWith('Enter'):
                                        if (!focusData || typeof draft.focusedIndex !== 'number') {
                                                return
                                        }

                                        draft.keyCode = keyCode

                                        if (draft.keyCode !== keyCode && onActives && multiple) {
                                                draft.nextActiveEvent = () =>
                                                        onActives?.(
                                                                handleMenuActiveKeys(activeKeys)(focusData.indexKey)
                                                        )

                                                return
                                        }

                                        if (draft.keyCode !== keyCode && onActive) {
                                                draft.nextActiveEvent = () =>
                                                        onActive?.(
                                                                focusData.indexKey === activeKey ?
                                                                        undefined
                                                                :       focusData.indexKey
                                                        )
                                        }

                                        break

                                default:
                                        break
                        }
                })

        return (setState: Updater<MenuState>) => (keyCode?: string) => {
                if (!data) {
                        return
                }

                handleMenuKeyCode(setState)(keyCode)
        }
}

export const handleMenuKeyDownEvent =
        (data?: ListData[]) => (setState: Updater<MenuState>) => (event: React.KeyboardEvent) => {
                const {code} = event

                if (['ArrowUp', 'ArrowDown'].includes(code)) {
                        event.preventDefault()
                }

                handleMenuKeyDown({data})(setState)(code)
        }

export const updateMenuVisibility =
        (setState: Updater<MenuState>) => (onVisible?: (value?: boolean) => void) => (value?: boolean) =>
                typeof value !== 'undefined' &&
                setState(draft => {
                        if (!value) {
                                draft.activeKey = undefined
                                draft.focusedIndex = undefined
                        }

                        if (draft.visible !== value && onVisible) {
                                draft.nextVisibilityEvent = () => onVisible?.(value)
                        }

                        draft.visible = value
                })

export const updateMenuActive =
        (setState: Updater<MenuState>) => (onActive?: (value?: string) => void) => (value?: string) =>
                typeof value !== 'undefined' &&
                setState(draft => {
                        if (draft.activeKey !== value && onActive) {
                                draft.nextActiveEvent = () => onActive?.(value)
                        }

                        draft.activeKey = value
                })

export const updateMenuActives =
        (setState: Updater<MenuState>) => (onActives?: (values?: string[]) => void) => (values?: string[]) =>
                typeof values !== 'undefined' &&
                setState(draft => {
                        const isAreArraysEqual = arrayEqual([...(draft.activeKeys ?? [])])(values)

                        if (!isAreArraysEqual && onActives) {
                                draft.nextActiveEvent = () => onActives?.(values)
                        }

                        draft.activeKeys = values
                })

export const updateMenuVisible = (setState: Updater<MenuState>) => (visible: boolean) =>
        setState(draft => {
                draft.visible = visible
        })
