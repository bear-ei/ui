import type {Updater} from 'use-immer'
import type {
	NavigationRailData,
	NavigationRailState,
	UpdateNavigationRailActiveKeyOptions
} from './Navigation-rail.interface'

export const updateNavigationRailActiveKey =
	({onActive, triggerEvent = true}: UpdateNavigationRailActiveKeyOptions = {}) =>
	(setState: Updater<NavigationRailState>) =>
	(activeKey?: string) => {
		if (typeof activeKey !== 'string') {
			return
		}

		setState(draft => {
			if (draft.activeKey === activeKey) {
				return
			}

			if (onActive && triggerEvent) {
				draft.pendingActiveEvent = activeKey
			}

			draft.activeKey = activeKey
		})
	}

export const updateNavigationRailData = (setState: Updater<NavigationRailState>) => (data?: NavigationRailData[]) =>
	setState(draft => {
		draft.data = data
	})
