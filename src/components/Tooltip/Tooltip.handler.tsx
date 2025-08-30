import type {MouseEvent} from 'react-native'
import type {Updater} from 'use-immer'
import {emitter, MODAL_TYPE} from '../../contexts'
import type {StateEvent} from '../../hooks'
import {EVENT_NAME, TRIGGER_EVENT, type EventName, type TriggerEvent} from '../Common'
import type {TooltipSupportingProps} from './Tooltip-supporting'
import {TOOLTIP_TYPE} from './Tooltip.enum'
import type {
	EmitTooltipSupportingOptions,
	HandleTooltipStateEventChangeOptions,
	TooltipState,
	UpdateTooltipContextMenuLayoutOptions
} from './Tooltip.interface'

export const updateTooltipVisibility =
	(onVisible?: (value?: boolean) => void) => (setState: Updater<TooltipState>) => (value?: boolean) => {
		const nextVisibilityEvent = () => onVisible?.(value)

		if (typeof value === 'boolean') {
			setState(draft => {
				draft.nextVisibilityEvent = nextVisibilityEvent
				draft.tooltipVisible = value
			})
		}
	}

export const updateTooltipContextMenuLayout =
	(setState: Updater<TooltipState>) =>
	({disabled, onVisible}: UpdateTooltipContextMenuLayoutOptions) =>
	(event: MouseEvent) => {
		if (disabled) {
			return
		}

		event.preventDefault()
		const nextVisibilityEvent = () => onVisible?.(true)
		const {x, y} = event.nativeEvent

		setState(draft => {
			draft.menuContainerLayout = {x, y}
			draft.nextVisibilityEvent = nextVisibilityEvent
		})
	}

export const handleTooltipStateChange = ({
	eventName,
	onVisible,
	triggerEvent = TRIGGER_EVENT.HOVER,
	type
}: HandleTooltipStateEventChangeOptions) => {
	const trigger = {
		[TRIGGER_EVENT.FOCUS]: [EVENT_NAME.FOCUS, EVENT_NAME.BLUR],
		[TRIGGER_EVENT.HOVER]: [EVENT_NAME.HOVER_IN, EVENT_NAME.HOVER_OUT],
		[TRIGGER_EVENT.PRESS]: [EVENT_NAME.PRESS_IN]
	} as Record<TriggerEvent, readonly EventName[]>

	return (_event: StateEvent) => {
		if (eventName === EVENT_NAME.LAYOUT || type === TOOLTIP_TYPE.MENU) {
			return
		}

		const triggerEventNames = trigger[triggerEvent]

		if (eventName && triggerEventNames?.includes(eventName)) {
			onVisible(eventName === triggerEventNames[0])
		}
	}
}

export const emitTooltipSupporting =
	(id: string) =>
	({supporting, ...props}: TooltipSupportingProps) =>
	({visible, containerLayout}: EmitTooltipSupportingOptions) =>
		typeof visible === 'boolean' &&
		supporting &&
		emitter.emit('modal', {
			id: `tooltip__supporting--${id}`,
			props: {...props, containerLayout, visible, supporting},
			type: MODAL_TYPE.TOOL_TIP
		})

export const unmountTooltipSupporting = (id?: string) => () => {
	emitter.emit('modal', {
		id: `tooltip__supporting--${id}`,
		type: MODAL_TYPE.TOOL_TIP,
		unmount: true
	})
}

export const clearTooltipEvent = (setState: Updater<TooltipState>) => (eventName: 'visibility') => {
	const event = {
		visibility: () =>
			setState(draft => {
				draft.nextVisibilityEvent = undefined
			})
	}

	event[eventName]?.()
}
