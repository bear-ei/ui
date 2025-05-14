import {forwardRef, useCallback, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import type {ProcessStateEventChangeOptions, StateEvent} from '../../hooks'
import {useStateEvent} from '../../hooks'
import {createHandlerWithUpdater} from '../../utils'
import type {State} from '../Common'
import {handleTouchableAnimatedFinished, handleTouchableStateChange} from './Touchable-handle'
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
		const onTouchableAnimatedFinished = useMemo(
			() => createHandlerWithUpdater(handleTouchableAnimatedFinished)(setState)(),
			[setState]
		)

		const onStateEventChange = useCallback(
			(options: ProcessStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleTouchableStateChange({
					...options,
					enableTouchableRipple,
					ref: pressableRef,
					state
				})(setState)(event),
			[enableTouchableRipple, setState]
		)

		const interactionHandlers = useStateEvent({...renderTouchableProps, disabled, onStateEventChange})
		const rippleElements = useMemo(
			() =>
				renderTouchableRipple({
					centered,
					containerLayout: contentLayout,
					id,
					onAnimatedFinished: onTouchableAnimatedFinished,
					underlayColor
				})(rippleSequence),
			[centered, contentLayout, id, onTouchableAnimatedFinished, rippleSequence, underlayColor]
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
