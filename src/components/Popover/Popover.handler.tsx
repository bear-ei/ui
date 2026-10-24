import type {Updater} from 'use-immer'

import {View, type MouseEvent, type PressableProps} from 'react-native'

import type {StateEvent} from '../../hooks'
import type {PopoverContentProps} from './Popover-content'
import type {
	EmitPopoverEvent,
	HandlePopoverContentAnimationFinishedOptions,
	HandlePopoverStateEventChangeOptions,
	PopoverState,
	PopoverType,
	UpdatePopoverContextMenuLayoutOptions,
	UpdatePopoverVisibleOptions
} from './Popover.interface'

import {EVENT_NAME, TRIGGER_ON, type EventName, type TriggerOn} from '../../constants'
import {emitter, PORTAL_TYPE} from '../../contexts'
import {ELEVATION_VALUE, type ElevationValue} from '../Elevation'
import {POPOVER_TYPE} from './Popover.enum'

export const updatePopoverVisible = (
	setState: Updater<PopoverState>,
	{onVisible, type}: UpdatePopoverVisibleOptions
) => {
	const isMenuOrPicker =
		type && ([POPOVER_TYPE.CONTEXT_MENU, POPOVER_TYPE.TEXT_INPUT_PICKER] as readonly PopoverType[]).includes(type)

	return (visible?: boolean) => {
		if (typeof visible !== 'boolean') {
			return
		}

		setState(draft => {
			if (draft.visible !== visible && onVisible) {
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
	(setState: Updater<PopoverState>, onVisible?: (visible: boolean) => void) => (visible?: boolean) => {
		if (!(typeof visible === 'boolean' && !visible)) {
			return
		}

		setState(draft => {
			draft.visible = false

			if (onVisible) {
				draft.pendingVisibleEvent = false
			}
		})
	}

export const updatePopoverElevation = (setState: Updater<PopoverState>) => (elevation?: ElevationValue) =>
	setState(draft => {
		draft.elevation = elevation
	})

export const updatePopoverContextMenuLayout =
	(setState: Updater<PopoverState>, {disabled, onVisible}: UpdatePopoverContextMenuLayoutOptions) =>
	(event: MouseEvent) => {
		if (disabled) {
			return
		}

		event.preventDefault()
		event.stopPropagation()

		const {x, y} = event.nativeEvent

		setState(draft => {
			draft.contextMenuLayout = {x, y}

			if (onVisible) {
				draft.pendingVisibleChangeEvent = true
			}
		})
	}

const TRIGGER = {
	[TRIGGER_ON.FOCUS]: [EVENT_NAME.FOCUS, EVENT_NAME.BLUR],
	[TRIGGER_ON.HOVER]: [EVENT_NAME.HOVER_IN, EVENT_NAME.HOVER_OUT],
	[TRIGGER_ON.NONE]: [EVENT_NAME.NONE],
	[TRIGGER_ON.PRESS]: [EVENT_NAME.PRESS_IN]
} as Record<TriggerOn, readonly EventName[]>

export const handlePopoverStateChange = (
	_event: StateEvent,
	setState: Updater<PopoverState>,
	{
		childrenRef,
		containerRef,
		eventName,
		onEmitContent,
		onUnmountContent,
		onUnmountPressableLayout,
		onVisible,
		triggerEvent = TRIGGER_ON.HOVER,
		type
	}: HandlePopoverStateEventChangeOptions
) => {
	if (eventName === EVENT_NAME.LAYOUT || type === POPOVER_TYPE.CONTEXT_MENU) {
		return
	}

	const isTextInputPickerTriggerEvent = ([EVENT_NAME.FOCUS, EVENT_NAME.PRESS_OUT] as readonly EventName[]).includes(
		eventName
	)

	const isFocus = type === POPOVER_TYPE.TEXT_INPUT_PICKER && childrenRef.current && isTextInputPickerTriggerEvent

	if (isFocus) {
		childrenRef.current?.focus()
	}

	const triggerEventNames = TRIGGER[triggerEvent]

	setState(draft => {
		const isUnmount = type === POPOVER_TYPE.TEXT_INPUT_PICKER && eventName === EVENT_NAME.BLUR && !draft.visible

		if (triggerEventNames.includes(eventName) && onVisible) {
			draft.pendingVisibleChangeEvent = eventName === triggerEventNames[0]
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

		emitter.emit('modal', {
			id: `popoverContent--${id}`,
			props: {...props, containerLayout, content, visible},
			type: PORTAL_TYPE.POPOVER
		})
	}

export const unmountPopoverContent = (id: string) => () =>
	emitter.emit('modal', {
		id: `popoverContent--${id}`,
		type: PORTAL_TYPE.POPOVER,
		unmount: true
	})

export const emitPopoverPressableLayout =
	(id: string, containerRef: React.RefObject<View | null>) => (props: PressableProps) =>
		containerRef.current?.measureInWindow((x, y, width, height) =>
			emitter.emit('modal', {
				id: `popoverPressableLayout--${id}`,
				props: {...props, containerLayout: {height, width, x, y}, id},
				type: PORTAL_TYPE.PRESSABLE_LAYOUT
			})
		)

export const unmountPopoverPressableLayout = (id: string) => () =>
	emitter.emit('modal', {
		id: `popoverPressableLayout--${id}`,
		type: PORTAL_TYPE.PRESSABLE_LAYOUT,
		unmount: true
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
		const isMenuOrPicker =
			type &&
			([POPOVER_TYPE.CONTEXT_MENU, POPOVER_TYPE.TEXT_INPUT_PICKER] as readonly PopoverType[]).includes(type)

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
