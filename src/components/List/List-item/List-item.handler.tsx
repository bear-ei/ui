import type {GestureResponderEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTimingFactory, InteractionEvent} from '../../../hooks'
import type {ListAfterAffordancePressOutEvent} from '../List-after-affordance'
import type {ListSelectionType} from '../List.interface'
import type {
	ConfirmListItemAffordanceActionOptions,
	HandleListItemInteractionStateChangeOptions,
	ListItemProps,
	ListItemState,
	TriggerListItemTrailingActionsOptions
} from './List-item.interface'

import {COMPONENT_STATUS, EVENT_NAME, type EventName, TRIGGER_EVENT_NAMES, type TriggerOn} from '../../../constants'
import {ANIMATED_TIMING} from '../../../theme'
import {LIST_AFTER_AFFORDANCE_PHASE} from '../List-after-affordance/List-after-affordance.enum'
import {LIST_TYPE} from '../List.enum'

const ACTIVE_EVENT_NAMES = [EVENT_NAME.PRESS_OUT, EVENT_NAME.LONG_PRESS] as readonly EventName[]
export const compareListItemProps = (prevProps: ListItemProps, nextProps: ListItemProps) => {
	const {
		activeKey: prevActiveKey,
		activeKeys: prevActiveKeys,
		afterAffordance: prevAfterAffordance,
		afterAffordanceActiveKey: prevAfterAffordanceActiveKey,
		beforeAffordance: prevBeforeAffordance,
		dependencies: prevDependencies,
		disabled: isPrevDisabled,
		divider: isPrevDivider,
		enableTrailingClose: isPrevEnableTrailingClose,
		enableUnderlay: isPrevEnableUnderlay,
		enableUnderlayActive: isPrevEnableUnderlayActive,
		focusedIndex: prevFocusedIndex,
		gap: prevGap,
		itemIndex: prevItemIndex,
		itemKey: prevItemKey,
		onActiveKeyChange: prevOnActiveKeyChange,
		onAfterAffordanceActiveChange: prevOnAfterAffordanceActiveChange,
		onClose: prevOnClose,
		onLoadEnd: prevOnLoadEnd,
		onSecondaryPress: prevOnSecondaryPress,
		onTrailingPressOut: prevOnTrailingPressOut,
		primaryButtonDisabled: isPrevPrimaryButtonDisabled,
		primaryButtonLabelText: prevPrimaryButtonLabelText,
		primaryButtonLoading: isPrevPrimaryButtonLoading,
		primaryButtonStyle: prevPrimaryButtonStyle,
		secondaryButtonDisabled: isPrevSecondaryButtonDisabled,
		secondaryButtonLabelText: prevSecondaryButtonLabelText,
		secondaryButtonLoading: isPrevSecondaryButtonLoading,
		secondaryButtonStyle: prevSecondaryButtonStyle,
		selectionType: prevSelectionType,
		shape: prevShape,
		size: prevSize,
		skeletonAutoHideDelay: prevSkeletonAutoHideDelay,
		skeletonElement: prevSkeletonElement,
		supportingTextNumberOfLines: prevSupportingTextNumberOfLines,
		trailingTriggerOn: prevTrailingTriggerOn,
		type: prevType
	} = prevProps

	const {
		activeKey: nextActiveKey,
		activeKeys: nextActiveKeys,
		afterAffordance: nextAfterAffordance,
		afterAffordanceActiveKey: nextAfterAffordanceActiveKey,
		beforeAffordance: nextBeforeAffordance,
		dependencies: nextDependencies,
		disabled: isNextDisabled,
		divider: isNextDivider,
		enableTrailingClose: isNextEnableTrailingClose,
		enableUnderlay: isNextEnableUnderlay,
		enableUnderlayActive: isNextEnableUnderlayActive,
		focusedIndex: nextFocusedIndex,
		gap: nextGap,
		itemIndex: nextItemIndex,
		itemKey: nextItemKey,
		onActiveKeyChange: nextOnActiveKeyChange,
		onAfterAffordanceActiveChange: nextOnAfterAffordanceActiveChange,
		onClose: nextOnClose,
		onLoadEnd: nextOnLoadEnd,
		onSecondaryPress: nextOnSecondaryPress,
		onTrailingPressOut: nextOnTrailingPressOut,
		primaryButtonDisabled: isNextPrimaryButtonDisabled,
		primaryButtonLabelText: nextPrimaryButtonLabelText,
		primaryButtonLoading: isNextPrimaryButtonLoading,
		primaryButtonStyle: nextPrimaryButtonStyle,
		secondaryButtonDisabled: isNextSecondaryButtonDisabled,
		secondaryButtonLabelText: nextSecondaryButtonLabelText,
		secondaryButtonLoading: isNextSecondaryButtonLoading,
		secondaryButtonStyle: nextSecondaryButtonStyle,
		selectionType: nextSelectionType,
		shape: nextShape,
		size: nextSize,
		skeletonAutoHideDelay: nextSkeletonAutoHideDelay,
		skeletonElement: nextSkeletonElement,
		supportingTextNumberOfLines: nextSupportingTextNumberOfLines,
		trailingTriggerOn: nextTrailingTriggerOn,
		type: nextType
	} = nextProps

	const isActiveKeyChange =
		prevActiveKey !== nextActiveKey && (nextActiveKey === nextItemKey || prevActiveKey === prevItemKey)

	const isNextActive = nextItemKey && nextActiveKeys?.includes(nextItemKey)
	const isPrevActive = prevItemKey && prevActiveKeys?.includes(prevItemKey)
	const isActiveKeysEqual =
		nextActiveKeys?.length === prevActiveKeys?.length &&
		nextActiveKeys?.every((key, index) => key === prevActiveKeys?.[index])

	const isActiveKeysChange =
		!isActiveKeysEqual && ((isNextActive && !isPrevActive) || (isPrevActive && !isNextActive))
	const isAfterAffordanceActiveChange =
		prevAfterAffordanceActiveKey !== nextAfterAffordanceActiveKey &&
		(nextAfterAffordanceActiveKey === nextItemKey || prevAfterAffordanceActiveKey === prevItemKey)

	const isFocusedIndexChange =
		nextFocusedIndex !== prevFocusedIndex &&
		(nextFocusedIndex === nextItemIndex || prevFocusedIndex === prevItemIndex)

	const isDependenciesChanged =
		prevDependencies?.length !== nextDependencies?.length ||
		prevDependencies?.some((dependence, index) => dependence !== nextDependencies?.[index])

	return ![
		isActiveKeyChange,
		isActiveKeysChange,
		isAfterAffordanceActiveChange,
		isDependenciesChanged,
		isFocusedIndexChange,
		isPrevEnableTrailingClose !== isNextEnableTrailingClose,
		isPrevDisabled !== isNextDisabled,
		isPrevDivider !== isNextDivider,
		isPrevEnableUnderlay !== isNextEnableUnderlay,
		isPrevEnableUnderlayActive !== isNextEnableUnderlayActive,
		isPrevPrimaryButtonDisabled !== isNextPrimaryButtonDisabled,
		isPrevPrimaryButtonLoading !== isNextPrimaryButtonLoading,
		isPrevSecondaryButtonDisabled !== isNextSecondaryButtonDisabled,
		isPrevSecondaryButtonLoading !== isNextSecondaryButtonLoading,
		prevAfterAffordance !== nextAfterAffordance,
		prevBeforeAffordance !== nextBeforeAffordance,
		prevGap !== nextGap,
		prevOnActiveKeyChange !== nextOnActiveKeyChange,
		prevOnAfterAffordanceActiveChange !== nextOnAfterAffordanceActiveChange,
		prevOnClose !== nextOnClose,
		prevOnLoadEnd !== nextOnLoadEnd,
		prevOnSecondaryPress !== nextOnSecondaryPress,
		prevOnTrailingPressOut !== nextOnTrailingPressOut,
		prevPrimaryButtonLabelText !== nextPrimaryButtonLabelText,
		prevPrimaryButtonStyle !== nextPrimaryButtonStyle,
		prevSecondaryButtonLabelText !== nextSecondaryButtonLabelText,
		prevSecondaryButtonStyle !== nextSecondaryButtonStyle,
		prevSelectionType !== nextSelectionType,
		prevShape !== nextShape,
		prevSize !== nextSize,
		prevSkeletonAutoHideDelay !== nextSkeletonAutoHideDelay,
		prevSkeletonElement !== nextSkeletonElement,
		prevSupportingTextNumberOfLines !== nextSupportingTextNumberOfLines,
		prevTrailingTriggerOn !== nextTrailingTriggerOn,
		prevType !== nextType
	].some(Boolean)
}

