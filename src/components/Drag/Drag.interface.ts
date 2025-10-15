import type {LayoutRectangle, LayoutType} from '@/constants'
import type {InteractionHandlers} from '@/hooks'
import type React from 'react'
import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {
        GestureStateChangeEvent,
        GestureUpdateEvent,
        PanGesture,
        PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'

export interface DragRef extends View {
        reset: () => void
}

export interface DragProps extends ViewProps, RefAttributes<View> {
        children?: React.JSX.Element
        height?: number
        layoutType?: LayoutType
        offset?: number
        onEnd?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
        onStart?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
        onUpdate?: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void
        width?: number
}

export type DragBaseProps = DragProps
export interface RenderDragProps extends DragProps {
        animatedStyle: AnimatedStyle<ViewStyle>
        interactionHandlers: InteractionHandlers
        panGesture: PanGesture
}

export interface DragState {
        layout: LayoutRectangle
}

export interface UpdatePrevTranslateSharedValueOptions extends Pick<UseDragAnimatedOptions, 'onStart'> {
        prevTranslateXSharedValue: SharedValue<number>
        prevTranslateYSharedValue: SharedValue<number>
}

export interface UseDragAnimatedOptions
        extends Pick<DragProps, 'height' | 'width' | 'onEnd' | 'onStart' | 'onUpdate' | 'layoutType' | 'offset'> {
        layout: LayoutRectangle
}

export interface UpdateTranslateSharedValueOptions {
        translateXSharedValue: SharedValue<number>
        translateYSharedValue: SharedValue<number>
}

export interface UpdateTranslateScreenOptions
        extends Pick<UseDragAnimatedOptions, 'onUpdate' | 'layout' | 'layoutType' | 'offset'> {
        height: number
        width: number
}

export interface UpdateTranslateOptions
        extends UpdatePrevTranslateSharedValueOptions,
                UpdateTranslateSharedValueOptions {}

export type AnimateDragOptions = UpdateTranslateSharedValueOptions
