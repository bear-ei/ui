import {useClearComponentEvent} from '@/hooks'
import {SIZE} from '@bearei/theme-token'
import {cloneElement, forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import type {FABProps} from '../FAB'
import {NAVIGATION_DESTINATION_POSITION} from './Navigation-rail.enum'
import {updateNavigationRailActiveKey, updateNavigationRailData} from './Navigation-rail.handler'
import type {NavigationRailBaseProps, NavigationRailState} from './Navigation-rail.interface'
import {RenderNavigationRail, RenderNavigationRailItems} from './Navigation-rail.render'

export const NavigationRailBase = forwardRef<View, NavigationRailBaseProps>(
        (
                {
                        activeKey: rawActiveKey,
                        animatedType,
                        data: rawData,
                        defaultActiveKey,
                        destinationPosition = NAVIGATION_DESTINATION_POSITION.TOP,
                        fab,
                        menu,
                        onActive: rawOnActive,
                        type,
                        ...renderNavigationRailProps
                },
                ref
        ) => {
                const [{activeKey, data, nextActiveEvent}, setState] = useImmer<NavigationRailState>({})

                useClearComponentEvent(setState)

                const id = useId()
                const onActive = useMemo(
                        () => updateNavigationRailActiveKey(rawOnActive)(setState),
                        [rawOnActive, setState]
                )

                const runUpdateData = useMemo(() => updateNavigationRailData(setState), [setState])
                const runUpdateActiveKey = useMemo(() => updateNavigationRailActiveKey()(setState), [setState])
                const itemElements = (
                        <RenderNavigationRailItems
                                activeKey={activeKey ?? defaultActiveKey}
                                animatedType={animatedType}
                                data={data}
                                id={id}
                                onActive={onActive}
                                type={type}
                        />
                )

                const fabElement =
                        fab ?
                                cloneElement<FABProps>(fab, {
                                        elevated: false,
                                        size: SIZE.LARGE,
                                        testID: `navigationRail__fab--${id}`
                                })
                        :       undefined

                useEffect(() => {
                        runUpdateActiveKey(rawActiveKey ?? defaultActiveKey)
                }, [defaultActiveKey, rawActiveKey, runUpdateActiveKey])

                useEffect(() => {
                        runUpdateData(rawData)
                }, [runUpdateData, rawData])

                useEffect(() => {
                        nextActiveEvent?.()
                }, [nextActiveEvent])

                return (
                        <RenderNavigationRail
                                {...renderNavigationRailProps}
                                destinationPosition={destinationPosition}
                                fabElement={fabElement}
                                id={id}
                                itemElements={itemElements}
                                menuElement={menu}
                                ref={ref}
                        />
                )
        }
)

NavigationRailBase.displayName = 'NavigationRailBase'
