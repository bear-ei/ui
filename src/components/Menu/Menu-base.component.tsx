import {forwardRef, KeyboardEvent, useEffect, useId, useMemo} from 'react'
import {InteractionManager} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {ListData, VirtualListComponent} from '../List'
import {HandleMenuKeyDownOptions, MenuBaseProps, MenuState} from './Menu.interface'

const handleMenuActiveKeys =
        (activeKeys = [] as string[]) =>
        (key: string) => {
                if (activeKeys.findIndex(item => item === key) !== -1) {
                        return activeKeys?.filter(item => item !== key)
                }

                return [...activeKeys, key]
        }

const handleMenuKeyDown = ({data, multiple, onActives, onActive, activeKeys, activeKey}: HandleMenuKeyDownOptions) => {
        const handleNextActivesEvent = (indexKey: string) => () =>
                onActives?.(handleMenuActiveKeys(activeKeys)(indexKey))

        const handleNextActiveEvent = (indexKey: string) => () =>
                onActive?.(indexKey === activeKey ? undefined : indexKey)

        const handleMenuKeyCode = (setState: Updater<MenuState>) => (keyCode?: string) =>
                setState(draft => {
                        const currentFocusedIndex = draft.focusedIndex ?? -1
                        const lastIndex = data!.length - 1
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

                                case keyCode?.startsWith('Enter') && draft.keyCode !== keyCode:
                                        if (!focusData || typeof draft.focusedIndex !== 'number') {
                                                return
                                        }

                                        if (multiple) {
                                                draft.nextActivesEvent = handleNextActivesEvent(focusData.indexKey)
                                        } else {
                                                draft.nextActiveEvent = handleNextActiveEvent(focusData.indexKey)
                                        }

                                        draft.keyCode = keyCode
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

const handleMenuKeyDownEvent = (data?: ListData[]) => (setState: Updater<MenuState>) => (event: KeyboardEvent) => {
        const {code} = event

        if (['ArrowUp', 'ArrowDown'].includes(code)) {
                event.preventDefault()
        }

        handleMenuKeyDown({data})(setState)(code)
}

const handleMenuVisible =
        (setState: Updater<MenuState>) => (onVisible?: (value?: boolean) => void) => (value?: boolean) => {
                const handleNextVisibleEvent = () => onVisible?.(value)

                if (typeof value === 'undefined') {
                        return
                }

                setState(draft => {
                        if (!value) {
                                draft.focusedIndex = undefined
                        }

                        draft.nextVisibleEvent = handleNextVisibleEvent
                })
        }

export const MenuBase = forwardRef<VirtualListComponent<ListData>, MenuBaseProps>(
        (
                {
                        render,
                        data,
                        keyCode,
                        onVisible,
                        onActive,
                        onActives,
                        multiple,
                        activeKeys,
                        activeKey,
                        ...renderProps
                },
                ref
        ) => {
                const [{focusedIndex, nextVisibleEvent, nextActivesEvent, nextActiveEvent}, setState] =
                        useImmer<MenuState>({
                                focusedIndex: undefined,
                                keyCode: undefined,
                                nextActiveEvent: undefined,
                                nextActivesEvent: undefined,
                                nextVisibleEvent: undefined
                        })

                const id = useId()
                const onMenuKeyDown = useMemo(
                        () =>
                                handleMenuKeyDown({
                                        data,
                                        multiple,
                                        onActives,
                                        onActive,
                                        activeKeys,
                                        activeKey
                                })(setState),
                        [activeKey, activeKeys, data, multiple, onActive, onActives, setState]
                )

                const onMenuKeyDownEvent = handleMenuKeyDownEvent(data)(setState)
                const onMenuVisible = useMemo(() => handleMenuVisible(setState)(onVisible), [onVisible, setState])

                useEffect(() => {
                        onMenuKeyDown(keyCode)
                }, [keyCode, onMenuKeyDown])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextVisibleEvent?.())
                }, [nextVisibleEvent])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextActivesEvent?.())
                }, [nextActivesEvent])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextActiveEvent?.())
                }, [nextActiveEvent])

                return render({
                        ...renderProps,
                        activeKey,
                        activeKeys,
                        data,
                        focusedIndex,
                        id,
                        multiple,
                        onActive,
                        onActives,
                        onKeyDown: onMenuKeyDownEvent,
                        onVisible: onMenuVisible,
                        ref: ref as MenuBaseProps['ref']
                })
        }
)
