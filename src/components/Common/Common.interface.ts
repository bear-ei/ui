import {
        Bezier,
        BorderRadius,
        Elevation,
        Font,
        Palette,
        Shadow,
        Shape,
        Size,
        Spacing,
        Typography
} from '@bearei/material-token'
import {Density} from '../../contexts'

export type BezierType = keyof Bezier
export type BorderRadiusType = keyof BorderRadius
export type BorderStyle = 'dotted' | 'solid' | 'dashed'
export type ElevationType = keyof Elevation
export type FontType = keyof Font
export type PaletteType = keyof Palette
export type ShadowType = keyof Shadow
export type ShapeType = keyof Shape
export type SpacingType = keyof Spacing
export type State = 'enabled' | 'focused' | 'hovered' | 'longPressIn' | 'pressIn' | 'error' | 'disabled'
export type TypographyType = keyof Typography
export type EventName =
        | 'blur'
        | 'focus'
        | 'hoverIn'
        | 'hoverOut'
        | 'layout'
        | 'longPress'
        | 'none'
        | 'press'
        | 'pressIn'
        | 'pressOut'

export type TriggerEvent = 'focus' | 'hover' | 'press'
export type ComponentStatus = 'idle' | 'loading' | 'failed' | 'succeeded'
export interface ShapeProps {
        shape?: ShapeType
}

export interface TypographyProps {
        multiline?: boolean
        size?: Size
        type?: TypographyType
}

export interface CommonProps {
        density?: Density
}
