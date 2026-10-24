import {useCallback, useId, useMemo, useRef, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {MeasuredLayoutRectangle, InteractionState} from '../../constants'
import type {PressableType, TouchableBaseProps, TouchableRippleLocations, TouchableState} from './Touchable.interface'

import {
	useInteractionStateEvent,
	useMergeRefs,
	type HandleInteractionStateChangeOptions,
	type InteractionEvent
} from '../../hooks'
import {deleteTouchableRippleByKey, handleTouchableStateChange} from './Touchable.handler'
import {RenderTouchable, RenderTouchableRipples} from './Touchable.render'

export const TouchableBase: FC<TouchableBaseProps> = ({
	disabled,
	enableTouchableRipple = true,
	onInteractionStateChange: rawOnInteractionStateChange,
	ref,
	rippleCentered,
	underlayColor,
	...renderTouchableProps
}) => {
	const [{contentLayout, rippleLocations}, setState] = useImmer<TouchableState>({
		contentLayout: {} as Partial<MeasuredLayoutRectangle>,
		rippleLocations: {} as TouchableRippleLocations
	})

	const id = useId()
	const pressableRef = useRef<PressableType>(null)
	const mergedRef = useMergeRefs([ref, pressableRef])
	const onAnimationFinished = useMemo(() => deleteTouchableRippleByKey(setState), [setState])
	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, interactionState: InteractionState, options: HandleInteractionStateChangeOptions) => {
			handleTouchableStateChange(event, setState, {
				...options,
				enableTouchableRipple,
				interactionState,
				onInteractionStateChange: rawOnInteractionStateChange,
				ref: pressableRef
			})
		},
		[enableTouchableRipple, rawOnInteractionStateChange, setState]
	)

	const interactionHandlers = useInteractionStateEvent({...renderTouchableProps, disabled, onInteractionStateChange})
	const rippleElements = (
		<RenderTouchableRipples
			containerLayout={contentLayout}
			id={id}
			onAnimationFinished={onAnimationFinished}
			rippleCentered={rippleCentered}
			rippleLocations={rippleLocations}
			underlayColor={underlayColor}
		/>
	)

	return (
		<RenderTouchable
			{...renderTouchableProps}
			id={id}
			interactionHandlers={interactionHandlers}
			ref={mergedRef}
			rippleElements={rippleElements}
		/>
	)
}
