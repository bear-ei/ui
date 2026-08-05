import {arrayEqual} from '@/utils'
import type {TextInputKeyPressEvent} from 'react-native'
import type {Updater} from 'use-immer'
import {POPOVER_TYPE} from '../Popover'
import type {
    HandleMenuKeyDownEventOptions,
    HandleMenuKeyDownOptions,
    MenuState,
    UpdateMenuVisibleOptions
} from './Menu.interface'

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
    onActives,
    onFocusKey
}: HandleMenuKeyDownOptions) => {
    const handleMenuKeyCode = (setState: Updater<MenuState>) => (keyCode?: string) =>
        setState(draft => {
            const currentFocusedIndex = draft.focusedIndex ?? -1
            const lastIndex = (data?.length ?? 0) - 1
            const focusData =
                typeof currentFocusedIndex === 'number' && currentFocusedIndex !== -1 ?
                    data?.[currentFocusedIndex]
                :   undefined

            switch (true) {
                case keyCode?.startsWith('ArrowUp'): {
                    const nextFocusedIndex = currentFocusedIndex - 1 < 0 ? lastIndex : currentFocusedIndex - 1

                    draft.focusedIndex = nextFocusedIndex

                    if (onFocusKey) {
                        draft.nextFocusKeyEvent = () => onFocusKey?.(data?.[nextFocusedIndex]?.indexKey)
                    }

                    break
                }

                case keyCode?.startsWith('ArrowDown'): {
                    const nextFocusedIndex = currentFocusedIndex + 1 > lastIndex ? 0 : currentFocusedIndex + 1

                    draft.focusedIndex = nextFocusedIndex

                    if (onFocusKey) {
                        draft.nextFocusKeyEvent = () => onFocusKey?.(data?.[nextFocusedIndex]?.indexKey)
                    }

                    break
                }

                case keyCode?.startsWith('Enter'):
                    if (!focusData || typeof draft.focusedIndex !== 'number') {
                        break
                    }

                    if (draft.keyCode !== keyCode && onActives && multiple) {
                        draft.nextActiveEvent = () => onActives?.(handleMenuActiveKeys(activeKeys)(focusData.indexKey))

                        break
                    }

                    if (draft.keyCode !== keyCode && onActive) {
                        draft.nextActiveEvent = () =>
                            onActive?.(focusData.indexKey === activeKey ? undefined : focusData.indexKey)
                    }

                    break

                default:
                    break
            }

            draft.keyCode = keyCode
        })

    return (setState: Updater<MenuState>) => (keyCode?: string) => {
        if (!data) {
            return
        }

        handleMenuKeyCode(setState)(keyCode)
    }
}

export const handleMenuKeyDownEvent =
    (options: HandleMenuKeyDownEventOptions) =>
    (setState: Updater<MenuState>) =>
    (event: React.KeyboardEvent | TextInputKeyPressEvent) => {
        const key = event.nativeEvent ? event.nativeEvent.key : (event as React.KeyboardEvent).key

        if (['ArrowUp', 'ArrowDown'].includes(key)) {
            event.preventDefault()
        }

        handleMenuKeyDown(options)(setState)(key)
    }

export const updateMenuVisible =
    ({onVisible, type}: UpdateMenuVisibleOptions) =>
    (setState: Updater<MenuState>) =>
    (value?: boolean) =>
        typeof value !== 'undefined' &&
        setState(draft => {
            if (!value) {
                draft.focusedIndex = undefined

                if (type === POPOVER_TYPE.CONTEXT_MENU) {
                    draft.activeKey = undefined
                }
            }

            if (draft.visible !== value && onVisible) {
                draft.nextVisibleEvent = () => onVisible?.(value)
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
