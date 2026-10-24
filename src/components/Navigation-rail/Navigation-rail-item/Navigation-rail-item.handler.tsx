import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTiming, StateEvent} from '../../../hooks'
import type {
	AnimateNavigationRailItemOptions,
	HandleNavigationRailItemStateChangeOptions,
	NavigationRailItemProps,
	NavigationRailItemState
} from './Navigation-rail-item.interface'

import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import {DURATION, EASING} from '../../../theme'
import {NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'

const ANIMATED_TIMING_OPTIONS = {duration: DURATION.SHORT_2, easing: EASING.STANDARD}
export const compareNavigationRailItemProps = (
	prevProps: NavigationRailItemProps,
	nextProps: NavigationRailItemProps
) => {
	const {
		activeKey: prevActiveKey,
		animatedType: prevAnimatedType,
		backgroundUnderlay: prevBackgroundUnderlay,
		centered: isPrevCentered,
		dependencies: prevDependencies,
		disabled: isPrevDisabled,
		elevationUnderlay: prevElevationUnderlay,
		enableTouchableRipple: isPrevEnableTouchableRipple,
		icon: prevIcon,
		indexKey: prevIndexKey,
		labelText: prevLabelText,
		onActive: prevOnActive,
		onBlur: prevOnBlur,
		onFocus: prevOnFocus,
		onHoverIn: prevOnHoverIn,
		onHoverOut: prevOnHoverOut,
		onLayout: prevOnLayout,
		onLongPress: prevOnLongPress,
		onPress: prevOnPress,
		onPressIn: prevOnPressIn,
		onPressOut: prevOnPressOut,
		onStateEventChange: prevOnStateEventChange,
		type: prevType,
		underlayColor: prevUnderlayColor
	} = prevProps

	const {
		activeKey: nextActiveKey,
		animatedType: nextAnimatedType,
		backgroundUnderlay: nextBackgroundUnderlay,
		centered: isNextCentered,
		dependencies: nextDependencies,
		disabled: isNextDisabled,
		elevationUnderlay: nextElevationUnderlay,
		enableTouchableRipple: isNextEnableTouchableRipple,
		icon: nextIcon,
		indexKey: nextIndexKey,
		labelText: nextLabelText,
		onActive: nextOnActive,
		onBlur: nextOnBlur,
		onFocus: nextOnFocus,
		onHoverIn: nextOnHoverIn,
		onHoverOut: nextOnHoverOut,
		onLayout: nextOnLayout,
		onLongPress: nextOnLongPress,
		onPress: nextOnPress,
		onPressIn: nextOnPressIn,
		onPressOut: nextOnPressOut,
		onStateEventChange: nextOnStateEventChange,
		type: nextType,
		underlayColor: nextUnderlayColor
	} = nextProps

	const isActiveChange =
		prevActiveKey !== nextActiveKey && (nextActiveKey === nextIndexKey || prevActiveKey === prevIndexKey)

	const isDependenciesChanged =
		prevDependencies?.length !== nextDependencies?.length ||
		prevDependencies?.some((dependence, index) => dependence !== nextDependencies?.[index])

	return ![
		isActiveChange,
		isDependenciesChanged,
		prevAnimatedType !== nextAnimatedType,
		prevBackgroundUnderlay !== nextBackgroundUnderlay,
		isPrevCentered !== isNextCentered,
		isPrevDisabled !== isNextDisabled,
		prevElevationUnderlay !== nextElevationUnderlay,
		isPrevEnableTouchableRipple !== isNextEnableTouchableRipple,
		prevIcon !== nextIcon,
		prevLabelText !== nextLabelText,
		prevOnActive !== nextOnActive,
		prevOnBlur !== nextOnBlur,
		prevOnFocus !== nextOnFocus,
		prevOnHoverIn !== nextOnHoverIn,
		prevOnHoverOut !== nextOnHoverOut,
		prevOnLayout !== nextOnLayout,
		prevOnLongPress !== nextOnLongPress,
		prevOnPress !== nextOnPress,
		prevOnPressIn !== nextOnPressIn,
		prevOnPressOut !== nextOnPressOut,
		prevOnStateEventChange !== nextOnStateEventChange,
		prevType !== nextType,
		prevUnderlayColor !== nextUnderlayColor
	].some(Boolean)
}

export const handleNavigationRailItemStateChange = (
	_event: StateEvent,
	setState: Updater<NavigationRailItemState>,
	{eventName, indexKey, onActive, ref}: HandleNavigationRailItemStateChangeOptions
) => {
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

export const animateNavigationRailItem = (
	[contentTranslateYSharedValue, labelTextSharedValue]: [SharedValue<number>, SharedValue<number>],
	animatedTiming: AnimatedTiming,
	{type}: AnimateNavigationRailItemOptions
) => {
	const contentTranslateYAnimateSharedValueTo = animatedTiming(contentTranslateYSharedValue, ANIMATED_TIMING_OPTIONS)
	const labelTextAnimateSharedValueTo = animatedTiming(labelTextSharedValue, ANIMATED_TIMING_OPTIONS)

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
