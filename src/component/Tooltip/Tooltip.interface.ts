import {RefAttributes} from 'react'
import {PressableProps, View, ViewProps} from 'react-native'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hook'
import {EventName, ShapeProps} from '../Common'
import {TooltipSupportingProps} from './Tooltip-supporting'

export type TooltipType = 'plain' | 'rich'
export interface TooltipProps
    extends Omit<
        Partial<
            Pick<TooltipSupportingProps, 'supportingPosition' | 'supportingText' | 'type' | 'visible' | 'onVisible'> &
                Pick<ShapeProps, 'shape'> &
                PressableProps &
                RefAttributes<View> &
                ViewProps &
                OnStateEvent
        >,
        'children' | 'disabled' | 'hitSlop'
    > {
    children?: React.JSX.Element
    defaultVisible?: boolean
    disabled?: boolean
    eventName?: EventName
}

export interface RenderTooltipProps extends TooltipProps {
    containerCurrent: View | null
    onStateEvent: OnStateEvent
    onVisible?: (value?: boolean) => void
}

export interface TooltipBaseProps extends TooltipProps {
    render: (props: RenderTooltipProps) => React.JSX.Element
}

export interface InitialTooltipState {
    nextActiveCallback?: () => void
    tooltipVisible?: boolean
}

export interface HandleTooltipStateEventChangeOptions extends OnStateEventChangeOptions {
    handleDebounceTooltipVisible: (value?: boolean) => void
}
