import {forwardRef, useCallback, useId} from 'react'
import type {NativeTouchEvent, View} from 'react-native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../../hooks'
import {COMPONENT_STATUS, type State} from '../../Common'
import {handleTouchableRippleStateChange} from './Touchable-ripple.handler'
import type {TouchableRippleBaseProps, TouchableRippleState} from './Touchable-ripple.interface'
import {useTouchableRippleAnimated} from './use-touchable-ripple-animated.hook'

export const TouchableRippleBase = forwardRef<View, TouchableRippleBaseProps>(
	(
		{
			centered,
			containerLayout,
			indexKey,
			onAnimateFinished,
			renderTouchableRipple,
			touchableLocation = {} as Pick<NativeTouchEvent, 'locationX' | 'locationY'>,
			underlayColor,
			...renderTouchableRippleProps
		},
		ref
	) => {
		const [{status}, setState] = useImmer<TouchableRippleState>({
			status: COMPONENT_STATUS.IDLE
		})

		const id = useId()
		const {width = 0, height = 0} = containerLayout ?? {}
		const centerX = width / 2
		const centerY = height / 2
		const {locationX = 0, locationY = 0} =
			centered ? {locationX: centerX, locationY: centerY} : touchableLocation

		const offsetX = Math.abs(centerX - locationX)
		const offsetY = Math.abs(centerY - locationY)
		const radius = Math.sqrt(Math.pow(centerX + offsetX, 2) + Math.pow(centerY + offsetY, 2))
		const diameter = radius * 2
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleTouchableRippleStateChange({...options, state})(setState)(event),
			[setState]
		)

		const interactionHandlers = useInteractionStateEvent({
			...renderTouchableRippleProps,
			layoutEventDelay: 0,
			onStateEventChange
		})

		const {containerAnimatedStyle} = useTouchableRippleAnimated({
			indexKey,
			onAnimateFinished,
			radius,
			status
		})

		return renderTouchableRipple({
			...renderTouchableRippleProps,
			containerAnimatedStyle,
			id,
			interactionHandlers,
			locationX,
			locationY,
			ref,
			size: diameter,
			underlayColor
		})
	}
)
