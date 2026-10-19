import type {Updater} from 'use-immer'
import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import type {StateEvent} from '../../../hooks'
import {DURATION, EASING} from '../../../theme'
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
		const {activeKey: prevActiveKey, indexKey: prevIndexKey, dependencies: prevDependencies} = prevProps
		const {activeKey: nextActiveKey, indexKey: nextIndexKey, dependencies: nextDependencies} = nextProps
		const isActiveChange =
			prevActiveKey !== nextActiveKey && (nextActiveKey === nextIndexKey || prevActiveKey === prevIndexKey)

		const isIconChanged = prevProps.icon !== nextProps.icon
		const isLabelTextChanged = prevProps.labelText !== nextProps.labelText
		const isTypeChanged = prevProps.type !== nextProps.type
		const isDependenciesChanged =
			prevDependencies?.length !== nextDependencies?.length ||
			prevDependencies?.some((dependence, index) => dependence !== nextDependencies?.[index])

		return ![isActiveChange, isDependenciesChanged, isIconChanged, isLabelTextChanged, isTypeChanged].some(Boolean)
	}

export const handleNavigationRailItemStateChange =
	({eventName, indexKey, onActive, ref}: HandleNavigationRailItemStateChangeOptions) =>
	(setState: Updater<NavigationRailItemState>) =>
	(_event: StateEvent) => {
		setState(draft => {
			if (eventName === EVENT_NAME.LAYOUT) {
				if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
					draft.status = COMPONENT_STATUS.SUCCEEDED
				}

				return
			}

			draft.eventName = eventName

			if (eventName === EVENT_NAME.PRESS_OUT && onActive) {
				draft.pendingPressOutEvent = indexKey
			}
		})

		if (eventName === EVENT_NAME.PRESS_IN) {
			ref.current?.focus()
		}
	}

const ANIMATED_TIMING_OPTIONS = {duration: DURATION.SHORT_2, easing: EASING.STANDARD}
export const animateNavigationRailItem =
	({animatedTiming, type}: AnimateNavigationRailItemOptions) =>
	({labelTextSharedValue, contentTranslateYSharedValue}: AnimateNavigationRailItemSharedValues) => {
		const contentTranslateYAnimateSharedValueTo = animatedTiming(ANIMATED_TIMING_OPTIONS)({
			sharedValue: contentTranslateYSharedValue
		})

		const labelTextAnimateSharedValueTo = animatedTiming(ANIMATED_TIMING_OPTIONS)({
			sharedValue: labelTextSharedValue
		})

		// Content translateY animation is SEGMENT-only (M3 selection indicator:
		// the icon shifts up to make room for the label). BLOCK uses a fixed layout;
		// its visual active state comes from Underlay's own scale animation.
		return (active?: boolean) => {
			if (!(type === NAVIGATION_RAIL_TYPE.SEGMENT && typeof active === 'boolean')) {
				return
			}

			const toValue = active ? 1 : 0

			contentTranslateYAnimateSharedValueTo(toValue)
			labelTextAnimateSharedValueTo(toValue)
		}
	}
