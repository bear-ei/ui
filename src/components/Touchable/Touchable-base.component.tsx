import {forwardRef, useCallback, useId, useMemo, useRef} from 'react'
import {useImmer} from 'use-immer'
import type {LayoutRectangle, State} from '../../constants'
import {type HandleStateEventChangeOptions, type StateEvent, useInteractionStateEvent, useMergeRefs} from '../../hooks'
import {deleteTouchableRippleByIndex, handleTouchableStateChange} from './Touchable.handler'
import type {PressableType, TouchableBaseProps, TouchableRippleSequence, TouchableState} from './Touchable.interface'
import {RenderTouchable, RenderTouchableRipples} from './Touchable.render'

export const TouchableBase = forwardRef<PressableType, TouchableBaseProps>(
	(
		{
			centered,
			disabled,
			enableTouchableRipple = true,
			onStateEventChange: rawOnStateEventChange,
			underlayColor,
			...renderTouchableProps
		},
		ref
	) => {
		const [{rippleSequence, contentLayout}, setState] = useImmer<TouchableState>({
			contentLayout: {} as Partial<LayoutRectangle>,
			rippleSequence: {} as TouchableRippleSequence
		})

		const id = useId()
		const pressableRef = useRef<PressableType>(null)
		const mergedRef = useMergeRefs([ref, pressableRef])
		const onAnimateFinished = useMemo(() => deleteTouchableRippleByIndex(setState), [setState])
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) => {
				handleTouchableStateChange({
					...options,
					enableTouchableRipple,
					onStateEventChange: rawOnStateEventChange,
					ref: pressableRef,
					state
				})(setState)(event)
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
)

TouchableBase.displayName = 'TouchableBase'
