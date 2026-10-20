import type {GestureResponderEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import {COMPONENT_STATUS, EVENT_NAME, type EventName, TRIGGER_ON, type TriggerOn} from '../../../constants'
import type {AnimatedTimingOptions, AnimateSharedValueTo, StateEvent} from '../../../hooks'
import {LIST_TYPE} from '../List.enum'
import type {ListSelectType} from '../List.interface'
import type {
	ConfirmListItemAffordanceActionOptions,
	HandleListItemStateChangeOptions,
	ListItemProps,
	ListItemState,
	TriggerListItemTrailingActionsOptions
} from './List-item.interface'
import {DURATION, EASING} from '../../../theme'
import type {ListAfterAffordancePressOutEvent} from '../List-after-affordance'

export const compareListItemProps = (prevProps: ListItemProps) => {
	const {
		activeKey: prevActiveKey,
		activeKeys: prevActiveKeys,
		afterAffordanceActiveKey: prevAfterAffordanceActiveKey,
		dependencies: prevDependencies,
		disabled: isPrevDisabled,
		dragging: isPrevDragging,
		focusedIndex: prevFocusedIndex,
		indexKey: prevIndexKey,
		itemIndex: prevItemIndex,
		skeletonDuration: prevSkeletonMinDuration
	} = prevProps

	return (nextProps: ListItemProps) => {
		const {
			activeKey: nextActiveKey,
			activeKeys: nextActiveKeys,
			afterAffordanceActiveKey: nextAfterAffordanceActiveKey,
			dependencies: nextDependencies,
			disabled: isNextDisabled,
			dragging: isNextDragging,
			focusedIndex: nextFocusedIndex,
			indexKey: nextIndexKey,
			itemIndex: nextItemIndex,
			skeletonDuration: nextSkeletonMinDuration
		} = nextProps

		const isActiveKeyChange =
			prevActiveKey !== nextActiveKey && (nextActiveKey === nextIndexKey || prevActiveKey === prevIndexKey)

		const isNextActive = nextIndexKey && nextActiveKeys?.includes(nextIndexKey)
		const isPrevActive = prevIndexKey && prevActiveKeys?.includes(prevIndexKey)
		const isAreArraysEqual =
			nextActiveKeys?.length === prevActiveKeys?.length &&
			nextActiveKeys?.every((key, index) => key === prevActiveKeys?.[index])

		const isActiveKeysChange =
			!isAreArraysEqual && ((isNextActive && !isPrevActive) || (isPrevActive && !isNextActive))

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
			isPrevDisabled !== isNextDisabled,
			isPrevDragging !== isNextDragging,
			prevSkeletonMinDuration !== nextSkeletonMinDuration
		].some(Boolean)
	}
}

export const updateListItemActive =
	(selectType?: ListSelectType) => (onActive?: (indexKey?: string) => void) => (indexKey?: string) =>
		selectType && indexKey && onActive?.(indexKey)

export const updateListItemTrailing =
	(selectType?: ListSelectType) => (onActive?: (indexKey?: string) => void) => (indexKey?: string) =>
		selectType && indexKey && onActive?.(indexKey)

export const handleTrailingTriggerEvent = (trailingTriggerOn?: TriggerOn) => {
	const trigger = {
		[TRIGGER_ON.FOCUS]: [EVENT_NAME.FOCUS, EVENT_NAME.BLUR],
		[TRIGGER_ON.HOVER]: [EVENT_NAME.HOVER_IN, EVENT_NAME.HOVER_OUT],
		[TRIGGER_ON.NONE]: [EVENT_NAME.NONE],
		[TRIGGER_ON.PRESS]: [EVENT_NAME.PRESS_IN]
	} as Record<TriggerOn, readonly EventName[]>

	return (setState: Updater<ListItemState>) => (eventName?: EventName) => {
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

export const handleListItemStateChange =
	({eventName, indexKey, onActive, onLoadEnd, type}: HandleListItemStateChangeOptions) =>
	(setState: Updater<ListItemState>) =>
	(_event: StateEvent) =>
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
	({
		afterAffordance,
		closeTrailing,
		onActiveAfterAffordance,
		onClose,
		onPressOut
	}: TriggerListItemTrailingActionsOptions) =>
	(indexKey?: string) =>
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
		const {doubleConfirmed: isDoubleConfirmed} = options

		if (isDoubleConfirmed) {
			onClose()

			return
		}

		onActiveAfterAffordance?.({callbackEvent: {...options, indexKey}})
	}

export const updateListItemFocusState =
	(setState: Updater<ListItemState>) => (itemIndex?: number) => (focusedIndex?: number) =>
		typeof focusedIndex === 'number' &&
		setState(draft => {
			draft.eventName =
				itemIndex === focusedIndex ? EVENT_NAME.FOCUS
				: draft.eventName === EVENT_NAME.FOCUS ? EVENT_NAME.BLUR
				: draft.eventName
		})

export const maybeTriggerListItemClose = (onClose?: (indexKey?: string) => void) => (indexKey?: string) => () => {
	if (!indexKey) {
		return
	}

	onClose?.(indexKey)
}

export const updateListItemAfterAffordanceExpanded = (setState: Updater<ListItemState>) => (visible?: boolean) =>
	setState(draft => {
		draft.afterAffordanceExpanded = visible
	})

export const updateListItemTrailingVisible = (setState: Updater<ListItemState>) => (eventName: EventName) =>
	eventName === EVENT_NAME.HOVER_IN &&
	setState(draft => {
		draft.eventName = eventName
	})

export const animateListItemAffordanceVisible =
	(animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) =>
	(contentTransformXSharedValue: SharedValue<number>) => {
		const entryAnimateSharedValueTo = animatedTiming({
			duration: DURATION.SHORT_2,
			easing: EASING.STANDARD_DECELERATE
		})({
			sharedValue: contentTransformXSharedValue
		})

		const exitAnimateSharedValueTo = animatedTiming({
			duration: DURATION.SHORT_2,
			easing: EASING.STANDARD_ACCELERATE
		})({
			sharedValue: contentTransformXSharedValue
		})

		return (visible?: boolean) =>
			typeof visible === 'boolean' && (visible ? entryAnimateSharedValueTo(1) : exitAnimateSharedValueTo(0))
	}

export const animateListItemActiveState =
	(animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo) =>
	(headlineTextSharedValue: SharedValue<number>) => {
		const animateSharedValueTo = animatedTiming({easing: EASING.STANDARD, duration: DURATION.SHORT_2})({
			sharedValue: headlineTextSharedValue
		})

		return (active?: boolean) => typeof active === 'boolean' && animateSharedValueTo(active ? 1 : 0)
	}
