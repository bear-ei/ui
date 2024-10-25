import {RefAttributes} from 'react'
import {LayoutRectangle, View, ViewProps} from 'react-native'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {TriggerEvent} from '../Common'
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
                        | 'type'
                        | 'visible'
                        | 'zIndex'
                >,
                ViewProps,
                RefAttributes<View> {
        children?: JSX.Element
        defaultVisible?: boolean
        disabled?: boolean
        triggerEvent?: TriggerEvent
        type?: TooltipType
        visible?: boolean
}

export interface RenderTooltipProps extends TooltipProps {
        onStateEvent: OnStateEvent
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
