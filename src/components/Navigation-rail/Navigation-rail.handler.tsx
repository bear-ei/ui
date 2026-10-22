import type {Updater} from 'use-immer'

import type {
	NavigationRailData,
	NavigationRailState,
	UpdateNavigationRailActiveKeyOptions
} from './Navigation-rail.interface'

export const updateNavigationRailActiveKey =
	(
		setState: Updater<NavigationRailState>,
		{onActive, triggerEvent = true}: UpdateNavigationRailActiveKeyOptions = {}
	) =>
	(activeKey?: string) => {
		if (typeof activeKey !== 'string') {
			return
		}

		setState(draft => {
			if (draft.activeKey === activeKey) {
				return
			}

			draft.activeKey = activeKey

			if (onActive && triggerEvent) {
				draft.pendingActiveEvent = activeKey
			}
		})
	}

export const updateNavigationRailData = (setState: Updater<NavigationRailState>) => (data?: NavigationRailData[]) =>
	setState(draft => {
		draft.data = data
	})