export const handleListItemActive =
	(selectionType?: ListSelectionType, onActiveKeyChange?: (itemKey: string) => void) => (itemKey: string) => {
		if (!selectionType) {
			return
		}

		onActiveKeyChange?.(itemKey)
	}

export const handleTrailingTriggerEvent = (setState: Updater<ListItemState>, trailingTriggerOn?: TriggerOn) => {
	return (eventName?: EventName) => {
		if (!trailingTriggerOn) {
			return
		}

		const triggerEventNames = TRIGGER_EVENT_NAMES[trailingTriggerOn]

		if (eventName && triggerEventNames.includes(eventName)) {
			const isVisible = eventName === EVENT_NAME.HOVER_IN

			setState(draft => {
				draft.trailingVisible = isVisible
			})
		}
	}
}

export const handleListItemStateChange = (
	_event: InteractionEvent,
	setState: Updater<ListItemState>,
	{eventName, itemKey, onActiveKeyChange, onLoadEnd, type}: HandleListItemInteractionStateChangeOptions
) =>
	setState(draft => {
		if (eventName === EVENT_NAME.LAYOUT && draft.status !== COMPONENT_STATUS.IDLE) {
			return
		}

		const prevEventName = draft.eventName
		const isMenuFocus =
			eventName === EVENT_NAME.BLUR && prevEventName === EVENT_NAME.FOCUS && type === LIST_TYPE.MENU

		if (isMenuFocus) {
			return
		}

		if (draft.status === COMPONENT_STATUS.SUCCEEDED) {
			draft.eventName = eventName
		}

		if (eventName === EVENT_NAME.LAYOUT) {
			if (onLoadEnd) {
				draft.pendingLoadEndEvent = itemKey
			}

			if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}

			return
		}

		if (ACTIVE_EVENT_NAMES.includes(eventName) && onActiveKeyChange) {
			draft.pendingActiveEvent = itemKey
		}
	})

