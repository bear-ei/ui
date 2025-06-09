import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimateSharedValueTo, StateEvent} from '../../../hooks'
import {COMPONENT_STATUS, EVENT_NAME, STATE, type EventName} from '../../Common'
import type {ListItemAfterAffordancePressOutOptions} from '../List-after-affordance'
import {ACTIVE_TRIGGER_EVEN_NAME, LIST_TYPE} from '../List.enum'
import type {ListSelectType} from '../List.interface'
import type {
	ConfirmListItemAffordanceActionOptions,
	HandleListItemStateChangeOptions,
	ListItemProps,
	ListItemState,
	TriggerListItemTrailingActionsOptions
} from './List-item.interface'

export const compareListItemProps = (prevProps: ListItemProps) => {
	const {
		activeKey: prevActiveKey,
		activeKeys: prevActiveKeys,
		afterAffordanceActiveKey: prevAfterAffordanceActiveKey,
		disabled: isPrevDisabled,
		extraData: prevExtraData,
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
			disabled: isNextDisabled,
			extraData: nextExtraData,
			focusedIndex: nextFocusedIndex,
			indexKey: nextIndexKey,
			itemIndex: nextItemIndex,
			skeletonDuration: nextSkeletonMinDuration
		} = nextProps

		const isActiveKeyChange =
			prevActiveKey !== nextActiveKey &&
			(nextActiveKey === nextIndexKey || prevActiveKey === prevIndexKey)

		const isNextActive = nextIndexKey && nextActiveKeys?.includes(nextIndexKey)
		const isPrevActive = prevIndexKey && prevActiveKeys?.includes(prevIndexKey)
		const isActiveKeysChange =
			nextActiveKeys?.join() !== prevActiveKeys?.join() &&
			((isNextActive && !isPrevActive) || (isPrevActive && !isNextActive))

		const isAfterAffordanceActiveChange =
			prevAfterAffordanceActiveKey !== nextAfterAffordanceActiveKey &&
			(nextAfterAffordanceActiveKey === nextIndexKey || prevAfterAffordanceActiveKey === prevIndexKey)

		const isFocusedIndexChange =
			nextFocusedIndex !== prevFocusedIndex &&
			(nextFocusedIndex === nextItemIndex || prevFocusedIndex === prevItemIndex)

		return ![
			isActiveKeyChange,
			isActiveKeysChange,
			isAfterAffordanceActiveChange,
			isFocusedIndexChange,
			isPrevDisabled !== isNextDisabled,
			prevExtraData?.join() !== nextExtraData?.join(),
			prevSkeletonMinDuration !== nextSkeletonMinDuration
		].some(Boolean)
	}
}

const triggerListItemActive =
	(selectType?: ListSelectType) => (onActive?: (activeKey?: string) => void) => (activeKey?: string) =>
		selectType && activeKey && onActive?.(activeKey)

