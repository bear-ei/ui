import type {GestureResponderEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTiming, StateEvent} from '../../../hooks'
import type {ListAfterAffordancePressOutEvent} from '../List-after-affordance'
import type {ListSelectType} from '../List.interface'
import type {
	ConfirmListItemAffordanceActionOptions,
	HandleListItemStateChangeOptions,
	ListItemProps,
	ListItemState,
	TriggerListItemTrailingActionsOptions
} from './List-item.interface'

import {COMPONENT_STATUS, EVENT_NAME, type EventName, TRIGGER_ON, type TriggerOn} from '../../../constants'
import {DURATION, EASING} from '../../../theme'
import {LIST_AFTER_AFFORDANCE_PHASE} from '../List-after-affordance/List-after-affordance.enum'
import {LIST_TYPE} from '../List.enum'

export const compareListItemProps = (prevProps: ListItemProps, nextProps: ListItemProps) => {
	const {
		activeKey: prevActiveKey,
		activeKeys: prevActiveKeys,
		afterAffordance: prevAfterAffordance,
		afterAffordanceActiveKey: prevAfterAffordanceActiveKey,
		beforeAffordance: prevBeforeAffordance,
		closeTrailing: isPrevCloseTrailing,
		dependencies: prevDependencies,
		disabled: isPrevDisabled,
		divider: isPrevDivider,
		enableUnderlay: isPrevEnableUnderlay,
		enableUnderlayActive: isPrevEnableUnderlayActive,
		focusedIndex: prevFocusedIndex,
		gap: prevGap,
		indexKey: prevIndexKey,
		itemIndex: prevItemIndex,
		onActive: prevOnActive,
		onActiveAfterAffordance: prevOnActiveAfterAffordance,
		onClose: prevOnClose,
		onLoadEnd: prevOnLoadEnd,
		onSecondaryAction: prevOnSecondaryAction,
		onTrailingPressOut: prevOnTrailingPressOut,
		primaryButtonDisabled: isPrevPrimaryButtonDisabled,
		primaryButtonLabelText: prevPrimaryButtonLabelText,
		primaryButtonLoading: isPrevPrimaryButtonLoading,
		primaryButtonStyle: prevPrimaryButtonStyle,
		secondaryButtonDisabled: isPrevSecondaryButtonDisabled,
		secondaryButtonLabelText: prevSecondaryButtonLabelText,
		secondaryButtonLoading: isPrevSecondaryButtonLoading,
		secondaryButtonStyle: prevSecondaryButtonStyle,
		selectType: prevSelectType,
		shape: prevShape,
		size: prevSize,
		skeletonDuration: prevSkeletonDuration,
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
		closeTrailing: isNextCloseTrailing,
		dependencies: nextDependencies,
		disabled: isNextDisabled,
		divider: isNextDivider,
		enableUnderlay: isNextEnableUnderlay,
		enableUnderlayActive: isNextEnableUnderlayActive,
		focusedIndex: nextFocusedIndex,
		gap: nextGap,
		indexKey: nextIndexKey,
		itemIndex: nextItemIndex,
		onActive: nextOnActive,
		onActiveAfterAffordance: nextOnActiveAfterAffordance,
		onClose: nextOnClose,
		onLoadEnd: nextOnLoadEnd,
		onSecondaryAction: nextOnSecondaryAction,
		onTrailingPressOut: nextOnTrailingPressOut,
		primaryButtonDisabled: isNextPrimaryButtonDisabled,
		primaryButtonLabelText: nextPrimaryButtonLabelText,
		primaryButtonLoading: isNextPrimaryButtonLoading,
		primaryButtonStyle: nextPrimaryButtonStyle,
		secondaryButtonDisabled: isNextSecondaryButtonDisabled,
		secondaryButtonLabelText: nextSecondaryButtonLabelText,
		secondaryButtonLoading: isNextSecondaryButtonLoading,
		secondaryButtonStyle: nextSecondaryButtonStyle,
		selectType: nextSelectType,
		shape: nextShape,
		size: nextSize,
		skeletonDuration: nextSkeletonDuration,
		skeletonElement: nextSkeletonElement,
		supportingTextNumberOfLines: nextSupportingTextNumberOfLines,
		trailingTriggerOn: nextTrailingTriggerOn,
		type: nextType
	} = nextProps

	const isActiveKeyChange =
		prevActiveKey !== nextActiveKey && (nextActiveKey === nextIndexKey || prevActiveKey === prevIndexKey)

	const isNextActive = nextIndexKey && nextActiveKeys?.includes(nextIndexKey)
	const isPrevActive = prevIndexKey && prevActiveKeys?.includes(prevIndexKey)
	const isAreArraysEqual =
		nextActiveKeys?.length === prevActiveKeys?.length &&
		nextActiveKeys?.every((key, index) => key === prevActiveKeys?.[index])

	const isActiveKeysChange = !isAreArraysEqual && ((isNextActive && !isPrevActive) || (isPrevActive && !isNextActive))
	const isAfterAffordanceActiveChange =
		prevAfterAffordanceActiveKey !== nextAfterAffordanceActiveKey &&
		(nextAfterAffordanceActiveKey === nextIndexKey || prevAfterAffordanceActiveKey === prevIndexKey)

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
		isPrevCloseTrailing !== isNextCloseTrailing,
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
		prevOnActive !== nextOnActive,
		prevOnActiveAfterAffordance !== nextOnActiveAfterAffordance,
		prevOnClose !== nextOnClose,
		prevOnLoadEnd !== nextOnLoadEnd,
		prevOnSecondaryAction !== nextOnSecondaryAction,
		prevOnTrailingPressOut !== nextOnTrailingPressOut,
		prevPrimaryButtonLabelText !== nextPrimaryButtonLabelText,
		prevPrimaryButtonStyle !== nextPrimaryButtonStyle,
		prevSecondaryButtonLabelText !== nextSecondaryButtonLabelText,
		prevSecondaryButtonStyle !== nextSecondaryButtonStyle,
		prevSelectType !== nextSelectType,
		prevShape !== nextShape,
		prevSize !== nextSize,
		prevSkeletonDuration !== nextSkeletonDuration,
		prevSkeletonElement !== nextSkeletonElement,
		prevSupportingTextNumberOfLines !== nextSupportingTextNumberOfLines,
		prevTrailingTriggerOn !== nextTrailingTriggerOn,
		prevType !== nextType
	].some(Boolean)
}

