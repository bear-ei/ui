import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGesture,
	PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {DefaultTheme} from 'styled-components/native'
import type {CommonProps} from '../Common'

export interface DragProps extends ViewProps, RefAttributes<View>, CommonProps {
	height?: number
	onEnd?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
	onStart?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
	onUpdate?: (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void
	width?: number
}

export type DragBaseProps = DragProps
export interface RenderDragProps extends DragProps {
	animatedStyle: AnimatedStyle<ViewStyle>
	panGesture: PanGesture
}

export interface UpdatePrevTranslationSharedValueOptions extends Pick<UseDragAnimatedOptions, 'onStart'> {
	prevTranslationXSharedValue: SharedValue<number>
	prevTranslationYSharedValue: SharedValue<number>
}

export type UseDragAnimatedOptions = Pick<DragProps, 'height' | 'width' | 'onEnd' | 'onStart' | 'onUpdate'>
export interface UpdateTranslationSharedValueOptions {
	translateXSharedValue: SharedValue<number>
	translateYSharedValue: SharedValue<number>
}

export interface UpdateTranslationScreenOptions extends Pick<UseDragAnimatedOptions, 'onUpdate'> {
	height: number
	theme: DefaultTheme
	width: number
}

export interface UpdateTranslationOptions
	extends UpdatePrevTranslationSharedValueOptions,
		UpdateTranslationSharedValueOptions {}

export type AnimateDragOptions = UpdateTranslationSharedValueOptions
