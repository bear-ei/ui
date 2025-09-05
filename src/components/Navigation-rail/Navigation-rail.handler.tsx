import type {Updater} from 'use-immer'
import {COMPONENT_STATUS} from '../Common'
import type {NavigationRailData, NavigationRailState} from './Navigation-rail.interface'

export const updateNavigationRailActiveKey =
	(onActive?: (activeKey?: string) => void) =>
	(setState: Updater<NavigationRailState>) =>
	(activeKey?: string) => {
		if (!activeKey) {
			return
		}

		const nextActiveEvent = () => onActive?.(activeKey)

		setState(draft => {
			if (draft.activeKey !== activeKey) {
				draft.nextActiveEvent = nextActiveEvent
			}

			draft.activeKey = activeKey
		})
	}

export const updateNavigationRailData = (setState: Updater<NavigationRailState>) => (data?: NavigationRailData[]) => {
	setState(draft => {
		draft.data = data
		draft.status = COMPONENT_STATUS.SUCCEEDED
	})
}

export const clearNavigationRailEvent = (setState: Updater<NavigationRailState>) => (eventName: 'active') => {
	const event = {
		active: () =>
			setState(draft => {
				draft.nextActiveEvent = undefined
			})
	}

	setTimeout(() => {
		event[eventName]?.()
	}, 0)
}
