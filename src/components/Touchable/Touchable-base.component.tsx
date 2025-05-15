import {forwardRef, useCallback, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useInteractionStateEvent} from '../../hooks'
import {createStableHandlerWithState} from '../../utils'
import type {State} from '../Common'
import {handleTouchableStateChange, removeTouchableRipple} from './Touchable.handle'
import type {TouchableBaseProps, TouchableRippleSequence, TouchableState} from './Touchable.interface'
import {renderTouchableRipple} from './Touchable.render'

export const TouchableBase = forwardRef<View, TouchableBaseProps>(
	(
		{
			centered,
			disabled,
			enableTouchableRipple = true,
			renderTouchable,
			underlayColor,
			...renderTouchableProps
		},
		ref
	) => {
		const [{rippleSequence, contentLayout}, setState] = useImmer<TouchableState>({
			contentLayout: {} as LayoutRectangle,
			rippleSequence: {} as TouchableRippleSequence
		})

		const id = useId()
		const pressableRef = useRef<View>(null)
		const onRemoveTouchableRipple = useMemo(
			() => createStableHandlerWithState(removeTouchableRipple)(setState)(),
			[setState]
		)

		const onTouchableStateEventChange = useCallback(
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
			onStateEventChange: onTouchableStateEventChange
		})
		const rippleElements = useMemo(
			() =>
				renderTouchableRipple({
					centered,
					containerLayout: contentLayout,
					id,
					onAnimateFinished: onRemoveTouchableRipple,
					underlayColor
				})(rippleSequence),
			[centered, contentLayout, id, onRemoveTouchableRipple, rippleSequence, underlayColor]
		)

		useImperativeHandle(ref, () => (pressableRef?.current ?? {}) as View, [pressableRef])

		return renderTouchable({
			...renderTouchableProps,
			id,
			interactionHandlers,
			ref: pressableRef,
			rippleElements
		})
	}
)
