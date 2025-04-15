import {forwardRef, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import {HandleStateEventChangeOptions, StateEvent, useStateEvent} from '../../hooks'
import {State} from '../Common'
import {handleTouchableAnimatedFinished, handleTouchableStateChange, renderTouchableRipple} from './Touchable-handle'
import {TouchableBaseProps, TouchableRippleSequence, TouchableState} from './Touchable.interface'

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

		const stateOnEvent = useStateEvent({...renderProps, disabled, onStateEventChange})
		const rippleElements = renderTouchableRipple({
			centered,
			containerLayout: contentLayout,
			id,
			onAnimatedFinished: onTouchableAnimatedFinished,
			underlayColor
		})(rippleSequence)

		useImperativeHandle(ref, () => (pressableRef?.current ? pressableRef?.current : {}) as View, [
			pressableRef
		])

		return render({...renderProps, stateOnEvent, ref: pressableRef, rippleElements, id})
	}
)
