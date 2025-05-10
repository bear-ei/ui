import type {Updater} from 'use-immer'
import type {NavigationRailData, NavigationRailState} from './Navigation-rail.interface'

export const handleNavigationRailActive =
	(onActive?: (activeKey?: string) => void) =>
	(setState: Updater<NavigationRailState>) =>
	(activeKey?: string) => {
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
		draft.status = COMPONENT_STATUS.SUCCEEDED
	})
}