export const updateListItemActive =
	(selectType?: ListSelectType, onActive?: (indexKey: string) => void) => (indexKey: string) => {
		if (!selectType) {
			return
		}

		onActive?.(indexKey)
	}

export const handleTrailingTriggerEvent = (setState: Updater<ListItemState>, trailingTriggerOn?: TriggerOn) => {
	const trigger = {
		[TRIGGER_ON.FOCUS]: [EVENT_NAME.FOCUS, EVENT_NAME.BLUR],
		[TRIGGER_ON.HOVER]: [EVENT_NAME.HOVER_IN, EVENT_NAME.HOVER_OUT],
		[TRIGGER_ON.NONE]: [EVENT_NAME.NONE],
		[TRIGGER_ON.PRESS]: [EVENT_NAME.PRESS_IN]
	} as Record<TriggerOn, readonly EventName[]>

	return (eventName?: EventName) => {
		if (!trailingTriggerOn) {
			return
		}

		const triggerEventNames = trigger[trailingTriggerOn]

		if (eventName && triggerEventNames.includes(eventName)) {
			const isVisible = eventName === EVENT_NAME.HOVER_IN

			setState(draft => {
				draft.trailingVisible = isVisible
			})
		}
	}
}

export const handleListItemStateChange = (
	_event: StateEvent,
	setState: Updater<ListItemState>,
	{eventName, indexKey, onActive, onLoadEnd, type}: HandleListItemStateChangeOptions
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
				draft.pendingLoadEnd = indexKey
			}

			if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}

			return
		}

		const activeEventNames = [EVENT_NAME.PRESS_OUT, EVENT_NAME.LONG_PRESS] as readonly EventName[]

		if (activeEventNames.includes(eventName) && onActive) {
			draft.pendingActiveEvent = indexKey
		}
	})

export const triggerListItemTrailingActions =
	(
		indexKey: string,
		{
			afterAffordance,
			closeTrailing,
			onActiveAfterAffordance,
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
			onActiveAfterAffordance?.({activeKey: indexKey})
		}

		if (closeTrailing) {
			onClose()
		}
	}

export const confirmListItemAffordanceAction =
	({onActiveAfterAffordance, onClose}: ConfirmListItemAffordanceActionOptions) =>
	({indexKey, ...options}: ListAfterAffordancePressOutEvent) => {
		const {phase} = options

		if (phase === LIST_AFTER_AFFORDANCE_PHASE.DANGER) {
			onClose()

			return
		}

		onActiveAfterAffordance?.({callbackEvent: {...options, indexKey}})
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

export const maybeTriggerListItemClose = (indexKey: string, onClose?: (indexKey?: string) => void) => () =>
	onClose?.(indexKey)

export const updateListItemAfterAffordanceExpanded = (setState: Updater<ListItemState>) => (visible?: boolean) =>
	setState(draft => {
		draft.afterAffordanceExpanded = visible
	})

export const updateListItemTrailingVisible = (setState: Updater<ListItemState>) => (eventName: EventName) =>
	eventName === EVENT_NAME.HOVER_IN &&
	setState(draft => {
		draft.eventName = eventName
	})

export const animateListItemAffordanceVisible = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTiming) => {
	const entryAnimateSharedValueTo = animatedTiming(sharedValue, {
		duration: DURATION.SHORT_2,
		easing: EASING.STANDARD_DECELERATE
	})

	const exitAnimateSharedValueTo = animatedTiming(sharedValue, {
		duration: DURATION.SHORT_2,
		easing: EASING.STANDARD_ACCELERATE
	})

	return (visible?: boolean) =>
		typeof visible === 'boolean' && (visible ? entryAnimateSharedValueTo(1) : exitAnimateSharedValueTo(0))
}

export const animateListItemActiveState = (sharedValue: SharedValue<number>, animatedTiming: AnimatedTiming) => {
	const animateSharedValueTo = animatedTiming(sharedValue, {duration: DURATION.SHORT_2, easing: EASING.STANDARD})

	return (active?: boolean) => typeof active === 'boolean' && animateSharedValueTo(active ? 1 : 0)
}
