import {cloneElement} from 'react'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../../hooks'
import type {EventName} from '../../Common'
import {Icon, ICON_NAME, ICON_STYLE, ICON_TYPE, type IconProps} from '../../Icon'
import {NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import type {
	HandleNavigationRailItemAnimatedTimingOptions,
	HandleNavigationRailItemStateEventChangeOptions,
	NavigationRailItemProps,
	NavigationRailItemState
} from './Navigation-rail-item.interface'

export const handleNavigationRailItemPropsEqual =
	(prevProps: NavigationRailItemProps) => (nextProps: NavigationRailItemProps) => {
		const {activeKey: prevActiveKey, indexKey: prevIndexKey} = prevProps
		const {activeKey: nextActiveKey, indexKey: nextIndexKey} = nextProps
		const isActiveChange =
			prevActiveKey !== nextActiveKey &&
			(nextActiveKey === nextIndexKey || prevActiveKey === prevIndexKey)

		return ![isActiveChange].some(Boolean)
	}

const handleNavigationRailItemPressOut = (onActive?: (activeKey: string) => void) => (activeKey: string) =>
	onActive?.(activeKey)

export const handleNavigationRailItemStateChange =
	({eventName, indexKey, onActive, ref}: HandleNavigationRailItemStateEventChangeOptions) =>
	(setState: Updater<NavigationRailItemState>) =>
	(_event: StateEvent) => {
		const nextEvent = {
			pressIn: () => ref.current?.focus(),
			pressOut: () => handleNavigationRailItemPressOut(onActive)(indexKey)
		} as Record<EventName, () => void>

		if (eventName === 'layout') {
			return
		}

		setState(draft => {
			const prevEventName = draft.eventName

			if (eventName) {
				draft.eventName = eventName
			}

			if (eventName === 'pressIn') {
				nextEvent[eventName]()
			}

			if (prevEventName !== eventName && eventName === 'pressOut') {
				draft.nextPressOutEvent = nextEvent[eventName]
			}
		})
	}

export const renderNavigationRailItemIcon = (id: string) => (icon?: React.JSX.Element) => (active?: boolean) =>
	cloneElement<IconProps>(
		icon ?? (
			<Icon
				iconStyle={ICON_STYLE.ROUNDED}
				name={ICON_NAME.CIRCLE}
				type={ICON_TYPE.OUTLINED}
			/>
		),
		{
			iconStyle: ICON_STYLE.ROUNDED,
			testID: `navigationRailItem__icon--${id}`,
			type: active ? ICON_TYPE.FILLED : ICON_TYPE.OUTLINED
		}
	)

export const handleNavigationRailItemAnimatedTiming =
	({animatedTiming, type}: HandleNavigationRailItemAnimatedTimingOptions) =>
	(labelTextColorSharedValue: SharedValue<number>) =>
	(active?: boolean) => {
		if (!(type === NAVIGATION_RAIL_TYPE.SEGMENT && typeof active === 'boolean')) {
			return
		}

		const toValue = active ? 1 : 0

		animatedTiming()(labelTextColorSharedValue)(toValue)
	}
