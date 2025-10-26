import type {Bezier, Elevation, Font, Palette, Shadow, Shape, Size, Spacing, Typography} from '@bearei/theme-token'
import type {LayoutRectangle as RNLayoutRectangle} from 'react-native'
import type {ALIGNMENT, COMPONENT_STATUS, EVENT_NAME, LAYOUT, STATE, TRIGGER_EVENT} from './common.enum'

export type Alignment = (typeof ALIGNMENT)[keyof typeof ALIGNMENT]
export type BezierType = keyof Bezier
export type ComponentStatus = (typeof COMPONENT_STATUS)[keyof typeof COMPONENT_STATUS]
export type ElevationType = keyof Elevation
export type EventName = (typeof EVENT_NAME)[keyof typeof EVENT_NAME]
export type FontType = keyof Font
export type LayoutType = (typeof LAYOUT)[keyof typeof LAYOUT]
export type PaletteType = keyof Palette
export type ShadowType = keyof Shadow
export type ShapeType = keyof Shape
export type SpacingType = keyof Spacing
export type State = (typeof STATE)[keyof typeof STATE]
export type TriggerEvent = (typeof TRIGGER_EVENT)[keyof typeof TRIGGER_EVENT]
export type TypographyType = keyof Typography
export interface LayoutRectangle extends RNLayoutRectangle {
        left?: number
        pageX?: number
        pageY?: number
        top?: number
}

export interface CommonProps {
        size?: Size
        shape?: ShapeType
}

export type ContentSize = {width?: number; height?: number}
