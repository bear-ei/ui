import {useCallback, useId, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {TouchableRippleBaseProps, TouchableRippleState} from './Touchable-ripple.interface'

import {COMPONENT_STATUS, type InteractionState} from '../../../constants'
import {useInteractionStateEvent, type HandleInteractionStateChangeOptions, type InteractionEvent} from '../../../hooks'
import {handleTouchableRippleStateChange} from './Touchable-ripple.handler'
import {RenderTouchableRipple} from './Touchable-ripple.render'
import {useTouchableRippleAnimated} from './use-touchable-ripple-animated.hook'

export const TouchableRippleBase: FC<TouchableRippleBaseProps> = ({
	containerLayout,
	onAnimationFinished,
	rippleCentered,
	rippleKey,
	touchableLocation = {},
	underlayColor,
	...renderTouchableRippleProps
}) => {
	const [{status}, setState] = useImmer<TouchableRippleState>({status: COMPONENT_STATUS.IDLE})
	const id = useId()
	const {height = 0, width = 0} = containerLayout ?? {}
	const centerX = width / 2
	const centerY = height / 2
	const {locationX = 0, locationY = 0} = rippleCentered ? {locationX: centerX, locationY: centerY} : touchableLocation
	const offsetX = Math.abs(centerX - locationX)
	const offsetY = Math.abs(centerY - locationY)
	const radius = Math.sqrt(Math.pow(centerX + offsetX, 2) + Math.pow(centerY + offsetY, 2))
	const diameter = radius * 2
	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, interactionState: InteractionState, options: HandleInteractionStateChangeOptions) =>
			handleTouchableRippleStateChange(event, setState, {...options, interactionState}),
		[setState]
	)

	const interactionHandlers = useInteractionStateEvent({...renderTouchableRippleProps, onInteractionStateChange})
	const {containerAnimatedStyle} = useTouchableRippleAnimated({onAnimationFinished, radius, rippleKey, status})

	return (
		<RenderTouchableRipple
			{...renderTouchableRippleProps}
			containerAnimatedStyle={containerAnimatedStyle}
			id={id}
			interactionHandlers={interactionHandlers}
			locationX={locationX}
			locationY={locationY}
			size={diameter}
			underlayColor={underlayColor}
		/>
	)
}
