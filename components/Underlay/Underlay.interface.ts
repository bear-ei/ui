import {CommonProps, ComponentStatus, EventName, LayoutRectangle, ShapeType} from '@/constants'
import {AnimateSharedValueTo, HandleStateEventChangeOptions, InteractionHandlers} from '@/hooks'
import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {ACTIVE_ANIMATED} from './Underlay.enum'

export type ActiveAnimatedType = (typeof ACTIVE_ANIMATED)[keyof typeof ACTIVE_ANIMATED]
export interface UnderlayProps extends ViewProps, RefAttributes<View>, CommonProps {
        active?: boolean
        activeAnimatedType?: ActiveAnimatedType
        activeColor?: string
        activeShape?: ShapeType
        defaultActive?: boolean

        /**
         * When the active animation type is scale, set the x,y scaling factor of scale. Default 1.
         */
        activeScale?: {x?: number; y?: number}
        eventName?: EventName
        opacities?: [number, number, number] | [number, number]
        underlayColor?: string
}

export interface RenderUnderlayProps extends UnderlayProps {
        activeLayerAnimatedStyle: AnimatedStyle<ViewStyle>
        hoverLayerAnimatedStyle: AnimatedStyle<ViewStyle>
        interactionHandlers: InteractionHandlers
}

export type UnderlayBaseProps = UnderlayProps
export interface UnderlayState {
        status: ComponentStatus
}

export interface UseUnderlayAnimatedOptions
        extends Pick<RenderUnderlayProps, 'active' | 'activeAnimatedType' | 'activeScale' | 'eventName' | 'opacities'> {
        status: ComponentStatus
}

export interface HandleUnderlayStateChangeOptions extends HandleStateEventChangeOptions {
        onLayoutChange: (layout: LayoutRectangle) => void
}

export interface AnimateUnderlayHoverStateOptions {
        activeValue: number
        animateSharedValueTo: AnimateSharedValueTo
}

export type HoverLayerProps = Pick<RenderUnderlayProps, 'underlayColor'>
export type ActiveLayerProps = Pick<RenderUnderlayProps, 'activeColor'>
