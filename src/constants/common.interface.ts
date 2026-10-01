import type {LayoutRectangle as RNLayoutRectangle} from 'react-native'
import type {ALIGNMENT, COMPONENT_STATUS, EVENT_NAME, LAYOUT, STATE, TRIGGER_ON} from './common.enum'
import type {ShapeType, Size} from '../theme'
export type Alignment = (typeof ALIGNMENT)[keyof typeof ALIGNMENT]
export type ComponentStatus = (typeof COMPONENT_STATUS)[keyof typeof COMPONENT_STATUS]
export type EventName = (typeof EVENT_NAME)[keyof typeof EVENT_NAME]
export type LayoutType = (typeof LAYOUT)[keyof typeof LAYOUT]
export type State = (typeof STATE)[keyof typeof STATE]
export type TriggerOn = (typeof TRIGGER_ON)[keyof typeof TRIGGER_ON]
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
