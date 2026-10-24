import type {Updater} from 'use-immer'

import {View, type MouseEvent, type PressableProps} from 'react-native'

import type {InteractionEvent} from '../../hooks'
import type {PopoverContentProps} from './Popover-content'
import type {
	EmitPopoverEvent,
	HandlePopoverContentAnimationFinishedOptions,
	HandlePopoverInteractionStateChangeOptions,
	PopoverState,
	HandlePopoverContextMenuOptions,
	UpdatePopoverVisibleOptions
} from './Popover.interface'

import {EVENT_NAME, TRIGGER_EVENT_NAMES, TRIGGER_ON} from '../../constants'
import {PORTAL_TYPE, portalEmitter} from '../../contexts'
import {ELEVATION_VALUE, type ElevationValue} from '../Elevation'
import {POPOVER_TYPE} from './Popover.enum'

export const updatePopoverVisible = (
	setState: Updater<PopoverState>,
	{onVisibleChange, type}: UpdatePopoverVisibleOptions
) => {
	const isMenuOrPicker = type && (type === POPOVER_TYPE.CONTEXT_MENU || type === POPOVER_TYPE.TEXT_INPUT_PICKER)

	return (visible?: boolean) => {
		if (typeof visible !== 'boolean') {
			return
		}

		setState(draft => {
			if (draft.visible !== visible && onVisibleChange) {
				draft.pendingVisibleEvent = visible
			}

			if (!isMenuOrPicker) {
				draft.visible = visible

				return
			}

			if (visible) {
				draft.visible = visible

				return
			}

			draft.elevation = ELEVATION_VALUE.LEVEL_0
		})
	}
}

export const handleElevationAnimationFinished =
	(setState: Updater<PopoverState>, onVisibleChange?: (visible: boolean) => void) => (visible?: boolean) => {
		if (!(typeof visible === 'boolean' && !visible)) {
			return
		}

		setState(draft => {
			draft.visible = false

			if (onVisibleChange) {
				draft.pendingVisibleEvent = false
			}
		})
	}

export const updatePopoverElevation = (setState: Updater<PopoverState>) => (elevation?: ElevationValue) =>
	setState(draft => {
		draft.elevation = elevation
	})

export const handlePopoverContextMenu =
	(setState: Updater<PopoverState>, {disabled, onVisibleChange}: HandlePopoverContextMenuOptions) =>
	(event: MouseEvent) => {
		if (disabled) {
			return
		}

		event.preventDefault()
		event.stopPropagation()

		const {x, y} = event.nativeEvent

		setState(draft => {
			draft.contextMenuLayout = {x, y}

			if (onVisibleChange) {
				draft.pendingVisibleRequestEvent = true
			}
		})
	}

export const handlePopoverStateChange = (
	_event: InteractionEvent,
	setState: Updater<PopoverState>,
	{
		childrenRef,
		containerRef,
		eventName,
		onEmitContent,
		onUnmountContent,
		onUnmountPressableLayout,
		onVisibleChange,
		triggerOn = TRIGGER_ON.HOVER,
		type
	}: HandlePopoverInteractionStateChangeOptions
) => {
	if (eventName === EVENT_NAME.LAYOUT || type === POPOVER_TYPE.CONTEXT_MENU) {
		return
	}

	const isTextInputPickerTriggerEvent = eventName === EVENT_NAME.FOCUS || eventName === EVENT_NAME.PRESS_OUT
	const isFocus = type === POPOVER_TYPE.TEXT_INPUT_PICKER && childrenRef.current && isTextInputPickerTriggerEvent

	if (isFocus) {
		childrenRef.current?.focus()
	}

	const triggerEventNames = TRIGGER_EVENT_NAMES[triggerOn]

	setState(draft => {
		const isUnmount = type === POPOVER_TYPE.TEXT_INPUT_PICKER && eventName === EVENT_NAME.BLUR && !draft.visible

		if (triggerEventNames.includes(eventName) && onVisibleChange) {
			draft.pendingVisibleRequestEvent = eventName === triggerEventNames[0]
		}

		if (!isUnmount) {
			return
		}

		if (onUnmountContent) {
			draft.pendingUnmountContentEvent = true
		}

		if (onUnmountPressableLayout) {
			draft.pendingUnmountPressableLayoutEvent = true
		}
	})

	if (type === POPOVER_TYPE.TEXT_INPUT_PICKER && isTextInputPickerTriggerEvent && onEmitContent) {
		containerRef.current?.measureInWindow((x, y, width, height) => {
			setState(draft => {
				if (draft.visible) {
					return
				}

				draft.pendingEmitContentEvent = {containerLayout: {height, width, x, y}, visible: false}
			})
		})
	}
}

export const emitPopoverContent =
	(id: string, {content, ...props}: PopoverContentProps) =>
	({containerLayout, visible}: EmitPopoverEvent) => {
		if (!(typeof visible === 'boolean' && content)) {
			return
		}

		portalEmitter.emit('portal', {
			id: `popoverContent--${id}`,
			props: {...props, containerLayout, content, visible},
			type: PORTAL_TYPE.POPOVER
		})
	}

export const unmountPopoverContent = (id: string) => () =>
	portalEmitter.emit('portal', {
		id: `popoverContent--${id}`,
		shouldUnmount: true,
		type: PORTAL_TYPE.POPOVER
	})

export const emitPopoverPressableLayout =
	(id: string, containerRef: React.RefObject<View | null>) => (props: PressableProps) =>
		containerRef.current?.measureInWindow((x, y, width, height) =>
			portalEmitter.emit('portal', {
				id: `popoverPressableLayout--${id}`,
				props: {...props, containerLayout: {height, width, x, y}, id},
				type: PORTAL_TYPE.PRESSABLE_LAYOUT
			})
		)

export const unmountPopoverPressableLayout = (id: string) => () =>
	portalEmitter.emit('portal', {
		id: `popoverPressableLayout--${id}`,
		shouldUnmount: true,
		type: PORTAL_TYPE.PRESSABLE_LAYOUT
	})

export const handlePopoverContentAnimationFinished =
	(
		setState: Updater<PopoverState>,
		{
			onAnimationFinished,
			onUnmountContent,
			onUnmountPressableLayout,
			type
		}: HandlePopoverContentAnimationFinishedOptions
	) =>
	(visible?: boolean) => {
		const isMenuOrPicker = type && (type === POPOVER_TYPE.CONTEXT_MENU || type === POPOVER_TYPE.TEXT_INPUT_PICKER)

		if (!isMenuOrPicker) {
			if (!visible) {
				onUnmountContent?.()
			}

			onAnimationFinished?.(visible)

			return
		}

		setState(draft => {
			if (visible) {
				draft.elevation = ELEVATION_VALUE.LEVEL_2
			}

			if (!visible && onUnmountContent) {
				draft.pendingUnmountContentEvent = true
			}

			if (!visible && onUnmountPressableLayout) {
				draft.pendingUnmountPressableLayoutEvent = true
			}

			if (onAnimationFinished) {
				draft.pendingAnimationFinishedEvent = visible
			}
		})
	}
