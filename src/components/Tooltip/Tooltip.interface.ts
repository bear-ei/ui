import type {RefAttributes} from 'react'
import type {LayoutRectangle, MouseEvent, View, ViewProps} from 'react-native'
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
	delay?: number
	disabled?: boolean
	type?: TooltipType
	visible?: boolean
}

export interface RenderTooltipProps extends TooltipProps {
	interactionHandlers: InteractionHandlers
	onContextMenu: (event: MouseEvent) => void
}

export type TooltipBaseProps = TooltipProps
export interface TooltipState {
	menuContainerLayout?: {x: number; y: number}
	nextVisibleEvent?: () => void
	tooltipVisible?: boolean
}

export interface HandleTooltipStateEventChangeOptions
	extends HandleStateEventChangeOptions,
		Pick<TooltipProps, 'triggerEvent' | 'type'> {
	onVisible: (value?: boolean) => void
}

export interface EmitTooltipSupportingOptions {
	containerLayout?: Partial<LayoutRectangle>
	visible?: boolean
}

export type UpdateTooltipContextMenuLayoutOptions = Pick<RenderTooltipProps, 'disabled' | 'onVisible'>
