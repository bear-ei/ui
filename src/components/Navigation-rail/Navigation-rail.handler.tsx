import type {Updater} from 'use-immer'
import {COMPONENT_STATUS} from '../Common'
import type {NavigationRailData, NavigationRailState} from './Navigation-rail.interface'

export const updateNavigationRailActiveKey =
	(onActive?: (activeKey?: string) => void) =>
	(setState: Updater<NavigationRailState>) =>
	(activeKey?: string) => {
		const nextActiveEvent = () => onActive?.(activeKey)

		if (!activeKey) {
			return
		}

		setState(draft => {
			if (activeKey !== draft.activeKey) {
				draft.activeKey = activeKey
				draft.nextActiveEvent = nextActiveEvent
			}
		})
	}

export const updateNavigationRailData = (setState: Updater<NavigationRailState>) => (data?: NavigationRailData[]) => {
	setState(draft => {
		draft.data = data
		draft.status = COMPONENT_STATUS.SUCCEEDED
	})
}
