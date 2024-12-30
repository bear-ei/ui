import {RefAttributes} from 'react'
import {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {AnimatedTiming, OnStateEventChangeOptions} from '../../hooks'
import {EventName, ShapeProps, ShapeType} from '../Common'

export type ActiveAnimatedType = 'fade' | 'scaleX' | 'scaleY' | 'scale'
export interface UnderlayProps extends Pick<ShapeProps, 'shape'>, ViewProps, RefAttributes<View> {
        active?: boolean
        defaultActive?: boolean
        activeAnimatedType?: ActiveAnimatedType
        activeColor?: string

        /**
         * When the active animation type is scale, set the x,y scaling factor of scale. Default 1.
         */
        activeScale?: {x?: number; y?: number}
        activeShape?: ShapeType
        eventName?: EventName
        height?: number
        opacities?: [number, number, number] | [number, number]
        underlayColor?: string
        width?: number
}

export interface RenderUnderlayProps extends UnderlayProps {
        activeLayerAnimatedStyle: AnimatedStyle<ViewStyle>
        hoverLayerAnimatedStyle: AnimatedStyle<ViewStyle>
}

export interface UnderlayBaseProps extends UnderlayProps {
        render: (props: RenderUnderlayProps) => JSX.Element
}

export interface UnderlayState {
        layout: LayoutRectangle
}

export type UseUnderlayAnimatedOptions = Pick<
        RenderUnderlayProps,
        'active' | 'activeAnimatedType' | 'activeScale' | 'eventName' | 'opacities'
>

export interface HandleUnderlayStateChangeOptions extends OnStateEventChangeOptions {
        onLayoutChange: (layout: LayoutRectangle) => void
}

export interface HandleUnderlayHoveredAnimatedTimingOptions {
        activeValue: number
        animatedTiming: AnimatedTiming
}

export type UnderlayContainerProps = Pick<RenderUnderlayProps, 'height' | 'width'>
export type HoverLayerProps = Pick<RenderUnderlayProps, 'underlayColor'>
export type ActiveLayerProps = Pick<RenderUnderlayProps, 'activeColor'>
