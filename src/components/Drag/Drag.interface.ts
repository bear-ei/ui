import type {JSX, RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGesture,
	PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {MeasuredLayoutRectangle, Orientation} from '../../constants'
import type {InteractionHandlers} from '../../hooks'

export interface DragRef extends View {
	reset: () => void
}

export interface DragProps extends ViewProps, RefAttributes<DragRef> {
	children?: JSX.Element
	height?: number
	offset?: number
	onEnd?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
	onStart?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
	onUpdate?: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void
	orientation?: Orientation
	width?: number
}

export type DragBaseProps = DragProps
export interface RenderDragProps extends DragProps {
	animatedStyle: AnimatedStyle<ViewStyle>
	interactionHandlers: InteractionHandlers
	panGesture: PanGesture
}

export interface DragState {
	layout: Partial<MeasuredLayoutRectangle>
}

export type HandlePanGestureStartOptions = Pick<UseDragAnimatedOptions, 'onStart'>
export interface UseDragAnimatedOptions extends Pick<
	DragProps,
	'height' | 'width' | 'onEnd' | 'onStart' | 'onUpdate' | 'orientation' | 'offset'
> {
	layout: Partial<MeasuredLayoutRectangle>
}

export interface HandlePanGestureUpdateOptions extends Pick<
	UseDragAnimatedOptions,
	'onUpdate' | 'layout' | 'orientation' | 'offset'
> {
	height: number
	width: number
}
