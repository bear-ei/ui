import type {Updater} from 'use-immer'
import type {NavigationRailData, NavigationRailState} from './Navigation-rail.interface'

export const updateNavigationRailActiveKey =
        (onActive?: (activeKey?: string) => void) => (setState: Updater<NavigationRailState>) => (activeKey?: string) =>
                activeKey &&
                setState(draft => {
                        if (draft.activeKey !== activeKey && onActive) {
                                draft.nextActiveEvent = () => onActive?.(activeKey)
                        }

                        draft.activeKey = activeKey
                })

export const updateNavigationRailData = (setState: Updater<NavigationRailState>) => (data?: NavigationRailData[]) => {
        setState(draft => {
                draft.data = data
        })
}
