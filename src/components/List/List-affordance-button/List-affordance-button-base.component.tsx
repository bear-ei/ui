import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangedOptions, StateEvent, useOnStateEvent} from '../../../hooks'
import {State} from '../../Common'
import {
        HandleListAffordanceButtonStateEventChangeOptions,
        ListAffordanceButtonBaseProps,
        ListAffordanceButtonState
} from './List-affordance-button.interface'
import {useListAffordanceButtonAnimated} from './use-list-affordance-button-animated.hook'

const handleListAffordanceButtonStateChanged =
        ({eventName}: HandleListAffordanceButtonStateEventChangeOptions) =>
        (setState: Updater<ListAffordanceButtonState>) =>
        (_event: StateEvent) => {
                if (eventName === 'layout') {
                        return
                }

                setState(draft => {
                        draft.eventName = eventName
                })
        }

export const ListAffordanceButtonBase = forwardRef<View, ListAffordanceButtonBaseProps>(
        ({labelText = 'Label', render, disabled, ...renderProps}, ref) => {
                const [{eventName}, setState] = useImmer<ListAffordanceButtonState>({
                        eventName: undefined
                })

                const id = useId()
                const theme = useTheme()
                const underlayColor = theme.token.scheme.onPrimary
                const onStateEventChange =
                        (options: OnStateEventChangedOptions) => (state: State) => (event: StateEvent) =>
                                handleListAffordanceButtonStateChanged({...options, state})(setState)(event)

                const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange, disabled})
                const {contentUnderlayAnimatedStyle, labelTextAnimatedStyle} = useListAffordanceButtonAnimated({
                        disabled
                })

                return render({
                        ...renderProps,
                        contentUnderlayAnimatedStyle,
                        disabled,
                        eventName,
                        id,
                        labelText,
                        labelTextAnimatedStyle,
                        onStateEvent,
                        ref,
                        underlayColor
                })
        }
)
