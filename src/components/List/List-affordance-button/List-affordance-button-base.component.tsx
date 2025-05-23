import {forwardRef, useCallback, useId} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../../hooks'
import type {State} from '../../Common'
import {handleListAffordanceButtonStateChange} from './List-affordance-button.handler'
import type {ListAffordanceButtonBaseProps, ListAffordanceButtonState} from './List-affordance-button.interface'
import {useListAffordanceButtonAnimated} from './use-list-affordance-button-animated.hook'

export const ListAffordanceButtonBase = forwardRef<View, ListAffordanceButtonBaseProps>(
	(
		{
			disabled,
			labelText = 'Label',
			renderListAffordanceButton,
			visible,
			...renderListAffordanceButtonProps
		},
		ref
	) => {
		const [{eventName}, setState] = useImmer<ListAffordanceButtonState>({})
		const theme = useTheme()
		const id = useId()
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleListAffordanceButtonStateChange({...options, state, visible})(setState)(event),
			[setState, visible]
		)

		const interactionHandlers = useInteractionStateEvent({
			...renderListAffordanceButtonProps,
			disabled,
			onStateEventChange
		})

		const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useListAffordanceButtonAnimated({
			disabled
		})

		return renderListAffordanceButton({
			...renderListAffordanceButtonProps,
			backgroundUnderlayAnimatedStyle,
			disabled,
			eventName,
			id,
			interactionHandlers,
			labelText,
			labelTextAnimatedStyle,
			ref,
			theme
		})
	}
)
