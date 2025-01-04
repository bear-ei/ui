import {forwardRef, useEffect, useId, useMemo} from 'react'
import {InteractionManager, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {State} from '../Common'
import {
        handleCheckboxActive,
        handleCheckboxIndeterminate,
        handleCheckboxStateChange,
        handleCheckboxStatus
} from './Checkbox-handle'
import {CheckboxBaseProps, CheckboxState} from './Checkbox.interface'

export const CheckboxBase = forwardRef<View, CheckboxBaseProps>(
        ({active: rawActive, defaultActive, disabled, error, indeterminate, render, onActive, ...renderProps}, ref) => {
                const [{active, eventName, status, type, nextActiveEvent}, setState] = useImmer<CheckboxState>({
                        status: 'idle',
                        type: 'unselected'
                })

                const id = useId()
                const theme = useTheme()
                const onCheckboxStatus = useMemo(() => handleCheckboxStatus(setState), [setState])
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

                useEffect(() => {
                        onCheckboxStatus(indeterminate)
                        onCheckboxIndeterminate(indeterminate)
                }, [indeterminate, onCheckboxIndeterminate, onCheckboxStatus])

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
                        id,
                        onStateEvent,
                        ref,
                        theme,
                        type
                })
        }
)
