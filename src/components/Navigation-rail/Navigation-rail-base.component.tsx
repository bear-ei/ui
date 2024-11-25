import {cloneElement, forwardRef, useEffect, useId, useMemo} from 'react'
import {InteractionManager, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {FABProps} from '../FAB'
import {
        HandleNavigationRailActiveOptions,
        NavigationRailBaseProps,
        NavigationRailData,
        NavigationRailState,
        RenderNavigationRailItemOptions
} from '././Navigation-rail.interface'
import {NavigationRailItem} from './Navigation-rail-item'

const handleNavigationRailActive =
        ({onActive}: HandleNavigationRailActiveOptions = {}) =>
        (setState: Updater<NavigationRailState>) =>
        (value?: string) => {
                const handleNextActiveEvent = () => onActive?.(value)

                if (value) {
                        setState(draft => {
                                const prevNavigationRailActiveKey = draft.navigationRailActiveKey

                                draft.navigationRailActiveKey = value

                                if (prevNavigationRailActiveKey !== draft.navigationRailActiveKey) {
                                        draft.nextActiveEvent = handleNextActiveEvent
                                }
                        })
                }
        }

const renderNavigationRailItems =
        (renderNavigationRailItemOptions: RenderNavigationRailItemOptions) => (data?: NavigationRailData[]) =>
                data?.map(({indexKey, ...props}, index) => (
                        <NavigationRailItem
                                {...props}
                                {...renderNavigationRailItemOptions}
                                itemKey={indexKey ?? index.toString()}
                                key={indexKey}
                        />
                ))

const renderNavigationRailFAB = (fab?: JSX.Element) =>
        fab ? cloneElement<FABProps>(fab, {elevated: false, size: 'medium'}) : undefined

export const NavigationRailBase = forwardRef<View, NavigationRailBaseProps>(
        (
                {
                        activeKey,
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
                const [{navigationRailActiveKey, nextActiveEvent}, setState] = useImmer<NavigationRailState>({
                        navigationRailActiveKey: undefined,
                        nextActiveEvent: undefined
                })

                const id = useId()
                const onNavigationRailActive = handleNavigationRailActive({
                        onActive,
                        activeKey: navigationRailActiveKey
                })(setState)

                const onNavigationRailActiveSource = useMemo(() => handleNavigationRailActive()(setState), [setState])
                const navigationRailItemElements = renderNavigationRailItems({
                        activeKey: navigationRailActiveKey,
                        onActive: onNavigationRailActive,
                        type
                })(data)

                const fabElement = renderNavigationRailFAB(fab)

                useEffect(() => {
                        onNavigationRailActiveSource(activeKey ?? defaultActiveKey)
                }, [activeKey, defaultActiveKey, onNavigationRailActiveSource])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextActiveEvent?.())
                }, [nextActiveEvent])

                if (typeof defaultActiveKey === 'string' && !navigationRailActiveKey) {
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
