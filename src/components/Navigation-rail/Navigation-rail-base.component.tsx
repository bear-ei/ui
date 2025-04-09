import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../utils'
import {NavigationRailBaseProps, NavigationRailState} from '././Navigation-rail.interface'
import {
        handleNavigationRailActive,
        handleNavigationRailData,
        renderNavigationRailFAB,
        renderNavigationRailItems
} from './Navigation-rail-handle'
import {DestinationPosition} from './Navigation-rail.enum'

export const NavigationRailBase = forwardRef<View, NavigationRailBaseProps>(
        (
                {
                        activeKey: rawActiveKey,
                        animatedType,
                        data: rawData,
                        defaultActiveKey,
                        destinationPosition = DestinationPosition.TOP,
                        fab,
                        onActive,
                        render,
                        type,
                        ...renderProps
                },
                ref
        ) => {
                const [{activeKey, nextActiveEvent, status, data}, setState] = useImmer<NavigationRailState>({
                        status: 'idle'
                })

                const id = useId()
                const onNavigationRailActive = handleNavigationRailActive(onActive)(setState)
                const onNavigationRailData = useMemo(() => handleNavigationRailData(setState), [setState])
                const onNavigationRailRawActive = useMemo(() => handleNavigationRailActive()(setState), [setState])
                const navigationRailItemElements = renderNavigationRailItems({
                        activeKey: activeKey ?? defaultActiveKey,
                        animatedType,
                        id,
                        onActive: onNavigationRailActive,
                        type
                })(data)

                const fabElement = renderNavigationRailFAB(id)(fab)

                useEffect(() => {
                        onNavigationRailRawActive(rawActiveKey ?? defaultActiveKey)
                }, [rawActiveKey, defaultActiveKey, onNavigationRailRawActive])

                useEffect(() => {
                        onNavigationRailData(rawData)
                }, [onNavigationRailData, rawData])

                useEffect(() => {
                        runAfterInteractions(nextActiveEvent)()
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
