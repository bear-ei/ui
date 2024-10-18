import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {LayoutChangeEvent, LayoutRectangle, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import {EventName, State, TriggerEvent} from '../Common'
import {HandleTooltipStateEventChangeOptions, TooltipBaseProps, TooltipState} from './Tooltip.interface'

const handleTooltipVisible = (setState: Updater<TooltipState>) => (onVisible?: (value?: boolean) => void) => {
    const createNextActiveEvent = (value?: boolean) => () => onVisible?.(value)

    return (value?: boolean) => {
        if (typeof value === 'boolean') {
            setState(draft => {
                draft.tooltipVisible = value
                draft.nextActiveEvent = createNextActiveEvent(value)
            })
        }
    }
}

const handleTooltipEventNameChange =
    (onTooltipVisible: (value?: boolean) => void) =>
    (triggerEvent = 'hover' as TriggerEvent) => {
        const trigger = {
            focus: ['focus', 'blur'],
            hover: ['hoverIn', 'hoverOut'],
            press: ['pressIn']
        }

        return (eventName?: EventName) => {
            const triggerEventNames = trigger[triggerEvent]

            if (eventName && triggerEventNames?.includes(eventName) && eventName === triggerEventNames[0]) {
                onTooltipVisible(true)
            }
        }
    }

const handleTooltipLayout = (setState: Updater<TooltipState>) => (event: LayoutChangeEvent) => {
    const nativeEventLayout = event.nativeEvent.layout

    setState(draft => {
        draft.layout.height = nativeEventLayout.height
        draft.layout.width = nativeEventLayout.width
    })
}

const handleTooltipStateChange =
    ({onTooltipVisible, eventName, triggerEvent}: HandleTooltipStateEventChangeOptions) =>
    (setState: Updater<TooltipState>) =>
    (event: StateEvent) => {
        if (eventName === 'layout') {
            handleTooltipLayout(setState)(event as LayoutChangeEvent)
        }

        handleTooltipEventNameChange(onTooltipVisible)(triggerEvent)(eventName)
    }

export const TooltipBase = forwardRef<View, TooltipBaseProps>(
    ({defaultVisible, disabled = false, eventName, onVisible, render, visible, triggerEvent, ...renderProps}, ref) => {
        const [{tooltipVisible, nextActiveEvent, layout}, setState] = useImmer<TooltipState>({
            nextActiveEvent: undefined,
            tooltipVisible: undefined,
            layout: {} as LayoutRectangle
        })

        const containerRef = useRef<View>(null)
        const id = useId()
        const onTooltipVisible = useMemo(
            () => debounce(handleTooltipVisible(setState)(onVisible))(150),
            [onVisible, setState]
        )

        const onStateEventNameChange = useMemo(
            () => handleTooltipEventNameChange(onTooltipVisible)(triggerEvent),
            [onTooltipVisible, triggerEvent]
        )

        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleTooltipStateChange({...options, onTooltipVisible, state, triggerEvent})(setState)(event)

        const onStateEvent = useOnStateEvent({
            ...renderProps,
            disabled: typeof eventName === 'string' ? true : disabled,
            onStateEventChange
        })

        useImperativeHandle(ref, () => (containerRef?.current ? containerRef?.current : {}) as View, [])

        useEffect(() => {
            onTooltipVisible(visible ?? defaultVisible)
        }, [onTooltipVisible, visible, defaultVisible])

        useEffect(() => {
            onStateEventNameChange(eventName)
        }, [eventName, onStateEventNameChange])

        useEffect(() => {
            nextActiveEvent?.()
        }, [nextActiveEvent])

        return render({
            ...renderProps,
            containerCurrent: containerRef.current,
            id,
            onStateEvent,
            onVisible: onTooltipVisible,
            ref: containerRef,
            visible: tooltipVisible,
            layout
        })
    }
)
