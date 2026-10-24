import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTimingFactory, InteractionEvent} from '../../../hooks'
import type {
	AnimateNavigationRailItemOptions,
	HandleNavigationRailItemInteractionStateChangeOptions,
	NavigationRailItemProps,
	NavigationRailItemState
} from './Navigation-rail-item.interface'

import {COMPONENT_STATUS, EVENT_NAME} from '../../../constants'
import {ANIMATED_TIMING} from '../../../theme'
import {NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'

export const compareNavigationRailItemProps = (
	prevProps: NavigationRailItemProps,
	nextProps: NavigationRailItemProps
) => {
	const {
		activeKey: prevActiveKey,
		animation: prevAnimation,
		backgroundUnderlay: prevBackgroundUnderlay,
		dependencies: prevDependencies,
		disabled: isPrevDisabled,
		elevationUnderlay: prevElevationUnderlay,
		enableTouchableRipple: isPrevEnableTouchableRipple,
		icon: prevIcon,
		itemKey: prevItemKey,
		labelText: prevLabelText,
		onActiveKeyChange: prevOnActiveKeyChange,
		onBlur: prevOnBlur,
		onFocus: prevOnFocus,
		onHoverIn: prevOnHoverIn,
		onHoverOut: prevOnHoverOut,
		onInteractionStateChange: prevOnInteractionStateChange,
		onLayout: prevOnLayout,
		onLongPress: prevOnLongPress,
		onPress: prevOnPress,
		onPressIn: prevOnPressIn,
		onPressOut: prevOnPressOut,
		rippleCentered: isPrevRippleCentered,
		type: prevType,
		underlayColor: prevUnderlayColor
	} = prevProps

	const {
		activeKey: nextActiveKey,
		animation: nextAnimation,
		backgroundUnderlay: nextBackgroundUnderlay,
		dependencies: nextDependencies,
		disabled: isNextDisabled,
		elevationUnderlay: nextElevationUnderlay,
		enableTouchableRipple: isNextEnableTouchableRipple,
		icon: nextIcon,
		itemKey: nextItemKey,
		labelText: nextLabelText,
		onActiveKeyChange: nextOnActiveKeyChange,
		onBlur: nextOnBlur,
		onFocus: nextOnFocus,
		onHoverIn: nextOnHoverIn,
		onHoverOut: nextOnHoverOut,
		onInteractionStateChange: nextOnInteractionStateChange,
		onLayout: nextOnLayout,
		onLongPress: nextOnLongPress,
		onPress: nextOnPress,
		onPressIn: nextOnPressIn,
		onPressOut: nextOnPressOut,
		rippleCentered: isNextRippleCentered,
		type: nextType,
		underlayColor: nextUnderlayColor
	} = nextProps

	const isActiveChange =
		prevActiveKey !== nextActiveKey && (nextActiveKey === nextItemKey || prevActiveKey === prevItemKey)

	const isDependenciesChanged =
		prevDependencies?.length !== nextDependencies?.length ||
		prevDependencies?.some((dependence, index) => dependence !== nextDependencies?.[index])

	return ![
		isActiveChange,
		isDependenciesChanged,
		prevAnimation !== nextAnimation,
		prevBackgroundUnderlay !== nextBackgroundUnderlay,
		isPrevRippleCentered !== isNextRippleCentered,
		isPrevDisabled !== isNextDisabled,
		prevElevationUnderlay !== nextElevationUnderlay,
		isPrevEnableTouchableRipple !== isNextEnableTouchableRipple,
		prevIcon !== nextIcon,
		prevLabelText !== nextLabelText,
		prevOnActiveKeyChange !== nextOnActiveKeyChange,
		prevOnBlur !== nextOnBlur,
		prevOnFocus !== nextOnFocus,
		prevOnHoverIn !== nextOnHoverIn,
		prevOnHoverOut !== nextOnHoverOut,
		prevOnLayout !== nextOnLayout,
		prevOnLongPress !== nextOnLongPress,
		prevOnPress !== nextOnPress,
		prevOnPressIn !== nextOnPressIn,
		prevOnPressOut !== nextOnPressOut,
		prevOnInteractionStateChange !== nextOnInteractionStateChange,
		prevType !== nextType,
		prevUnderlayColor !== nextUnderlayColor
	].some(Boolean)
}

export const handleNavigationRailItemStateChange = (
	_event: InteractionEvent,
	setState: Updater<NavigationRailItemState>,
	{eventName, itemKey, onActiveKeyChange, ref}: HandleNavigationRailItemInteractionStateChangeOptions
) => {
	setState(draft => {
		if (eventName === EVENT_NAME.LAYOUT) {
			if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}

			return
		}

		draft.eventName = eventName

		if (eventName === EVENT_NAME.PRESS_OUT && onActiveKeyChange) {
			draft.pendingPressOutEvent = itemKey
		}
	})

	if (eventName === EVENT_NAME.PRESS_IN) {
		ref.current?.focus()
	}
}

export const animateNavigationRailItem = (
	[contentTranslateYSharedValue, labelTextSharedValue]: [SharedValue<number>, SharedValue<number>],
	animatedTiming: AnimatedTimingFactory,
	{type}: AnimateNavigationRailItemOptions
) => {
	const contentTranslateYAnimateSharedValueTo = animatedTiming(contentTranslateYSharedValue, ANIMATED_TIMING.STANDARD)
	const labelTextAnimateSharedValueTo = animatedTiming(labelTextSharedValue, ANIMATED_TIMING.STANDARD)

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
