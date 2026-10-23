import type {PanGestureHandlerEventPayload} from 'react-native-gesture-handler'

export const extractDragEventPayload = ({
	absoluteX,
	absoluteY,
	stylusData,
	translationX,
	translationY,
	velocityX,
	velocityY,
	x,
	y
}: PanGestureHandlerEventPayload) => ({
	absoluteX,
	absoluteY,
	stylusData,
	translationX,
	translationY,
	velocityX,
	velocityY,
	x,
	y
})
