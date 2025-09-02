import {forwardRef, useCallback, useId} from 'react'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../../hooks'
import type {State} from '../../Common'
import type {PressableType} from '../../Touchable'
import {handleListAffordanceButtonStateChange} from './List-affordance-button.handler'
import type {ListAffordanceButtonBaseProps, ListAffordanceButtonState} from './List-affordance-button.interface'
import {RenderListAffordanceButton} from './List-affordance-button.render'
import {useListAffordanceButtonAnimated} from './use-list-affordance-button-animated.hook'

export const ListAffordanceButtonBase = forwardRef<PressableType, ListAffordanceButtonBaseProps>(
	({disabled, labelText = 'Label', backgroundVisible, ...renderListAffordanceButtonProps}, ref) => {
		const [{eventName}, setState] = useImmer<ListAffordanceButtonState>({})
		const id = useId()
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleListAffordanceButtonStateChange({...options, state})(setState)(event),
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
				ref={ref}
			/>
		)
	}
)
