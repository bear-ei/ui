import {useCallback, useId, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {ListAffordanceButtonBaseProps, ListAffordanceButtonState} from './List-affordance-button.interface'

import {EVENT_NAME, type InteractionState} from '../../../constants'
import {useInteractionStateEvent, type HandleInteractionStateChangeOptions, type InteractionEvent} from '../../../hooks'
import {handleListAffordanceButtonStateChange} from './List-affordance-button.handler'
import {RenderListAffordanceButton} from './List-affordance-button.render'
import {useListAffordanceButtonAnimated} from './use-list-affordance-button-animated.hook'

export const ListAffordanceButtonBase: FC<ListAffordanceButtonBaseProps> = ({
	backgroundVisible,
	disabled,
	labelText = 'Label',
	...renderListAffordanceButtonProps
}) => {
	const [{eventName}, setState] = useImmer<ListAffordanceButtonState>({eventName: EVENT_NAME.NONE})
	const id = useId()
	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, interactionState: InteractionState, options: HandleInteractionStateChangeOptions) =>
			handleListAffordanceButtonStateChange(event, setState, {...options, interactionState}),
		[setState]
	)

	const interactionHandlers = useInteractionStateEvent({
		...renderListAffordanceButtonProps,
		disabled,
		onInteractionStateChange
	})

	const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useListAffordanceButtonAnimated({
		backgroundVisible,
		disabled
	})

	return (
		<RenderListAffordanceButton
			{...renderListAffordanceButtonProps}
			backgroundUnderlayAnimatedStyle={backgroundUnderlayAnimatedStyle}
			disabled={disabled}
			eventName={eventName}
			id={id}
			interactionHandlers={interactionHandlers}
			labelText={labelText}
			labelTextAnimatedStyle={labelTextAnimatedStyle}
		/>
	)
}
