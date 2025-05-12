import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimatedTiming, StateEvent} from '../../../hooks'
import {COMPONENT_STATUS, EVENT_NAME, STATE, type EventName} from '../../Common'
import {ACTIVE_TRIGGER_EVEN_NAME, LIST_TYPE} from '../List.enum'
import type {ListSelectType} from '../List.interface'
import type {
	HandleListItemAfterAffordanceVisibleAnimatedTimingOptions,
	HandleListItemConfirmOptions,
	HandleListItemStateEventChangeOptions,
	HandleListItemTrailingPressOutOptions,
	ListItemProps,
	ListItemState
} from './List-item.interface'

export const handleListItemPropsEqual = (prevProps: ListItemProps) => {
	const {
		activeKey: prevActiveKey,
		activeKeys: prevActiveKeys,
		afterAffordanceActiveKey: prevAfterAffordanceActiveKey,
		disabled: isPrevDisabled,
		extraData: prevExtraData,
		focusedIndex: prevFocusedIndex,
		itemIndex: prevItemIndex,
		indexKey: prevIndexKey,
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
			itemIndex: nextItemIndex,
			indexKey: nextIndexKey,
			skeletonDuration: nextSkeletonMinDuration
		} = nextProps

		const isActiveKeyChange =
			prevActiveKey !== nextActiveKey &&
			(nextActiveKey === nextIndexKey || prevActiveKey === prevIndexKey)

		const isNextActive = nextActiveKeys?.includes(nextIndexKey)
		const isPrevActive = prevActiveKeys?.includes(prevIndexKey)
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

const handleListItemActive =
	(selectType?: ListSelectType) => (onActive?: (activeKey?: string) => void) => (activeKey: string) =>
		selectType && onActive?.(activeKey)

const handleListItemLoadEnd = (onLoadEnd?: (indexKey?: string) => void) => (indexKey?: string) => onLoadEnd?.(indexKey)
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
	}: HandleListItemStateEventChangeOptions) =>
	(setState: Updater<ListItemState>) =>
	(_event: StateEvent) => {
		const nextEvent = {
			[EVENT_NAME.LAYOUT]: () => handleListItemLoadEnd?.(onLoadEnd)(indexKey),
			[EVENT_NAME.PRESS_IN]: () => handleListItemActive(selectType)(onActive)(indexKey),
			[EVENT_NAME.PRESS_OUT]: () => handleListItemActive(selectType)(onActive)(indexKey)
		} as Record<EventName, () => void>

		setState(draft => {
			if (eventName === EVENT_NAME.LAYOUT && draft.status !== COMPONENT_STATUS.IDLE) {
				return
			}

			const prevEventName = draft.eventName
			const eventNames = [EVENT_NAME.HOVER_IN, EVENT_NAME.HOVER_OUT] as const
			const isMenuFocus =
				eventName === EVENT_NAME.BLUR &&
				prevEventName === EVENT_NAME.FOCUS &&
				type === LIST_TYPE.MENU &&
				eventNames.includes(eventName as (typeof eventNames)[number])

			if (isMenuFocus) {
				return
			}

			if (eventName && draft.status === COMPONENT_STATUS.SUCCEEDED) {
				draft.eventName = eventName
				draft.listItemState = state
			}

			if (trailingTriggerEvenName) {
				const states = [
					STATE.HOVERED,
					STATE.LONG_PRESS_IN,
					STATE.PRESS_IN,
					STATE.FOCUSED
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

export const handleListItemTrailingPressOut =
	({
		afterAffordance,
		closeTrailing,
		onActiveAfterAffordance,
		onListItemClose
	}: HandleListItemTrailingPressOutOptions) =>
	(indexKey: string) =>
	() => {
		const nextEvent = {
			afterAffordance: () => onActiveAfterAffordance?.({activeKey: indexKey}),
			closeTrailing: () => onListItemClose(true)
		}

		if (afterAffordance) {
			nextEvent.afterAffordance()
		}

		if (closeTrailing) {
			nextEvent.closeTrailing()
		}
	}

export const handleListItemTrailingPressIn = (setState: Updater<ListItemState>) => () => {
	setState(draft => {
		draft.affordanceVisible = true
	})
}

export const handleItemListAfterAffordanceVisibleFinished = (setState: Updater<ListItemState>) => (visible?: boolean) =>
	setState(draft => {
		draft.afterAffordanceClosed = !visible
	})

export const handleItemListAffordanceShow = (setState: Updater<ListItemState>) => () =>
	setState(draft => {
		draft.affordanceVisible = true
	})

export const handleListItemConfirm =
	({options, onConfirm, onActiveAfterAffordance, onListItemClose}: HandleListItemConfirmOptions) =>
	(indexKey?: string) => {
		const {doubleConfirmed: isDoubleConfirmed} = options

		if (isDoubleConfirmed) {
			onListItemClose(isDoubleConfirmed)

			return
		}

		onActiveAfterAffordance?.({callback: () => onConfirm?.({...options, indexKey})})
	}

/**
 * When using the component Text-field-picker, you only need to change the focus style. Do not get the real focus.
 * Otherwise the Text-field-picker will lose focus.
 */
export const handleListItemFocus =
	(itemIndex?: number) => (setState: Updater<ListItemState>) => (focusedIndex?: number) =>
		typeof focusedIndex === 'number' &&
		setState(draft => {
			draft.eventName = itemIndex === focusedIndex ? EVENT_NAME.FOCUS : EVENT_NAME.BLUR
		})

export const handleListItemClose =
	(onClose?: (indexKey?: string) => void) => (indexKey: string) => (close?: boolean) => {
		if (!close) {
			return
		}

		onClose?.(indexKey)
	}

/**
 * TODO:
 */
// export const handleListItemPanResponderRelease =
// 	({onActiveAfterAffordance, disabled}: HandleListItemPanResponderReleaseOptions) =>
// 	(indexKey: string) =>
// 	(_event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
// 		if (disabled) {
// 			return
// 		}

// 		if (gestureState.dx < -50) {
// 			onActiveAfterAffordance?.({activeKey: indexKey})
// 		}

// 		if (gestureState.dx > 50) {
// 			onActiveAfterAffordance?.()
// 		}
// 	}

export const handleListItemAfterAffordanceVisibleAnimatedTiming =
	({
		animatedTiming,
		onListItemAfterAffordanceVisibleFinished
	}: HandleListItemAfterAffordanceVisibleAnimatedTimingOptions) =>
	(contentLeftSharedValue: SharedValue<number>) =>
	(visible?: boolean) =>
		animatedTiming({
			callback: (finished?: boolean) =>
				finished && onListItemAfterAffordanceVisibleFinished?.(visible)
		})(contentLeftSharedValue)(visible ? 1 : 0)

export const handleListItemActiveAnimatedTiming =
	(animatedTiming: AnimatedTiming) => (headlineTextSharedValue: SharedValue<number>) => (active?: boolean) =>
		animatedTiming()(headlineTextSharedValue)(active ? 1 : 0)
