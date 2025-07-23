import type {RefAttributes} from 'react'
import type {LayoutRectangle, View, ViewProps} from 'react-native'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '../../hooks'
import type {TooltipSupportingProps} from './Tooltip-supporting'
import type {TOOLTIP_TYPE} from './Tooltip.enum'

export type TooltipType = (typeof TOOLTIP_TYPE)[keyof typeof TOOLTIP_TYPE]
export interface TooltipProps
	extends Pick<
			TooltipSupportingProps,
			| 'elevation'
			| 'onVisible'
			| 'shape'
			| 'supporting'
			| 'supportingPosition'
			| 'triggerEvent'
			| 'type'
			| 'visible'
		>,
		ViewProps,
		RefAttributes<View> {
	children?: JSX.Element
	defaultVisible?: boolean
	disabled?: boolean
	type?: TooltipType
	visible?: boolean
}

export interface RenderTooltipProps extends TooltipProps {
	interactionHandlers: InteractionHandlers
}

export type TooltipBaseProps = TooltipProps
export interface TooltipState {
	nextActiveEvent?: () => void
	tooltipVisible?: boolean
}

export interface HandleTooltipStateEventChangeOptions
	extends HandleStateEventChangeOptions,
		Pick<TooltipProps, 'triggerEvent'> {
	onTooltipVisible: (value?: boolean) => void
}

export interface EmitTooltipSupportingOptions {
	containerLayout: LayoutRectangle & {pageX: number; pageY: number}
	visible?: boolean
}
