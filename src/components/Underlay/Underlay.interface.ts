import type {RefAttributes} from 'react'
import type {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {CreateSharedValueAnimator, HandleStateEventChangeOptions} from '../../hooks'
import type {EventName, ShapeProps, ShapeType} from '../Common'
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
}

export interface UnderlayBaseProps extends UnderlayProps {
	renderUnderlay: (props: RenderUnderlayProps) => React.JSX.Element
}

export interface UnderlayState {
	layout: LayoutRectangle
}

export type UseUnderlayAnimatedOptions = Pick<
	RenderUnderlayProps,
	'active' | 'activeAnimatedType' | 'activeScale' | 'eventName' | 'opacities'
>

export interface HandleUnderlayStateChangeOptions extends HandleStateEventChangeOptions {
	onLayoutChange: (layout: LayoutRectangle) => void
}

export interface AnimateUnderlayHoverStateOptions {
	activeValue: number
	createSharedValueAnimator: CreateSharedValueAnimator
}

export type HoverLayerProps = Pick<RenderUnderlayProps, 'underlayColor'>
export type ActiveLayerProps = Pick<RenderUnderlayProps, 'activeColor'>
