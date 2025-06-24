import type {
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
} from '@bearei/element-token'
import type {RefAttributes} from 'react'
import type {LayoutRectangle as RNLayoutRectangle, View, ViewProps} from 'react-native'
import type {COMPONENT_STATUS, DENSITY, DENSITY_SCALE, EVENT_NAME, LAYOUT, STATE, TRIGGER_EVENT} from './Common.enum'

export type BezierType = keyof Bezier
export type BorderRadiusType = keyof BorderRadius
export type ComponentStatus = (typeof COMPONENT_STATUS)[keyof typeof COMPONENT_STATUS]
export type Density = (typeof DENSITY)[keyof typeof DENSITY]
export type DensityScale = (typeof DENSITY_SCALE)[keyof typeof DENSITY_SCALE]
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
export interface ShapeProps extends ViewProps, RefAttributes<View> {
	shape?: ShapeType
}

export interface TypographyProps {
	line?: number
	multiline?: boolean
	size?: Size
	type?: TypographyType
}

export interface CommonProps {
	density?: Density | number
}

export interface LayoutRectangle extends RNLayoutRectangle {
	left?: number
	pageX?: number
	pageY?: number
	top?: number
}
