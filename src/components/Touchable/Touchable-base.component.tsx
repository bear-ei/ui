import {forwardRef, useCallback, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {LayoutRectangle, Pressable} from 'react-native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useInteractionStateEvent} from '../../hooks'
import type {State} from '../Common'
import {deleteTouchableRippleByIndex, handleTouchableStateChange} from './Touchable.handler'
import type {TouchableBaseProps, TouchableRippleSequence, TouchableState} from './Touchable.interface'
import {RenderTouchable, renderTouchableRipple} from './Touchable.render'

export const TouchableBase = forwardRef<typeof Pressable, TouchableBaseProps>(
	({centered, disabled, enableTouchableRipple = true, underlayColor, ...renderTouchableProps}, ref) => {
		const [{rippleSequence, contentLayout}, setState] = useImmer<TouchableState>({
			contentLayout: {} as LayoutRectangle,
			rippleSequence: {} as TouchableRippleSequence
		})

		const id = useId()
		const pressableRef = useRef<typeof Pressable>(null)
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
			() =>
				renderTouchableRipple({
					centered,
					containerLayout: contentLayout,
					id,
					onAnimateFinished,
					underlayColor
				})(rippleSequence),
			[centered, contentLayout, id, onAnimateFinished, rippleSequence, underlayColor]
		)

		useImperativeHandle(ref, () => (pressableRef?.current ?? {}) as typeof Pressable, [pressableRef])

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
