import {forwardRef, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useStateEvent} from '../../hooks'
import type {State} from '../Common'
import {handleTouchableAnimatedFinished, handleTouchableStateChange, renderTouchableRipple} from './Touchable-handle'
import type {TouchableBaseProps, TouchableRippleSequence, TouchableState} from './Touchable.interface'

export const TouchableBase = forwardRef<View, TouchableBaseProps>(
	({centered, disabled, enableTouchableRipple = true, render, underlayColor, ...renderProps}, ref) => {
		const [{rippleSequence, contentLayout}, setState] = useImmer<TouchableState>({
			contentLayout: {} as LayoutRectangle,
			rippleSequence: {} as TouchableRippleSequence
		})

		const id = useId()
		const pressableRef = useRef<View>(null)
		const onTouchableAnimatedFinished = useMemo(() => handleTouchableAnimatedFinished(setState), [setState])
		const onStateEventChange =
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleTouchableStateChange({
					...options,
					enableTouchableRipple,
					ref: pressableRef,
					state
				})(setState)(event)

		const interactionHandlers = useStateEvent({...renderProps, disabled, onStateEventChange})
		const rippleElements = renderTouchableRipple({
			centered,
			containerLayout: contentLayout,
			id,
			onAnimatedFinished: onTouchableAnimatedFinished,
			underlayColor
		})(rippleSequence)

		useImperativeHandle(ref, () => (pressableRef?.current ?? {}) as View, [pressableRef])

		return render({...renderProps, interactionHandlers, ref: pressableRef, rippleElements, id})
	}
)
