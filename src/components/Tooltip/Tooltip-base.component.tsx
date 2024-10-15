import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import {EventName, State} from '../Common'
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

const handleTooltipEventNameChange = (onTooltipVisible: (value?: boolean) => void) => (eventName?: EventName) => {
    if (eventName && ['hoverIn', 'hoverOut', 'pressIn'].includes(eventName)) {
        const visible = eventName === 'hoverIn'

        onTooltipVisible(visible)
    }
}

const handleTooltipStateChange =
    ({onTooltipVisible, eventName}: HandleTooltipStateEventChangeOptions) =>
    (_setState: Updater<TooltipState>) =>
    (_event: StateEvent) =>
        handleTooltipEventNameChange(onTooltipVisible)(eventName)

export const TooltipBase = forwardRef<View, TooltipBaseProps>(
    ({defaultVisible, disabled = false, eventName, onVisible, render, visible, ...renderProps}, ref) => {
        const [{tooltipVisible, nextActiveEvent}, setState] = useImmer<TooltipState>({
            nextActiveEvent: undefined,
            tooltipVisible: undefined
        })

        const containerRef = useRef<View>(null)
        const id = useId()
        const onTooltipVisible = useMemo(
            () => debounce(handleTooltipVisible(setState)(onVisible))(150),
            [onVisible, setState]
        )

        const onStateEventNameChange = useMemo(() => handleTooltipEventNameChange(onTooltipVisible), [onTooltipVisible])
        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleTooltipStateChange({...options, onTooltipVisible, state})(setState)(event)

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
            visible: tooltipVisible
        })
    }
)
