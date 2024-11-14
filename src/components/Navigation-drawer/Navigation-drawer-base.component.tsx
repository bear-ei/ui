import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {NavigationDrawerItem} from './Navigation-drawer-item'
import {
        HandleNavigationDrawerActiveOptions,
        NavigationDrawerBaseProps,
        NavigationDrawerData,
        NavigationDrawerState,
        RenderNavigationDrawerItemOptions
} from './Navigation-drawer.interface'

const handleNavigationDrawerActive = ({onActive}: HandleNavigationDrawerActiveOptions = {}) => {
        const handleNextActiveEvent = (value?: string) => () => onActive?.(value)

        return (setState: Updater<NavigationDrawerState>) => (value?: string) => {
                if (value) {
                        setState(draft => {
                                const prevNavigationDrawerActiveKey = draft.navigationDrawerActiveKey

                                draft.navigationDrawerActiveKey = value

                                if (prevNavigationDrawerActiveKey !== draft.navigationDrawerActiveKey) {
                                        draft.nextActiveEvent = handleNextActiveEvent(value)
                                }
                        })
                }
        }
}

const renderNavigationDrawerItems =
        (renderNavigationDrawerItemOptions: RenderNavigationDrawerItemOptions) => (data?: NavigationDrawerData[]) =>
                data?.map(({indexKey, ...props}, index) => (
                        <NavigationDrawerItem
                                {...props}
                                {...renderNavigationDrawerItemOptions}
                                itemKey={indexKey ?? index.toString()}
                                key={indexKey}
                        />
                ))

export const NavigationDrawerBase = forwardRef<View, NavigationDrawerBaseProps>(
        ({activeKey, data, defaultActiveKey, onActive, render, ...renderProps}, ref) => {
                const [{navigationDrawerActiveKey, nextActiveEvent}, setState] = useImmer<NavigationDrawerState>({
                        navigationDrawerActiveKey: undefined,
                        nextActiveEvent: undefined
                })

                const id = useId()
                const onNavigationDrawerActive = handleNavigationDrawerActive({
                        onActive,
                        activeKey: navigationDrawerActiveKey
                })(setState)

                const onNavigationDrawerActiveSource = useMemo(
                        () => handleNavigationDrawerActive()(setState),
                        [setState]
                )
                const navigationDrawerItemElements = renderNavigationDrawerItems({
                        activeKey: navigationDrawerActiveKey,
                        onActive: onNavigationDrawerActive
                })(data)

                useEffect(() => {
                        onNavigationDrawerActiveSource(activeKey ?? defaultActiveKey)
                }, [activeKey, defaultActiveKey, onNavigationDrawerActiveSource])

                useEffect(() => {
                        nextActiveEvent?.()
                }, [nextActiveEvent])

                if (typeof defaultActiveKey === 'string' && !navigationDrawerActiveKey) {
                        return <></>
                }

                return render({
                        ...renderProps,
                        id,
                        navigationDrawerItemElements,
                        ref
                })
        }
)
