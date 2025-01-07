import {cloneElement} from 'react'
import {Updater} from 'use-immer'
import {FABProps} from '../FAB'
import {NavigationRailItem} from './Navigation-rail-item'
import {
        HandleNavigationRailActiveOptions,
        NavigationRailData,
        NavigationRailState,
        RenderNavigationRailItemOptions
} from './Navigation-rail.interface'

export const handleNavigationRailActive =
        ({onActive}: HandleNavigationRailActiveOptions = {}) =>
        (setState: Updater<NavigationRailState>) =>
        (value?: string) => {
                const handleNextActiveEvent = () => onActive?.(value)

                if (!value) {
                        return
                }

                setState(draft => {
                        if (value !== draft.activeKey) {
                                draft.activeKey = value
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

export const handleNavigationRailItems =
        (renderNavigationRailItemOptions: RenderNavigationRailItemOptions) => (data?: NavigationRailData[]) =>
                data?.map(({indexKey, ...props}, index) => (
                        <NavigationRailItem
                                {...props}
                                {...renderNavigationRailItemOptions}
                                itemKey={indexKey ?? index.toString()}
                                key={indexKey}
                        />
                ))

export const handleNavigationRailFAB = (id: string) => (fab?: JSX.Element) =>
        fab ?
                cloneElement<FABProps>(fab, {
                        elevated: false,
                        size: 'medium',
                        testID: `navigationRail__fab--${id}`
                })
        :       undefined
