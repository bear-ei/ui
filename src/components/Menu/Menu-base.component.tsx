import {useClearComponentEvent} from '@/hooks'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {
        handleMenuKeyDown,
        handleMenuKeyDownEvent,
        updateMenuActive,
        updateMenuActives,
        updateMenuVisibility
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
                        onVisible: rawOnVisible,
                        visible: rawIsVisible,
                        ...renderProps
                },
                ref
        ) => {
                const [
                        {activeKey, activeKeys, focusedIndex, nextActiveEvent, nextVisibilityEvent, visible: isVisible},
                        setState
                ] = useImmer<MenuState>({})

                useClearComponentEvent(setState)

                const id = useId()
                const onActive = useMemo(() => updateMenuActive(setState)(rawOnActive), [rawOnActive, setState])
                const onActives = useMemo(() => updateMenuActives(setState)(rawOnActives), [rawOnActives, setState])
                const onKeyDown = useMemo(() => handleMenuKeyDownEvent(data)(setState), [data, setState])
                const onVisible = useMemo(() => updateMenuVisibility(setState)(rawOnVisible), [rawOnVisible, setState])
                const runUpdateActive = useMemo(() => updateMenuActive(setState)(rawOnActive), [rawOnActive, setState])
                const runUpdateActives = useMemo(
                        () => updateMenuActives(setState)(rawOnActives),
                        [rawOnActives, setState]
                )

                const runUpdateVisible = useMemo(
                        () => updateMenuVisibility(setState)(rawOnVisible),
                        [rawOnVisible, setState]
                )

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
                        requestIdleCallback(() => nextVisibilityEvent?.())
                }, [nextVisibilityEvent])

                useEffect(() => {
                        requestIdleCallback(() => nextActiveEvent?.())
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
                                visible={isVisible}
                        />
                )
        }
)

MenuBase.displayName = 'MenuBase'
