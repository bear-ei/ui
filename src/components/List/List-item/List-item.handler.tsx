import type {GestureResponderEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimateSharedValueTo, StateEvent} from '../../../hooks'
import {COMPONENT_STATUS, EVENT_NAME, TRIGGER_EVENT, type EventName, type TriggerEvent} from '../../Common'
import type {PressableType} from '../../Touchable'
import type {ListItemAfterAffordancePressOutOptions} from '../List-after-affordance'
import {LIST_TYPE} from '../List.enum'
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
		dependencies: prevDependencies,
		disabled: isPrevDisabled,
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

		const isDependenciesChanged =
			prevDependencies?.length !== nextDependencies?.length ||
			prevDependencies?.some((dependence, index) => dependence !== nextDependencies?.[index])

		return ![
			isActiveKeyChange,
			isActiveKeysChange,
			isAfterAffordanceActiveChange,
			isFocusedIndexChange,
			isPrevDisabled !== isNextDisabled,
			isDependenciesChanged,
			prevSkeletonMinDuration !== nextSkeletonMinDuration
		].some(Boolean)
	}
}

export const updateListItemActive =
	(selectType?: ListSelectType) => (onActive?: (indexKey?: string) => void) => (indexKey?: string) =>
		selectType && indexKey && onActive?.(indexKey)

const triggerListItemLoadEnd = (onLoadEnd?: (indexKey?: string) => void) => (indexKey?: string) => onLoadEnd?.(indexKey)
export const handleListItemStateChange =
	({eventName, indexKey, onActive, onLoadEnd, trailingTriggerEvent, type}: HandleListItemStateChangeOptions) =>
	(setState: Updater<ListItemState>) =>
	(_event: StateEvent) => {
		const nextEvent = {
			[EVENT_NAME.LAYOUT]: () => triggerListItemLoadEnd?.(onLoadEnd)(indexKey),
			[EVENT_NAME.PRESS_OUT]: () => onActive?.(indexKey)
		} as Record<EventName, () => void>

		setState(draft => {
			if (eventName === EVENT_NAME.LAYOUT && draft.status !== COMPONENT_STATUS.IDLE) {
				return
			}

			const prevEventName = draft.eventName
			const eventNames = [EVENT_NAME.HOVER_IN, EVENT_NAME.HOVER_OUT] as readonly EventName[]
			const isMenuFocus =
				eventName === EVENT_NAME.BLUR &&
				eventNames.includes(eventName) &&
				prevEventName === EVENT_NAME.FOCUS &&
				type === LIST_TYPE.MENU

			if (isMenuFocus) {
				return
			}

			if (eventName && draft.status === COMPONENT_STATUS.SUCCEEDED) {
				draft.eventName = eventName
			}

			if (trailingTriggerEvent) {
				const trigger = {
					[TRIGGER_EVENT.FOCUS]: [EVENT_NAME.FOCUS, EVENT_NAME.BLUR],
					[TRIGGER_EVENT.HOVER]: [EVENT_NAME.HOVER_IN, EVENT_NAME.HOVER_OUT],
					[TRIGGER_EVENT.PRESS]: [EVENT_NAME.PRESS_IN]
				} as Record<TriggerEvent, readonly EventName[]>

				const triggerEventNames = trigger[trailingTriggerEvent]

				if (eventName && triggerEventNames?.includes(eventName)) {
					draft.trailingVisible = eventName === EVENT_NAME.HOVER_IN
				}
			}

			if (eventName === EVENT_NAME.LAYOUT) {
				draft.nextLayoutEvent = nextEvent[eventName]

				if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
					draft.status = COMPONENT_STATUS.SUCCEEDED
				}

				return
			}

			if (eventName && nextEvent[eventName]) {
				draft.nextPressOutEvent = nextEvent[eventName]
			}
		})
	}

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
			onPressOut?.(event)

			return
		}

		const nextEvent = {
			afterAffordance: () => onActiveAfterAffordance?.({activeKey: indexKey}),
			closeTrailing: () => onClose()
		}

		if (afterAffordance) {
			nextEvent.afterAffordance()
		}

		if (closeTrailing) {
			nextEvent.closeTrailing()
		}
	}

export const confirmListItemAffordanceAction =
	({onActiveAfterAffordance, onClose, onConfirm}: ConfirmListItemAffordanceActionOptions) =>
	({indexKey, ...options}: ListItemAfterAffordancePressOutOptions) => {
		const {doubleConfirmed: isDoubleConfirmed} = options

		if (isDoubleConfirmed) {
			onClose()

			return
		}

		onActiveAfterAffordance?.({callback: () => onConfirm?.({...options, indexKey})})
	}

/**
 * When using the component Text-field-picker, you only need to change the focus style. Do not get the real focus.
 * Otherwise the Text-field-picker will lose focus.
 */
export const updateListItemFocusState =
	(itemIndex?: number) => (pressableRef: React.RefObject<PressableType>) => (focusedIndex?: number) =>
		typeof focusedIndex === 'number' && itemIndex === focusedIndex && pressableRef.current?.focus()

export const maybeTriggerListItemClose = (onClose?: (indexKey?: string) => void) => (indexKey?: string) => () => {
	if (!indexKey) {
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
	(contentTransformXSharedValue: SharedValue<number>) =>
	(visible?: boolean) =>
		animateSharedValueTo({sharedValue: contentTransformXSharedValue})(visible ? 1 : 0)

export const animateListItemActiveState =
	(animateSharedValueTo: AnimateSharedValueTo) =>
	(headlineTextSharedValue: SharedValue<number>) =>
	(active?: boolean) =>
		animateSharedValueTo({sharedValue: headlineTextSharedValue})(active ? 1 : 0)

export const updateListItemTrailingVisibility = (setState: Updater<ListItemState>) => (visible: boolean) =>
	setState(draft => {
		draft.trailingVisible = visible
	})
