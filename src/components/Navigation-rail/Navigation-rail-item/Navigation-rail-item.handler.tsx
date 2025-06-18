import type {View} from 'react-native'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../../hooks'
import {COMPONENT_STATUS, EVENT_NAME, type EventName} from '../../Common'
import {NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import type {
	AnimateNavigationRailItemOptions,
	AnimateNavigationRailItemSharedValues,
	HandleNavigationRailItemStateChangeOptions,
	NavigationRailItemProps,
	NavigationRailItemState
} from './Navigation-rail-item.interface'

export const compareNavigationRailItemProps =
	(prevProps: NavigationRailItemProps) => (nextProps: NavigationRailItemProps) => {
		const {activeKey: prevActiveKey, indexKey: prevIndexKey} = prevProps
		const {activeKey: nextActiveKey, indexKey: nextIndexKey} = nextProps
		const isActiveChange =
			prevActiveKey !== nextActiveKey &&
			(nextActiveKey === nextIndexKey || prevActiveKey === prevIndexKey)

		return ![isActiveChange].some(Boolean)
	}

export const handleNavigationRailItemStateChange =
	({eventName, indexKey, onActive, ref}: HandleNavigationRailItemStateChangeOptions) =>
	(setState: Updater<NavigationRailItemState>) =>
	(_event: StateEvent) => {
		const triggerNavigationRailItemPressOut = (activeKey?: string) => activeKey && onActive?.(activeKey)
		const nextEvent = {
			[EVENT_NAME.PRESS_IN]: () => (ref as unknown as React.RefObject<View>).current?.focus(),
			[EVENT_NAME.PRESS_OUT]: () => triggerNavigationRailItemPressOut(indexKey)
		} as unknown as Record<EventName, () => void>

		setState(draft => {
			if (eventName === EVENT_NAME.LAYOUT) {
				if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
					draft.status = COMPONENT_STATUS.SUCCEEDED
				}

				return
			}

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

export const animateNavigationRailItem =
	({animateSharedValueTo, type}: AnimateNavigationRailItemOptions) =>
	({labelTextSharedValue, contentTranslateYSharedValue}: AnimateNavigationRailItemSharedValues) =>
	(active?: boolean) => {
		if (!(type === NAVIGATION_RAIL_TYPE.SEGMENT && typeof active === 'boolean')) {
			return
		}

		const toValue = active ? 1 : 0

		animateSharedValueTo({sharedValue: contentTranslateYSharedValue})(toValue)
		animateSharedValueTo({sharedValue: labelTextSharedValue})(toValue)
	}