export const triggerListItemTrailingActions =
	(
		itemKey: string,
		{
			afterAffordance,
			enableTrailingClose,
			onAfterAffordanceActiveChange,
			onClose,
			onPressOut
		}: TriggerListItemTrailingActionsOptions
	) =>
	(event: GestureResponderEvent) => {
		if (onPressOut) {
			onPressOut(event)

			return
		}

		if (afterAffordance) {
			onAfterAffordanceActiveChange?.({activeKey: itemKey})
		}

		if (enableTrailingClose) {
			onClose()
		}
	}

export const confirmListItemAffordanceAction =
	({onAfterAffordanceActiveChange, onClose}: ConfirmListItemAffordanceActionOptions) =>
	({itemKey, ...options}: ListAfterAffordancePressOutEvent) => {
		const {phase} = options

		if (phase === LIST_AFTER_AFFORDANCE_PHASE.DANGER) {
			onClose()

			return
		}

		onAfterAffordanceActiveChange?.({pressOutEvent: {...options, itemKey}})
	}

export const updateListItemFocusState =
	(itemIndex: number, setState: Updater<ListItemState>) => (focusedIndex?: number) =>
		typeof focusedIndex === 'number' &&
		setState(draft => {
			draft.eventName =
				itemIndex === focusedIndex ? EVENT_NAME.FOCUS
				: draft.eventName === EVENT_NAME.FOCUS ? EVENT_NAME.BLUR
				: draft.eventName
		})

export const maybeTriggerListItemClose = (itemKey: string, onClose?: (itemKey?: string) => void) => () =>
	onClose?.(itemKey)

export const updateListItemAfterAffordanceExpanded = (setState: Updater<ListItemState>) => (visible?: boolean) =>
	setState(draft => {
		draft.afterAffordanceExpanded = visible
	})

export const updateListItemTrailingHoverEvent = (setState: Updater<ListItemState>) => (eventName: EventName) =>
	eventName === EVENT_NAME.HOVER_IN &&
	setState(draft => {
		draft.eventName = eventName
	})

export const animateListItemAffordanceVisible = (
	sharedValue: SharedValue<number>,
	animatedTiming: AnimatedTimingFactory
) => {
	const entryAnimateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.ENTER)

	const exitAnimateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.EXIT)

	return (visible?: boolean) =>
		typeof visible === 'boolean' && (visible ? entryAnimateSharedValueTo(1) : exitAnimateSharedValueTo(0))
}

export const animateListItemActiveState = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTimingFactory) => {
	const animateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.STANDARD)

	return (active?: boolean) => typeof active === 'boolean' && animateSharedValueTo(active ? 1 : 0)
}
