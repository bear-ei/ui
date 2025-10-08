import {COMPONENT_STATUS, State} from '@/constants'
import {HandleStateEventChangeOptions, StateEvent, useClearComponentEvent, useInteractionStateEvent} from '@/hooks'
import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {useImmer} from 'use-immer'
import type {PressableType} from '../Touchable'
import {CHECKBOX_VALUE} from './Checkbox.enum'
import {
        handleCheckboxStateChange,
        updateCheckboxActive,
        updateCheckboxIndeterminate,
        updateCheckboxStatus
} from './Checkbox.handler'
import type {CheckboxBaseProps, CheckboxState} from './Checkbox.interface'
import {RenderCheckbox} from './Checkbox.render'

export const CheckboxBase = forwardRef<PressableType, CheckboxBaseProps>(
        ({active: rawActive, defaultActive, disabled, error, indeterminate, onActive, ...renderCheckboxProps}, ref) => {
                const [{active: isActive, eventName, status, value, nextActiveEvent}, setState] =
                        useImmer<CheckboxState>({status: COMPONENT_STATUS.IDLE, value: CHECKBOX_VALUE.UNSELECTED})

                useClearComponentEvent(setState)

                const id = useId()
                const onStateEventChange = useCallback(
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleCheckboxStateChange({
                                        ...options,
                                        active: isActive,
                                        indeterminate,
                                        onActive,
                                        state
                                })(setState)(event),
                        [indeterminate, isActive, onActive, setState]
                )

                const interactionHandlers = useInteractionStateEvent({
                        ...renderCheckboxProps,
                        disabled,
                        onStateEventChange
                })

                const runUpdateStatus = useMemo(() => updateCheckboxStatus(setState), [setState])
                const runUpdateIndeterminate = useMemo(() => updateCheckboxIndeterminate(setState), [setState])
                const runUpdateActive = useMemo(
                        () => updateCheckboxActive({indeterminate})(setState),
                        [indeterminate, setState]
                )

                useEffect(() => {
                        runUpdateIndeterminate(indeterminate)
                        runUpdateStatus(indeterminate)
                }, [indeterminate, runUpdateIndeterminate, runUpdateStatus])

                useEffect(() => {
                        runUpdateActive(rawActive ?? defaultActive)
                }, [runUpdateActive, defaultActive, rawActive])

                useEffect(() => {
                        nextActiveEvent?.()
                }, [nextActiveEvent])

                if (status === COMPONENT_STATUS.IDLE) {
                        return <></>
                }

                return (
                        <RenderCheckbox
                                {...renderCheckboxProps}
                                disabled={disabled}
                                error={error}
                                eventName={eventName}
                                id={id}
                                interactionHandlers={interactionHandlers}
                                ref={ref}
                                value={value}
                        />
                )
        }
)

CheckboxBase.displayName = 'CheckboxBase'
