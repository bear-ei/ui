import {forwardRef, useEffect, useId, useMemo} from 'react'
import {InteractionManager, View} from 'react-native'
import {useImmer} from 'use-immer'
import {NavigationRailBaseProps, NavigationRailState} from '././Navigation-rail.interface'
import {handleNavigationRailActive, handleNavigationRailFAB, handleNavigationRailItems} from './Navigation-rail-handle'

export const NavigationRailBase = forwardRef<View, NavigationRailBaseProps>(
        (
                {
                        activeKey: rawActiveKey,
                        data,
                        defaultActiveKey,
                        destinationPosition = 'top',
                        fab,
                        onActive,
                        render,
                        type,
                        ...renderProps
                },
                ref
        ) => {
                const [{activeKey, nextActiveEvent, status}, setState] = useImmer<NavigationRailState>({status: 'idle'})
                const id = useId()
                const onNavigationRailActive = handleNavigationRailActive({onActive, activeKey})(setState)
                const onNavigationRailRawActive = useMemo(() => handleNavigationRailActive()(setState), [setState])
                const navigationRailItemElements = handleNavigationRailItems({
                        activeKey,
                        onActive: onNavigationRailActive,
                        type
                })(data)

                const fabElement = handleNavigationRailFAB(id)(fab)

                useEffect(() => {
                        onNavigationRailRawActive(rawActiveKey ?? defaultActiveKey)
                }, [rawActiveKey, defaultActiveKey, onNavigationRailRawActive])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextActiveEvent?.())
                }, [nextActiveEvent])

                if (status === 'idle') {
                        return <></>
                }

                return render({
                        ...renderProps,
                        destinationPosition,
                        fabElement,
                        id,
                        navigationRailItemElements,
                        ref
                })
        }
)
