import type {ElevationLevel} from '@/components/Elevation'
import type {ComponentStatus} from '@/constants'
import type {Theme} from '@/contexts'
import type {
        AnimateSharedValueTo,
        HandleStateEventChangeOptions,
        InteractionHandlers,
        UseHandleStateEventOptions
} from '@/hooks'
import type {LayoutRectangle, ViewProps} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {PopoverContentPosition, PopoverProps} from '..'

export interface PopoverContentProps
        extends ViewProps,
                UseHandleStateEventOptions,
                Pick<
                        PopoverProps,
                        | 'content'
                        | 'elevation'
                        | 'onAnimationFinished'
                        | 'onVisible'
                        | 'popoverContentPosition'
                        | 'shape'
                        | 'triggerEvent'
                        | 'type'
                        | 'visible'
                > {
        containerLayout?: LayoutRectangle
        onElevationAnimationFinished?: (elevation?: ElevationLevel) => void
}

export interface RenderPopoverContentProps extends PopoverContentProps {
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
        nextAnimationFinishedEvent?: () => void
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
        entryAnimateSharedValueTo: AnimateSharedValueTo
        exitAnimateSharedValueTo: AnimateSharedValueTo
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
