import {cloneElement} from 'react'
import {Updater} from 'use-immer'
import {FABProps} from '../FAB'
import {NavigationRailItem} from './Navigation-rail-item'
import {NavigationRailData, NavigationRailState, RenderNavigationRailItemOptions} from './Navigation-rail.interface'

export const handleNavigationRailActive =
        (onActive?: (value?: string) => void) => (setState: Updater<NavigationRailState>) => (activeKey?: string) => {
                const handleNextActiveEvent = () => onActive?.(activeKey)

                if (!activeKey) {
                        return
                }

                setState(draft => {
                        if (activeKey !== draft.activeKey) {
                                draft.activeKey = activeKey
                                draft.nextActiveEvent = handleNextActiveEvent
                        }
                })
        }

export const handleNavigationRailData = (setState: Updater<NavigationRailState>) => (data?: NavigationRailData[]) => {
        setState(draft => {
                draft.data = data
                draft.status = 'succeeded'
        })
}

export const renderNavigationRailItems =
        ({id, ...renderNavigationRailItemOptions}: RenderNavigationRailItemOptions) =>
        (data?: NavigationRailData[]) =>
                data?.map(({indexKey, ...props}, index) => (
                        <NavigationRailItem
                                {...props}
                                {...renderNavigationRailItemOptions}
                                indexKey={indexKey ?? index.toString()}
                                key={indexKey}
                                testID={`navigationRail__navigationRailItem--${id}`}
                        />
                ))

export const renderNavigationRailFAB = (id: string) => (fab?: React.JSX.Element) =>
        fab ?
                cloneElement<FABProps>(fab, {
                        elevated: false,
                        size: 'medium',
                        testID: `navigationRail__fab--${id}`
                })
        :       undefined
