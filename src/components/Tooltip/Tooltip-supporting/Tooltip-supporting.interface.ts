import {RefAttributes} from 'react'
import {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {AnimatedTiming, OnStateEvent, OnStateEventChangeOptions} from '../../../hooks'
import {ComponentStatus} from '../../Common'
import {TooltipType} from '../Tooltip.interface'

export type SupportingPosition = 'horizontalStart' | 'horizontalEnd' | 'verticalStart' | 'verticalEnd'

export interface TooltipSupportingProps extends ViewProps, RefAttributes<View> {
    containerCurrent: View | null
    onVisible?: (value?: boolean) => void
    supportingPosition?: 'horizontalStart' | 'horizontalEnd' | 'verticalStart' | 'verticalEnd'
    supporting?: string | JSX.Element
    type?: TooltipType
    visible?: boolean
}

export interface RenderTooltipSupportingProps extends Omit<TooltipSupportingProps, 'containerCurrent'> {
    contentAnimatedStyle?: AnimatedStyle<ViewStyle>
    closed?: boolean
    containerLayout: LayoutRectangle & {pageX: number; pageY: number}
    height?: number
    onStateEvent: OnStateEvent
    theme: DefaultTheme
    width?: number
}

export interface TooltipSupportingBaseProps extends TooltipSupportingProps {
    render: (props: RenderTooltipSupportingProps) => JSX.Element
}

export interface TooltipSupportingState {
    closed?: boolean
    containerLayout: LayoutRectangle & {pageX: number; pageY: number}
    layout: LayoutRectangle
    status: ComponentStatus
    visible?: boolean
}

export type HandleTooltipSupportingEmitOptions = Pick<TooltipSupportingState, 'status'> &
    Pick<RenderTooltipSupportingProps, 'id'>

export type HandleTooltipSupportingStateEventChangeOptions = OnStateEventChangeOptions &
    Pick<TooltipSupportingProps, 'onVisible'>

export interface UseTooltipSupportingAnimatedOptions extends Pick<RenderTooltipSupportingProps, 'visible' | 'type'> {
    onClose?: (value?: boolean) => void
}

export interface HandleTooltipSupportingAnimatedTimingOptions extends UseTooltipSupportingAnimatedOptions {
    animatedTiming: AnimatedTiming
}

export interface TooltipSupportingContainerProps
    extends Pick<RenderTooltipSupportingProps, 'type' | 'supportingPosition' | 'width' | 'height'> {
    containerHeight?: number
    containerPageX?: number
    containerPageY?: number
    containerWidth?: number
}

export type TooltipSupportingContentProps = Pick<RenderTooltipSupportingProps, 'type' | 'supportingPosition'>
