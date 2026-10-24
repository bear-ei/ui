import type {LayoutRectangle as RNLayoutRectangle} from 'react-native'

import type {ALIGNMENT, COMPONENT_STATUS, EVENT_NAME, ORIENTATION, INTERACTION_STATE, TRIGGER_ON} from './common.enum'

export type Alignment = (typeof ALIGNMENT)[keyof typeof ALIGNMENT]
export type ComponentStatus = (typeof COMPONENT_STATUS)[keyof typeof COMPONENT_STATUS]
export type EventName = (typeof EVENT_NAME)[keyof typeof EVENT_NAME]
export type Orientation = (typeof ORIENTATION)[keyof typeof ORIENTATION]
export type InteractionState = (typeof INTERACTION_STATE)[keyof typeof INTERACTION_STATE]
export type TriggerOn = (typeof TRIGGER_ON)[keyof typeof TRIGGER_ON]
export interface MeasuredLayoutRectangle extends RNLayoutRectangle {
	left?: number
	pageX?: number
	pageY?: number
	top?: number
}

export type PartialSize = {height?: number; width?: number}
