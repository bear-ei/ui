import {useCallback, useId, useMemo, useRef, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {LayoutRectangle, State} from '../../constants'
import type {PressableType, TouchableBaseProps, TouchableRippleSequence, TouchableState} from './Touchable.interface'

import {useInteractionStateEvent, useMergeRefs, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {deleteTouchableRippleByIndex, handleTouchableStateChange} from './Touchable.handler'
import {RenderTouchable, RenderTouchableRipples} from './Touchable.render'

export const TouchableBase: FC<TouchableBaseProps> = ({
	centered,
	disabled,
	enableTouchableRipple = true,
	onStateEventChange: rawOnStateEventChange,
	ref,
	underlayColor,
	...renderTouchableProps
}) => {
	const [{contentLayout, rippleSequence}, setState] = useImmer<TouchableState>({
		contentLayout: {} as Partial<LayoutRectangle>,
		rippleSequence: {} as TouchableRippleSequence
	})

	const id = useId()
	const pressableRef = useRef<PressableType>(null)
	const mergedRef = useMergeRefs([ref, pressableRef])
	const onAnimateFinished = useMemo(() => deleteTouchableRippleByIndex(setState), [setState])
	const onStateEventChange = useCallback(
		(event: StateEvent, state: State, options: HandleStateEventChangeOptions) => {
			handleTouchableStateChange(event, setState, {
				...options,
				enableTouchableRipple,
				onStateEventChange: rawOnStateEventChange,
				ref: pressableRef,
				state
			})
		},
		[enableTouchableRipple, rawOnStateEventChange, setState]
	)

	const interactionHandlers = useInteractionStateEvent({...renderTouchableProps, disabled, onStateEventChange})
	const rippleElements = (
		<RenderTouchableRipples
			centered={centered}
			containerLayout={contentLayout}
			id={id}
			onAnimateFinished={onAnimateFinished}
			rippleSequence={rippleSequence}
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
