import type {JSX, RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGesture,
	PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {LayoutRectangle, LayoutType} from '../../constants'
import type {InteractionHandlers} from '../../hooks'

export interface DragRef extends View {
	reset: () => void
}

export interface DragProps extends ViewProps, RefAttributes<DragRef> {
	children?: JSX.Element
	height?: number
	layoutType?: LayoutType
	offset?: number
	onEnd?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
	onStart?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
	onUpdate?: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void
	width?: number
}

export type DragBaseProps = DragProps
export interface RenderDragProps extends DragProps {
	animatedStyle: AnimatedStyle<ViewStyle>
	interactionHandlers: InteractionHandlers
	panGesture: PanGesture
}

export interface DragState {
	layout: Partial<LayoutRectangle>
}

export type UpdatePrevTranslateSharedValueOptions = Pick<UseDragAnimatedOptions, 'onStart'>
export interface UseDragAnimatedOptions extends Pick<
	DragProps,
	'height' | 'width' | 'onEnd' | 'onStart' | 'onUpdate' | 'layoutType' | 'offset'
> {
	layout: Partial<LayoutRectangle>
}

export interface UpdateTranslateScreenOptions extends Pick<
	UseDragAnimatedOptions,
	'onUpdate' | 'layout' | 'layoutType' | 'offset'
> {
	height: number
	width: number
}
