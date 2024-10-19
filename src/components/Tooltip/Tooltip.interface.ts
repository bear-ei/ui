import {RefAttributes} from 'react'
import {LayoutRectangle, View, ViewProps} from 'react-native'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {TooltipSupportingProps} from './Tooltip-supporting'

export type TooltipType = 'plain' | 'rich' | 'menu'
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
    containerCurrent: View | null
    layout: LayoutRectangle
    onStateEvent: OnStateEvent
    onVisible?: (value?: boolean) => void
}

export interface TooltipBaseProps extends TooltipProps {
    render: (props: RenderTooltipProps) => JSX.Element
}

export interface TooltipState {
    layout: LayoutRectangle
    nextActiveEvent?: () => void
    tooltipVisible?: boolean
}

export interface HandleTooltipStateEventChangeOptions
    extends OnStateEventChangeOptions,
        Pick<TooltipProps, 'triggerEvent'> {
    onTooltipVisible: (value?: boolean) => void
}
