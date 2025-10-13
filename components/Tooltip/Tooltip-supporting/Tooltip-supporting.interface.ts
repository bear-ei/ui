import {ElevationLevel} from '@/components/Elevation'
import {ComponentStatus, ShapeType, TriggerEvent} from '@/constants'
import {Theme} from '@/contexts'
import {
        AnimateSharedValueTo,
        HandleStateEventChangeOptions,
        InteractionHandlers,
        UseHandleStateEventOptions
} from '@/hooks'
import type {JSX, RefAttributes} from 'react'
import type {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {TooltipType} from '../Tooltip.interface'
import type {SUPPORTING_POSITION} from './Tooltip-supporting.enum'

export type SupportingPosition = (typeof SUPPORTING_POSITION)[keyof typeof SUPPORTING_POSITION]
export interface TooltipSupportingProps extends ViewProps, RefAttributes<View>, UseHandleStateEventOptions {
        containerLayout?: LayoutRectangle
        elevation?: ElevationLevel
        onClosed?: () => void
        onVisible?: (value?: boolean) => void
        shape?: ShapeType
        supporting?: string | JSX.Element
        supportingPosition?: SupportingPosition
        triggerEvent?: TriggerEvent
        type?: TooltipType
        visible?: boolean
}

export interface RenderTooltipSupportingProps extends TooltipSupportingProps {
        contentAnimatedStyle?: AnimatedStyle<ViewStyle>
        height?: number
        interactionHandlers: InteractionHandlers
        menuPosition: {top?: number; left?: number}
        onMaskPressOut?: () => void
        theme: Theme
        width?: number
        windowHeight?: number
        windowWidth?: number
}

export type TooltipSupportingBaseProps = TooltipSupportingProps
export interface TooltipSupportingState {
        invert?: boolean
        layout: LayoutRectangle
        menuPosition: {top?: number; left?: number}
        nextClosedEvent?: () => void
        status: ComponentStatus
}

export type HandleTooltipSupportingStateEventChangeOptions = HandleStateEventChangeOptions &
        Pick<TooltipSupportingProps, 'onVisible' | 'triggerEvent'>

export interface UseTooltipSupportingAnimatedOptions extends Pick<RenderTooltipSupportingProps, 'type' | 'visible'> {
        height?: number
        onClose?: (value?: boolean) => void
        position?: SupportingPosition
        status?: ComponentStatus
}

export interface UpdateTooltipSupportingStatusOptions {
        setState: Updater<TooltipSupportingState>
        windowWidth: number
}

export interface AnimateTooltipSupportingOptions extends UseTooltipSupportingAnimatedOptions {
        createEntrySharedValueAnimator: AnimateSharedValueTo
        createExitSharedValueAnimator: AnimateSharedValueTo
}

export interface AnimateTooltipSupportingSharedValues {
        heightSharedValue: SharedValue<number>
        opacitySharedValue: SharedValue<number>
        transformSharedValue: SharedValue<number>
}

export interface UpdateTooltipSupportingInvertOptions {
        height: number
        width: number
        windowHeight: number
        windowWidth: number
        x: number
        y: number
}

export interface UpdateTooltipSupportingPositionOptions
        extends Pick<TooltipSupportingProps, 'supportingPosition' | 'type' | 'containerLayout'> {
        setState: Updater<TooltipSupportingState>
        theme: Theme
}

export interface HandleTooltipSupportingPositionWindowOptions {
        layout: LayoutRectangle
        visible?: boolean
        windowHeight: number
        windowWidth: number
}

export interface GetSafeMenuPositionOptions {
        height: number
        margin?: number
        offset?: number
        width: number
        windowHeight?: number
        windowWidth?: number
        x?: number
        y?: number
}
