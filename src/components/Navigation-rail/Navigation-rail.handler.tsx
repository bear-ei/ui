import type {Updater} from 'use-immer'

import type {
	NavigationRailDestination,
	NavigationRailState,
	UpdateNavigationRailActiveKeyOptions
} from './Navigation-rail.interface'

export const updateNavigationRailActiveKey =
	(
		setState: Updater<NavigationRailState>,
		{notify = true, onActiveKeyChange}: UpdateNavigationRailActiveKeyOptions = {}
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

			if (onActiveKeyChange && notify) {
				draft.pendingActiveEvent = activeKey
			}
		})
	}

export const updateNavigationRailData =
	(setState: Updater<NavigationRailState>) => (data?: NavigationRailDestination[]) =>
		setState(draft => {
			draft.data = data
		})
