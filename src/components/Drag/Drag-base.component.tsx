import type {LayoutRectangle} from 'react-native'

import {useCallback, useId, useImperativeHandle, useMemo, useRef, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {InteractionState} from '../../constants'
import type {DragBaseProps, DragRef, DragState} from './Drag.interface'

import {useInteractionStateEvent, type HandleInteractionStateChangeOptions, type InteractionEvent} from '../../hooks'
import {handleDragStateChange, updateDragLayout} from './Drag.handler'
import {RenderDrag} from './Drag.render'
import {useDragAnimated} from './use-drag-animated.hook'

export const DragBase: FC<DragBaseProps> = ({
	height,
	offset,
	onEnd,
	onStart,
	onUpdate,
	orientation,
	ref,
	width,
	...renderDragProps
}) => {
	const [{layout}, setState] = useImmer<DragState>({layout: {} as Partial<LayoutRectangle>})
	const dragRef = useRef<DragRef>(null)
	const id = useId()
	const onLayoutChange = useMemo(() => updateDragLayout(setState), [setState])
	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, interactionState: InteractionState, options: HandleInteractionStateChangeOptions) =>
			handleDragStateChange(event, onLayoutChange, {...options, interactionState}),
		[onLayoutChange]
	)

	const interactionHandlers = useInteractionStateEvent({...renderDragProps, onInteractionStateChange})
	const {animatedStyle, panGesture, runAnimate} = useDragAnimated({
		height,
		layout,
		offset,
		onEnd,
		onStart,
		onUpdate,
		orientation,
		width
	})

	useImperativeHandle(ref, () => {
		if (!dragRef.current) {
			return null as unknown as DragRef
		}

		dragRef.current.reset = runAnimate

		return dragRef.current
	}, [runAnimate])

	return (
		<RenderDrag
			{...renderDragProps}
			animatedStyle={animatedStyle}
			id={id}
			interactionHandlers={interactionHandlers}
			panGesture={panGesture}
			ref={dragRef}
		/>
	)
}
