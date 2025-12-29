import type {ComponentStatus} from '@/constants'
import type {Theme} from '@/contexts'
import type {
        AnimateSharedValueTo,
        HandleStateEventChangeOptions,
        InteractionHandlers,
        UseHandleStateEventOptions
} from '@/hooks'
import type {RefAttributes} from 'react'
import type {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {PopoverContentPosition, PopoverProps} from '..'

export interface PopoverContentProps
        extends ViewProps,
                RefAttributes<View>,
                UseHandleStateEventOptions,
                Pick<
                        PopoverProps,
                        | 'elevation'
                        | 'onVisible'
                        | 'shape'
                        | 'content'
                        | 'popoverContentPosition'
                        | 'triggerEvent'
                        | 'type'
                        | 'visible'
                > {
        containerLayout?: LayoutRectangle
        onClosed?: () => void
}

export interface RenderPopoverContentProps extends PopoverContentProps {
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

export type PopoverContentBaseProps = PopoverContentProps
export interface PopoverContentState {
        invert?: boolean
        layout: LayoutRectangle
        menuPosition: {top?: number; left?: number}
        nextClosedEvent?: () => void
        status: ComponentStatus
}

export type HandlePopoverContentStateEventChangeOptions = HandleStateEventChangeOptions &
        Pick<PopoverContentProps, 'onVisible' | 'triggerEvent'>

export interface UsePopoverContentAnimatedOptions extends Pick<RenderPopoverContentProps, 'type' | 'visible'> {
        height?: number
        onClose?: (value?: boolean) => void
        position?: PopoverContentPosition
        status?: ComponentStatus
}

export interface UpdatePopoverContentStatusOptions {
        setState: Updater<PopoverContentState>
        windowWidth: number
}

export interface AnimatePopoverContentOptions extends UsePopoverContentAnimatedOptions {
        createEntrySharedValueAnimator: AnimateSharedValueTo
        createExitSharedValueAnimator: AnimateSharedValueTo
}

export interface AnimatePopoverContentSharedValues {
        heightSharedValue: SharedValue<number>
        opacitySharedValue: SharedValue<number>
        transformSharedValue: SharedValue<number>
}

export interface UpdatePopoverContentInvertOptions {
        height: number
        width: number
        windowHeight: number
        windowWidth: number
        x: number
        y: number
}

export interface UpdatePopoverContentPositionOptions
        extends Pick<PopoverContentProps, 'popoverContentPosition' | 'type' | 'containerLayout'> {
        setState: Updater<PopoverContentState>
        theme: Theme
}

export interface HandlePopoverContentPositionWindowOptions {
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
