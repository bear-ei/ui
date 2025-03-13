import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {HandleStateEventChangeOptions, StateEvent, useStateEvent} from '../../../hooks'
import {State} from '../../Common'
import {ListAffordanceButtonBaseProps, ListAffordanceButtonState} from './List-affordance-button.interface'
import {handleListAffordanceButtonStateChange} from './List-affordance-handle'
import {useListAffordanceButtonAnimated} from './use-list-affordance-button-animated.hook'

export const ListAffordanceButtonBase = forwardRef<View, ListAffordanceButtonBaseProps>(
        ({labelText = 'Label', render, disabled, visible, ...renderProps}, ref) => {
                const [{eventName}, setState] = useImmer<ListAffordanceButtonState>({})
                const theme = useTheme()
                const id = useId()
                const onStateEventChange =
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleListAffordanceButtonStateChange({...options, state, visible})(setState)(event)

                const stateOnEvent = useStateEvent({...renderProps, onStateEventChange, disabled})
                const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useListAffordanceButtonAnimated({
                        disabled
                })

                return render({
                        ...renderProps,
                        backgroundUnderlayAnimatedStyle,
                        disabled,
                        eventName,
                        id,
                        labelText,
                        labelTextAnimatedStyle,
                        stateOnEvent,
                        ref,
                        theme
                })
        }
)
