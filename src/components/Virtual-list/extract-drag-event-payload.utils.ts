import type {PanGestureHandlerEventPayload} from 'react-native-gesture-handler'

export const extractDragEventPayload = ({
	x,
	y,
	absoluteX,
	absoluteY,
	translationX,
	translationY,
	velocityX,
	velocityY,
	stylusData
}: PanGestureHandlerEventPayload) => ({
	x,
	y,
	absoluteX,
	absoluteY,
	translationX,
	translationY,
	velocityX,
	velocityY,
	stylusData
})
