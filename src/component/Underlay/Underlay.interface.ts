import {Shape} from '@bearei/material-token'
import {RefAttributes} from 'react'
import {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {AnimatedTiming} from '../../hook'
import {EventName, ShapeProps} from '../Common'

export type ActiveAnimatedType = 'fade' | 'scale' | 'scaleX' | 'scaleY'
export interface UnderlayProps extends Pick<ShapeProps, 'shape'>, ViewProps, RefAttributes<View> {
    active?: boolean
    defaultActive?: boolean
    activeAnimatedType?: 'fade' | 'scale' | 'scaleX' | 'scaleY'
    activeColor?: string

    /**
     * When the active animation type is scale, set the x,y scaling factor of scale. Default 1.
     */
    activeScale?: {x?: number; y?: number}
    activeShape?: keyof Shape
    eventName?: EventName
    height?: number
    opacities?: [number, number, number] | [number, number]
    underlayColor?: string
    width?: number
}

export interface RenderUnderlayProps extends UnderlayProps {
    hoverLayerAnimatedStyle: AnimatedStyle<ViewStyle>
    activeLayerAnimatedStyle: AnimatedStyle<ViewStyle>
}

export interface UnderlayBaseProps extends UnderlayProps {
    render: (props: RenderUnderlayProps) => JSX.Element
}

export interface UnderlayState {
    layout: LayoutRectangle
}

export interface UseUnderlayAnimatedOptions
    extends Pick<RenderUnderlayProps, 'active' | 'activeAnimatedType' | 'activeScale' | 'eventName' | 'opacities'> {
    layoutWidth?: number
}

export interface HandleUnderlayHoveredAnimatedTimingOptions {
    activeValue: number
    animatedTiming: AnimatedTiming
}

export type UnderlayContainerProps = Pick<RenderUnderlayProps, 'height' | 'width'>
export type HoverLayerProps = Pick<RenderUnderlayProps, 'underlayColor'>
export type ActiveLayerProps = Pick<RenderUnderlayProps, 'activeColor'>
