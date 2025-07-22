import type {Updater} from 'use-immer'
import {emitter, MODAL_TYPE} from '../../contexts'
import type {StateEvent} from '../../hooks'
import {EVENT_NAME, TRIGGER_EVENT} from '../Common'
import type {TooltipSupportingProps} from './Tooltip-supporting'
import type {HandleTooltipStateEventChangeOptions, TooltipState} from './Tooltip.interface'

export const updateTooltipVisibility =
	(onVisible?: (value?: boolean) => void) => (setState: Updater<TooltipState>) => (value?: boolean) => {
		const nextActiveEvent = () => onVisible?.(value)

		if (typeof value === 'boolean') {
			setState(draft => {
				draft.nextActiveEvent = nextActiveEvent
				draft.tooltipVisible = value
			})
		}
	}

export const handleTooltipStateChange = ({
	eventName,
	onTooltipVisible,
	triggerEvent = TRIGGER_EVENT.HOVER
}: HandleTooltipStateEventChangeOptions) => {
	const trigger = {
		[TRIGGER_EVENT.FOCUS]: ['focus', 'blur'],
		[TRIGGER_EVENT.HOVER]: ['hoverIn', 'hoverOut'],
		[TRIGGER_EVENT.PRESS]: ['pressIn']
	}

	return (_event: StateEvent) => {
		if (eventName === EVENT_NAME.LAYOUT) {
			return
		}

		const triggerEventNames = trigger[triggerEvent]

		if (eventName && triggerEventNames?.includes(eventName)) {
			onTooltipVisible(eventName === triggerEventNames[0])
		}
	}
}

export const emitTooltipSupporting =
	(id: string) =>
	({supporting, ...props}: TooltipSupportingProps) =>
	(visible?: boolean) =>
		typeof visible === 'boolean' &&
		supporting &&
		emitter.emit('modal', {
			id: `tooltip__supporting--${id}`,
			props: {...props, visible, supporting},
			type: MODAL_TYPE.TOOL_TIP
		})

export const unmountTooltipSupporting = (id: string) => () => {
	emitter.emit('modal', {
		id: `tooltip__supporting--${id}`,
		type: MODAL_TYPE.TOOL_TIP,
		unmount: true
	})
}