const triggerListItemLoadEnd = (onLoadEnd?: (indexKey?: string) => void) => (indexKey?: string) => onLoadEnd?.(indexKey)
export const handleListItemStateChange =
	({
		activeTriggerEvenName,
		eventName,
		indexKey,
		onActive,
		onLoadEnd,
		selectType,
		state,
		trailingTriggerEvenName,
		type
	}: HandleListItemStateChangeOptions) =>
	(setState: Updater<ListItemState>) =>
	(_event: StateEvent) => {
		const nextEvent = {
			[EVENT_NAME.LAYOUT]: () => triggerListItemLoadEnd?.(onLoadEnd)(indexKey),
			[EVENT_NAME.PRESS_IN]: () => triggerListItemActive(selectType)(onActive)(indexKey),
			[EVENT_NAME.PRESS_OUT]: () => triggerListItemActive(selectType)(onActive)(indexKey)
		} as Record<EventName, () => void>

		setState(draft => {
			if (eventName === EVENT_NAME.LAYOUT && draft.status !== COMPONENT_STATUS.IDLE) {
				return
			}

			const prevEventName = draft.eventName
			const eventNames = [EVENT_NAME.HOVER_IN, EVENT_NAME.HOVER_OUT] as const
			const isMenuFocus =
				eventName === EVENT_NAME.BLUR &&
				eventNames.includes(eventName as (typeof eventNames)[number]) &&
				prevEventName === EVENT_NAME.FOCUS &&
				type === LIST_TYPE.MENU

			if (isMenuFocus) {
				return
			}

			if (eventName && draft.status === COMPONENT_STATUS.SUCCEEDED) {
				draft.eventName = eventName
			}

			if (trailingTriggerEvenName) {
				const states = [
					STATE.FOCUSED,
					STATE.HOVERED,
					STATE.LONG_PRESS_IN,
					STATE.PRESS_IN
				] as const

				const isVisible =
					trailingTriggerEvenName === EVENT_NAME.HOVER_IN ?
						state && states.includes(state as (typeof states)[number])
					:	trailingTriggerEvenName === state

				draft.trailingVisible = isVisible
			}

			switch (eventName) {
				case EVENT_NAME.LAYOUT:
					draft.nextLayoutEvent = nextEvent[eventName]
					draft.status = COMPONENT_STATUS.SUCCEEDED
					break

				case EVENT_NAME.PRESS_IN:
					if (activeTriggerEvenName === ACTIVE_TRIGGER_EVEN_NAME.PRESS_IN) {
						draft.nextPressInEvent = nextEvent[eventName]
					}

					break

				case EVENT_NAME.PRESS_OUT:
					if (activeTriggerEvenName === ACTIVE_TRIGGER_EVEN_NAME.PRESS_OUT) {
						draft.nextPressOutEvent = nextEvent[eventName]
					}

					break
				default:
					break
			}
		})
	}

export const triggerListItemTrailingActions =
	({
		afterAffordance,
		closeTrailing,
		onActiveAfterAffordance,
		onItemClose
	}: TriggerListItemTrailingActionsOptions) =>
	(indexKey?: string) =>
	() => {
		const nextEvent = {
			afterAffordance: () => onActiveAfterAffordance?.({activeKey: indexKey}),
			closeTrailing: () => onItemClose(true)
		}

		if (afterAffordance) {
			nextEvent.afterAffordance()
		}

		if (closeTrailing) {
			nextEvent.closeTrailing()
		}
	}

export const confirmListItemAffordanceAction =
	({onActiveAfterAffordance, onItemClose, onConfirm}: ConfirmListItemAffordanceActionOptions) =>
	({indexKey, ...options}: ListItemAfterAffordancePressOutOptions) => {
		const {doubleConfirmed: isDoubleConfirmed} = options

		if (isDoubleConfirmed) {
			onItemClose(isDoubleConfirmed)

			return
		}

		onActiveAfterAffordance?.({callback: () => onConfirm?.({...options, indexKey})})
	}

/**
 * When using the component Text-field-picker, you only need to change the focus style. Do not get the real focus.
 * Otherwise the Text-field-picker will lose focus.
 */
export const updateListItemFocusState =
	(itemIndex?: number) => (setState: Updater<ListItemState>) => (focusedIndex?: number) =>
		typeof focusedIndex === 'number' &&
		setState(draft => {
			draft.eventName = itemIndex === focusedIndex ? EVENT_NAME.FOCUS : EVENT_NAME.BLUR
		})

export const maybeTriggerListItemClose =
	(onClose?: (indexKey?: string) => void) => (indexKey?: string) => (close?: boolean) => {
		if (!(close && indexKey)) {
			return
		}

		onClose?.(indexKey)
	}

export const updateListItemAfterAffordanceExpanded = (setState: Updater<ListItemState>) => (visible?: boolean) =>
	setState(draft => {
		if (draft.afterAffordanceExpanded === visible) {
			return
		}

		draft.afterAffordanceExpanded = visible
	})

export const animateListItemAffordanceVisibility =
	(animateSharedValueTo: AnimateSharedValueTo) =>
	(contentLeftSharedValue: SharedValue<number>) =>
	(visible?: boolean) =>
		animateSharedValueTo(contentLeftSharedValue)(visible ? 1 : 0)

export const animateListItemActiveState =
	(animateSharedValueTo: AnimateSharedValueTo) =>
	(headlineTextSharedValue: SharedValue<number>) =>
	(active?: boolean) =>
		animateSharedValueTo(headlineTextSharedValue)(active ? 1 : 0)
