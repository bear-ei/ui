import {cloneElement, forwardRef, useEffect, useId} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../../hook'
import {EventName, State} from '../../Common'
import {Icon, IconProps} from '../../Icon'
import {HandleStepItemStateEventChangeOptions, StepItemBaseProps, StepItemState} from './Step-item.interface'
import {useStepItemAnimated} from './use-step-item-animated.hook'

const handleStepItemStateChange = ({itemKey, eventName, onActive}: HandleStepItemStateEventChangeOptions) => {
    const handleStepItemPressOut = (value: string) => onActive?.(value)
    const nextEvent = {
        pressOut: () => handleStepItemPressOut(itemKey)
    } as Record<EventName, () => void>

    return (setState: Updater<StepItemState>) => (_event: StateEvent) => {
        if (eventName === 'layout') {
            return
        }

        setState(draft => {
            const prevEventName = draft.eventName

            draft.eventName = eventName
            prevEventName !== eventName && eventName === 'pressOut' && (draft.nextPressOutEvent = nextEvent[eventName])
        })
    }
}

const renderStepItemIcon = (icon: React.JSX.Element) => (disabled?: boolean) => (eventName?: EventName) =>
    cloneElement<IconProps>(icon, {eventName, iconStyle: 'outlined', type: 'outlined', disabled})

const renderStepItemActiveIcon = (icon: React.JSX.Element) => (eventName?: EventName) =>
    cloneElement<IconProps>(icon, {eventName, iconStyle: 'outlined', type: 'filled'})

const renderStepItemFinishedIcon = (icon: React.JSX.Element) =>
    cloneElement<IconProps>(icon, {iconStyle: 'outlined', type: 'filled'})

export const StepItemBase = forwardRef<View, StepItemBaseProps>(
    (
        {
            activeKey,
            disabled = false,
            finished,
            finishedIcon = <Icon name='check' />,
            icon = <Icon name='circle' />,
            itemKey,
            onActive,
            render,
            type = 'segment',
            ...renderProps
        },
        ref
    ) => {
        const [{eventName, nextPressOutEvent}, setState] = useImmer<StepItemState>({
            eventName: undefined,
            nextPressOutEvent: undefined
        })

        const id = useId()
        const theme = useTheme()
        const activeColor = theme.token.scheme.secondaryContainer
        const underlayColor = theme.token.scheme.onSurface
        const active = activeKey === itemKey
        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleStepItemStateChange({...options, itemKey, onActive, state})(setState)(event)

        const onStateEvent = useOnStateEvent({...renderProps, disabled: disabled || finished, onStateEventChange})
        const {labelAnimatedStyle, labelTextAnimatedStyle} = useStepItemAnimated({active, type})
        const activeIconElement = renderStepItemActiveIcon(icon)(eventName)
        const finishedIconElement = renderStepItemFinishedIcon(finishedIcon)
        const iconElement = renderStepItemIcon(icon)(disabled)(eventName)

        useEffect(() => {
            nextPressOutEvent?.()
        }, [nextPressOutEvent])

        return render({
            ...renderProps,
            active,
            activeColor,
            activeIconElement,
            eventName,
            finishedIconElement,
            iconElement,
            id,
            labelAnimatedStyle,
            labelTextAnimatedStyle,
            onStateEvent,
            ref,
            type,
            underlayColor
        })
    }
)
