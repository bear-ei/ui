import {forwardRef, useEffect, useId, useMemo} from 'react'
import {InteractionManager, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {State} from '../Common'
import {
        handleCheckboxActive,
        handleCheckboxIndeterminate,
        handleCheckboxInit,
        handleCheckboxStateChange
} from './Checkbox-handle'
import {CheckboxBaseProps, CheckboxState} from './Checkbox.interface'
import {useCheckboxAnimated} from './use-checkbox-animated.hook'

export const CheckboxBase = forwardRef<View, CheckboxBaseProps>(
        ({active: rawActive, defaultActive, disabled, error, indeterminate, render, onActive, ...renderProps}, ref) => {
                const [{active, eventName, status, type, nextActiveEvent}, setState] = useImmer<CheckboxState>({
                        status: 'idle',
                        type: 'unselected'
                })

                const id = useId()
                const theme = useTheme()
                const onCheckboxInit = useMemo(() => handleCheckboxInit(setState), [setState])
                const onCheckboxIndeterminate = useMemo(() => handleCheckboxIndeterminate(setState), [setState])
                const onCheckboxRawActive = useMemo(
                        () => handleCheckboxActive({indeterminate})(setState),
                        [indeterminate, setState]
                )

                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleCheckboxStateChange({...options, active, indeterminate, state, onActive})(
                                        setState
                                )(event)

                const onStateEvent = useOnStateEvent({...renderProps, disabled, onStateEventChange})
                const {iconAnimatedStyle} = useCheckboxAnimated({active})

                useEffect(() => {
                        onCheckboxInit(indeterminate)
                        onCheckboxIndeterminate(indeterminate)
                }, [indeterminate, onCheckboxIndeterminate, onCheckboxInit])

                useEffect(() => {
                        onCheckboxRawActive(rawActive ?? defaultActive)
                }, [rawActive, defaultActive, onCheckboxRawActive])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextActiveEvent?.())
                }, [nextActiveEvent])

                if (status === 'idle') {
                        return <></>
                }

                return render({
                        ...renderProps,
                        disabled,
                        error,
                        eventName,
                        iconAnimatedStyle,
                        id,
                        onStateEvent,
                        ref,
                        theme,
                        type
                })
        }
)
