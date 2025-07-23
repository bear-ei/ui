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
	TooltipType
} from './Tooltip.interface'

export const updateTooltipVisibility =
	(onVisible?: (value?: boolean) => void) => (setState: Updater<TooltipState>) => (value?: boolean) => {
		const nextActiveEvent = () => onVisible?.(value)

		if (typeof value === 'boolean') {
			setState(draft => {
				if (draft.tooltipVisible === value) {
					return
				}

				draft.nextActiveEvent = nextActiveEvent
				draft.tooltipVisible = value
			})
		}
	}

export const handleTooltipContextMenu =
	(setState: Updater<TooltipState>) => (onTooltipVisible: (value?: boolean) => void) => (event: MouseEvent) => {
		event.preventDefault()
		const {pageX, pageY} = event.nativeEvent

		setState(draft => {
			draft.menuContainerLayout = {pageX, pageY}
		})

		onTooltipVisible?.(true)
	}

export const handleMaskPressOut = (onTooltipVisible: (value?: boolean) => void) => () => onTooltipVisible?.(false)
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
	(type?: TooltipType) =>
	({supporting, ...props}: TooltipSupportingProps) =>
	({visible, containerLayout}: EmitTooltipSupportingOptions) =>
		typeof visible === 'boolean' &&
		supporting &&
		emitter.emit('modal', {
			id: `tooltip__supporting--${type}`,
			props: {...props, containerLayout, visible, supporting, type},
			type: MODAL_TYPE.TOOL_TIP
		})

export const unmountTooltipSupporting = (type?: TooltipType) => () => {
	emitter.emit('modal', {
		id: `tooltip__supporting--${type}`,
		type: MODAL_TYPE.TOOL_TIP,
		unmount: true
	})
}
