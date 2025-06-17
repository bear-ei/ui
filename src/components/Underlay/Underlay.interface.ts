import type {RefAttributes} from 'react'
import type {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {AnimateSharedValueTo, HandleStateEventChangeOptions, InteractionHandlers} from '../../hooks'
import type {ComponentStatus, EventName, ShapeProps, ShapeType} from '../Common'
import type {ACTIVE_ANIMATED} from './Underlay.enum'

export type ActiveAnimatedType = (typeof ACTIVE_ANIMATED)[keyof typeof ACTIVE_ANIMATED]
export interface UnderlayProps extends Pick<ShapeProps, 'shape'>, ViewProps, RefAttributes<View> {
	active?: boolean
	activeAnimatedType?: ActiveAnimatedType
	activeColor?: string
	defaultActive?: boolean

	/**
	 * When the active animation type is scale, set the x,y scaling factor of scale. Default 1.
	 */
	activeScale?: {x?: number; y?: number}
	activeShape?: ShapeType
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
