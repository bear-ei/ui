import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import {useStateEvent} from '../../../hooks'
import type {State} from '../../Common'
import type {ListAffordanceButtonBaseProps, ListAffordanceButtonState} from './List-affordance-button.interface'
import {handleListAffordanceButtonStateChange} from './List-affordance-handle'
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
		const onStateEventChange =
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleListAffordanceButtonStateChange({...options, state, visible})(setState)(event)

		const interactionHandlers = useStateEvent({
			...renderListAffordanceButtonProps,
			onStateEventChange,
			disabled
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
			labelText,
			labelTextAnimatedStyle,
			interactionHandlers,
			ref,
			theme
		})
	}
)
