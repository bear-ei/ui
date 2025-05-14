import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../../hooks'
import {EVENT_NAME, type EventName} from '../../Common'
import {NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import type {
	AnimateNavigationRailItemLabelColorOptions,
	HandleNavigationRailItemStateEventChangeOptions,
	NavigationRailItemProps,
	NavigationRailItemState
} from './Navigation-rail-item.interface'

export const compareItemProps = (prevProps: NavigationRailItemProps) => (nextProps: NavigationRailItemProps) => {
	const {activeKey: prevActiveKey, indexKey: prevIndexKey} = prevProps
	const {activeKey: nextActiveKey, indexKey: nextIndexKey} = nextProps
	const isActiveChange =
		prevActiveKey !== nextActiveKey && (nextActiveKey === nextIndexKey || prevActiveKey === prevIndexKey)

	return ![isActiveChange].some(Boolean)
}

const triggerItemPressOut = (onActive?: (activeKey: string) => void) => (activeKey?: string) =>
	activeKey && onActive?.(activeKey)

export const handleItemStateChange =
	({eventName, indexKey, onActive, ref}: HandleNavigationRailItemStateEventChangeOptions) =>
	(setState: Updater<NavigationRailItemState>) =>
	(_event: StateEvent) => {
		const nextEvent = {
			[EVENT_NAME.PRESS_IN]: () => ref.current?.focus(),
			[EVENT_NAME.PRESS_OUT]: () => triggerItemPressOut(onActive)(indexKey)
		} as Record<EventName, () => void>

		if (eventName === EVENT_NAME.LAYOUT) {
			return
		}

		setState(draft => {
			const prevEventName = draft.eventName

			if (eventName) {
				draft.eventName = eventName
			}

			if (eventName === EVENT_NAME.PRESS_IN) {
				nextEvent[eventName]()
			}

			if (prevEventName !== eventName && eventName === EVENT_NAME.PRESS_OUT) {
				draft.nextPressOutEvent = nextEvent[eventName]
			}
		})
	}

export const animateItemLabelColor =
	({animatedTiming, type}: AnimateNavigationRailItemLabelColorOptions) =>
	(labelTextColorSharedValue: SharedValue<number>) =>
	(active?: boolean) => {
		if (!(type === NAVIGATION_RAIL_TYPE.SEGMENT && typeof active === 'boolean')) {
			return
		}

		const toValue = active ? 1 : 0

		animatedTiming()(labelTextColorSharedValue)(toValue)
	}
