import {forwardRef, useCallback, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useInteractionStateEvent} from '../../hooks'
import type {LayoutRectangle, State} from '../Common'
import {deleteTouchableRippleByIndex, handleTouchableStateChange} from './Touchable.handler'
import type {PressableType, TouchableBaseProps, TouchableRippleSequence, TouchableState} from './Touchable.interface'
import {RenderTouchable, RenderTouchableRipples} from './Touchable.render'

export const TouchableBase = forwardRef<PressableType, TouchableBaseProps>(
	({centered, disabled, enableTouchableRipple = true, underlayColor, ...renderTouchableProps}, ref) => {
		const [{rippleSequence, contentLayout}, setState] = useImmer<TouchableState>({
			contentLayout: {} as LayoutRectangle,
			rippleSequence: {} as TouchableRippleSequence
		})

		const id = useId()
		const pressableRef = useRef<PressableType>(null)
		const onAnimateFinished = useMemo(() => deleteTouchableRippleByIndex(setState), [setState])
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleTouchableStateChange({
					...options,
					enableTouchableRipple,
					ref: pressableRef,
					state
				})(setState)(event),
			[enableTouchableRipple, setState]
		)

		const interactionHandlers = useInteractionStateEvent({
			...renderTouchableProps,
			disabled,
			onStateEventChange
		})

		const rippleElements = useMemo(
			() => (
				<RenderTouchableRipples
					centered={centered}
					containerLayout={contentLayout}
					id={id}
					onAnimateFinished={onAnimateFinished}
					rippleSequence={rippleSequence}
					underlayColor={underlayColor}
				/>
			),
			[centered, contentLayout, id, onAnimateFinished, rippleSequence, underlayColor]
		)

		useImperativeHandle(ref, () => (pressableRef?.current ?? {}) as PressableType, [pressableRef])

		return (
			<RenderTouchable
				{...renderTouchableProps}
				id={id}
				interactionHandlers={interactionHandlers}
				ref={pressableRef}
				rippleElements={rippleElements}
			/>
		)
	}
)
