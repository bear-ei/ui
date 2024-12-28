import {RefAttributes} from 'react'
import {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {Updater} from 'use-immer'
import {AnimatedTiming, OnStateEvent, OnStateEventChangedOptions} from '../../../hooks'
import {ComponentStatus, ShapeType} from '../../Common'
import {ElevationLevel} from '../../Elevation'
import {TooltipType} from '../Tooltip.interface'

export type SupportingPosition = 'horizontalStart' | 'horizontalEnd' | 'verticalStart' | 'verticalEnd'
export interface TooltipSupportingProps extends ViewProps, RefAttributes<View> {
        containerCurrent: View | null
        containerLayout: LayoutRectangle
        elevation?: ElevationLevel
        onVisible?: (value?: boolean) => void
        shape?: ShapeType
        supporting?: string | JSX.Element
        supportingPosition?: SupportingPosition
        type?: TooltipType
        visible?: boolean
        zIndex?: number
}

export interface RenderTooltipSupportingProps extends Omit<TooltipSupportingProps, 'containerCurrent'> {
        closed?: boolean
        containerLayout: LayoutRectangle & {pageX: number; pageY: number}
        contentAnimatedStyle?: AnimatedStyle<ViewStyle>
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
        invert?: boolean
        invertY?: boolean
        layout: LayoutRectangle
        status: ComponentStatus
        visible?: boolean
}

export type HandleTooltipSupportingStateEventChangeOptions = OnStateEventChangedOptions &
        Pick<TooltipSupportingProps, 'onVisible'>

export interface UseTooltipSupportingAnimatedOptions extends Pick<RenderTooltipSupportingProps, 'visible' | 'type'> {
        height?: number
        onClose?: (value?: boolean) => void
}

export interface HandleTooltipSupportingContainerLayoutOptions {
        setState: Updater<TooltipSupportingState>
        windowWidth: number
}

export interface HandleTooltipSupportingAnimatedTimingOptions extends UseTooltipSupportingAnimatedOptions {
        animatedTiming: AnimatedTiming
}

export interface HandleTooltipSupportingAnimatedTimingSharedValue {
        transformSharedValue: SharedValue<number>
        heightSharedValue: SharedValue<number>
        opacitySharedValue: SharedValue<number>
}

export interface HandleTooltipSupportingInvertOptions {
        height: number
        pageX: number
        pageY: number
        width: number
        windowHeight: number
        windowWidth: number
}

export interface HandleTooltipSupportingPositionInvertOptions
        extends Pick<TooltipSupportingProps, 'supportingPosition'> {
        setState: Updater<TooltipSupportingState>
}

export type HandleTooltipSupportingPositionInvertWindowOptions = Pick<
        HandleTooltipSupportingInvertOptions,
        'width' | 'height'
>

export interface TooltipSupportingContainerProps {
        closed?: boolean
}

export interface TooltipSupportingContentProps
        extends Pick<RenderTooltipSupportingProps, 'type' | 'supportingPosition' | 'width' | 'height' | 'zIndex'> {
        closed?: boolean
        containerHeight?: number
        containerPageX?: number
        containerPageY?: number
        containerWidth?: number
}

export type TooltipSupportingMainProps = Pick<RenderTooltipSupportingProps, 'type' | 'supportingPosition'>
