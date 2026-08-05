import {useClearComponentEvent} from '@/hooks'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {POPOVER_TYPE} from '../Popover'
import {
    handleMenuKeyDown,
    handleMenuKeyDownEvent,
    updateMenuActive,
    updateMenuActives,
    updateMenuVisible
} from './Menu.handler'
import type {MenuBaseProps, MenuState} from './Menu.interface'
import {RenderMenu} from './Menu.render'

export const MenuBase = forwardRef<View, MenuBaseProps>(
    (
        {
            activeKey: rawActiveKey,
            activeKeys: rawActiveKeys,
            data,
            defaultActiveKey,
            defaultActiveKeys,
            defaultVisible,
            keyCode,
            multiple,
            onActive: rawOnActive,
            onActives: rawOnActives,
            onFocusKey,
            onVisible: rawOnVisible,
            type = POPOVER_TYPE.CONTEXT_MENU,
            visible: rawIsVisible,
            ...renderProps
        },
        ref
    ) => {
        const [
            {
                activeKey,
                activeKeys,
                focusedIndex,
                nextActiveEvent,
                nextFocusKeyEvent,
                nextVisibleEvent,
                visible: isVisible
            },
            setState
        ] = useImmer<MenuState>({})

        useClearComponentEvent(setState)

        const id = useId()
        const onActive = useMemo(() => updateMenuActive(setState)(rawOnActive), [rawOnActive, setState])
        const onActives = useMemo(() => updateMenuActives(setState)(rawOnActives), [rawOnActives, setState])
        const onKeyDown = useMemo(
            () =>
                handleMenuKeyDownEvent({
                    data,
                    onFocusKey,
                    onActive: rawOnActive,
                    onActives: rawOnActives
                })(setState),
            [data, onFocusKey, rawOnActive, rawOnActives, setState]
        )

        const onVisible = useMemo(
            () => updateMenuVisible({onVisible: rawOnVisible, type})(setState),
            [rawOnVisible, setState, type]
        )

        const runUpdateActive = onActive
        const runUpdateActives = onActives
        const runUpdateVisible = onVisible
        const runKeyDown = useMemo(
            () =>
                handleMenuKeyDown({
                    activeKey,
                    activeKeys,
                    data,
                    multiple,
                    onActive: rawOnActive,
                    onActives: rawOnActives
                })(setState),
            [activeKey, activeKeys, data, multiple, rawOnActive, rawOnActives, setState]
        )

        useEffect(() => {
            runKeyDown(keyCode)
        }, [keyCode, runKeyDown])

        useEffect(() => {
            runUpdateActive(rawActiveKey ?? defaultActiveKey)
        }, [defaultActiveKey, rawActiveKey, runUpdateActive])

        useEffect(() => {
            runUpdateActives(rawActiveKeys ?? defaultActiveKeys)
        }, [defaultActiveKeys, rawActiveKeys, runUpdateActives])

        useEffect(() => {
            runUpdateVisible(rawIsVisible ?? defaultVisible)
        }, [defaultVisible, rawIsVisible, runUpdateVisible])

        useEffect(() => {
            nextFocusKeyEvent?.()
        }, [nextFocusKeyEvent])

        useEffect(() => {
            nextVisibleEvent?.()
        }, [nextVisibleEvent])

        useEffect(() => {
            nextActiveEvent?.()
        }, [nextActiveEvent])

        return (
            <RenderMenu
                {...renderProps}
                activeKey={activeKey}
                activeKeys={activeKeys}
                data={data}
                focusedIndex={focusedIndex}
                id={id}
                multiple={multiple}
                onActive={onActive}
                onActives={onActives}
                onKeyDown={onKeyDown}
                onVisible={onVisible}
                ref={ref}
                type={type}
                visible={isVisible}
            />
        )
    }
)

MenuBase.displayName = 'MenuBase'
