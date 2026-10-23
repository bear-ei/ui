import type {LayoutRectangle} from 'react-native'

import {useCallback, useId, useImperativeHandle, useMemo, useRef, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {State} from '../../constants'
import type {DragBaseProps, DragRef, DragState} from './Drag.interface'

import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {handleDragStateChange, updateDragLayout} from './Drag.handler'
import {RenderDrag} from './Drag.render'
import {useDragAnimated} from './use-drag-animated.hook'

export const DragBase: FC<DragBaseProps> = ({
	height,
	layoutType,
	offset,
	onEnd,
	onStart,
	onUpdate,
	ref,
	width,
	...renderDragProps
}) => {
	const [{layout}, setState] = useImmer<DragState>({layout: {} as Partial<LayoutRectangle>})
	const dragRef = useRef<DragRef>(null)
	const id = useId()
	const onLayoutChange = useMemo(() => updateDragLayout(setState), [setState])
	const onStateEventChange = useCallback(
		(event: StateEvent, state: State, options: HandleStateEventChangeOptions) =>
			handleDragStateChange(event, onLayoutChange, {...options, state}),
		[onLayoutChange]
	)

	const interactionHandlers = useInteractionStateEvent({...renderDragProps, onStateEventChange})
	const {animatedStyle, panGesture, runAnimate} = useDragAnimated({
		height,
		layout,
		layoutType,
		offset,
		onEnd,
		onStart,
		onUpdate,
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


