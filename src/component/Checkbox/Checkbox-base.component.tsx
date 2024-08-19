import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hook'
import {EventName, State} from '../Common'
import {
    CheckboxBaseProps,
    HandleCheckboxActiveOptions,
    HandleCheckboxStateChangeOptions,
    InitialCheckboxState
} from './Checkbox.interface'
import {useCheckboxAnimated} from './use-checkbox-animated'

const createNextActiveCallback = (onActive?: (value?: boolean) => void) => (value?: boolean) => () => onActive?.(value)
const handleCheckboxActive =
    ({indeterminate, onActive}: HandleCheckboxActiveOptions) =>
    (setState: Updater<InitialCheckboxState>) =>
    (value?: boolean) => {
        typeof value === 'boolean' &&
            setState(draft => {
                const activeType = indeterminate ? 'indeterminate' : 'selected'
                const nextType = value ? activeType : 'unselected'

                draft.checkboxActive = value
                draft.type = nextType
                draft.nextActiveCallback = createNextActiveCallback(onActive)(value)
            })
    }

const handleCheckboxStateChange =
    ({active, eventName, indeterminate, onActive}: HandleCheckboxStateChangeOptions) =>
    (setState: Updater<InitialCheckboxState>) =>
    (_event: StateEvent) => {
        if (eventName === 'layout') {
            return
        }

        const nextEvent = {
            pressOut: () => handleCheckboxActive({indeterminate, onActive})(setState)(!active)
        } as Record<EventName, () => void>

        setState(draft => {
            const prevEventName = draft.eventName

            eventName && (draft.eventName = eventName)
            prevEventName !== eventName && eventName === 'pressOut' && (draft.nextPressOutEvent = nextEvent[eventName])
        })
    }

const handleCheckboxInit = (setState: Updater<InitialCheckboxState>) => (indeterminate?: boolean) =>
    setState(draft => {
        if (draft.status !== 'idle') {
            return
        }

        if (typeof draft.checkboxActive === 'boolean') {
            const defaultType = draft.checkboxActive ? 'selected' : 'unselected'

            draft.type = indeterminate ? 'indeterminate' : defaultType
        }

        draft.status = 'succeeded'
    })

const handleCheckboxIndeterminate = (setState: Updater<InitialCheckboxState>) => (indeterminate?: boolean) =>
    typeof indeterminate === 'boolean' &&
    setState(draft => {
        if (indeterminate) {
            draft.checkboxActive = indeterminate
            draft.type = 'indeterminate'

            return
        }

        draft.type = draft.checkboxActive ? 'unselected' : 'selected'
    })

export const CheckboxBase = forwardRef<View, CheckboxBaseProps>(
    ({active, defaultActive, disabled, error, indeterminate, render, onActive, ...renderProps}, ref) => {
        const [{checkboxActive, eventName, status, type, nextPressOutEvent, nextActiveCallback}, setState] =
            useImmer<InitialCheckboxState>({
                checkboxActive: undefined,
                eventName: undefined,
                nextActiveCallback: undefined,
                nextPressOutEvent: undefined,
                status: 'idle',
                type: 'unselected'
            })

        const id = useId()
        const theme = useTheme()
        const iconSvgStyle = {
            minWidth: theme.adaptSize(theme.token.spacing.large),
            minHeight: theme.adaptSize(theme.token.spacing.large)
        }

        const checkUnderlayColor =
            type === 'unselected' ? theme.token.scheme.onSurfaceVariant : theme.token.scheme.primary

        const underlayColor = error ? theme.token.scheme.error : checkUnderlayColor
        const onCheckboxInit = useMemo(() => handleCheckboxInit(setState), [setState])
        const onCheckboxIndeterminate = useMemo(() => handleCheckboxIndeterminate(setState), [setState])
        const onCheckboxActiveSource = useMemo(
            () => handleCheckboxActive({indeterminate})(setState),
            [indeterminate, setState]
        )

        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleCheckboxStateChange({...options, active: checkboxActive, indeterminate, state, onActive})(setState)(
                event
            )

        const onStateEvent = useOnStateEvent({...renderProps, disabled, onStateEventChange})
        const iconAnimatedStyle = useCheckboxAnimated({active: checkboxActive})

        useEffect(() => {
            onCheckboxInit(indeterminate)
            onCheckboxIndeterminate(indeterminate)
        }, [indeterminate, onCheckboxIndeterminate, onCheckboxInit])

        useEffect(() => {
            onCheckboxActiveSource(active ?? defaultActive)
        }, [active, defaultActive, onCheckboxActiveSource])

        useEffect(() => {
            nextPressOutEvent?.()
        }, [nextPressOutEvent])

        useEffect(() => {
            nextActiveCallback?.()
        }, [nextActiveCallback])

        if (status === 'idle') {
            return <></>
        }

        return render({
            ...renderProps,
            disabled,
            error,
            eventName,
            iconAnimatedStyle,
            iconSvgStyle,
            id,
            onStateEvent,
            ref,
            theme,
            type,
            underlayColor
        })
    }
)
