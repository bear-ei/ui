import {useCallback, useId, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {ListAffordanceButtonBaseProps, ListAffordanceButtonState} from './List-affordance-button.interface'

import {EVENT_NAME, type State} from '../../../constants'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../../hooks'
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
	const onStateEventChange = useCallback(
		(event: StateEvent, state: State, options: HandleStateEventChangeOptions) =>
			handleListAffordanceButtonStateChange(event, setState, {...options, state}),
		[setState]
	)

	const interactionHandlers = useInteractionStateEvent({
		...renderListAffordanceButtonProps,
		disabled,
		onStateEventChange
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
