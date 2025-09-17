import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {DragBaseProps} from './Drag.interface'
import {RenderDrag} from './Drag.render'
import {useDragAnimated} from './use-drag-animated.hook'

export const DragBase = forwardRef<View, DragBaseProps>(
	({width, height, onEnd, onStart, onUpdate, ...renderDragProps}, ref) => {
		const id = useId()
		const {animatedStyle, panGesture} = useDragAnimated({height, width, onEnd, onStart, onUpdate})

		return (
			<RenderDrag
				{...renderDragProps}
				animatedStyle={animatedStyle}
				id={id}
				panGesture={panGesture}
				ref={ref}
			/>
		)
	}
)
