import {forwardRef, useEffect, useId, useImperativeProcess, useMemo, useRef} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hook'
import {debounce} from '../../util'
import {EventName, State} from '../Common'
import {InitialTooltipState, ProcessTooltipStateEventChangeOptions, TooltipBaseProps} from './Tooltip.interface'

const createNextActiveCallback = (onActive?: (value?: boolean) => void) => (value?: boolean) => () => onActive?.(value)
const processTooltipVisible =
    (setState: Updater<InitialTooltipState>) => (onVisible?: (value?: boolean) => void) => (value?: boolean) => {
        if (typeof value === 'boolean') {
            setState(draft => {
                draft.tooltipVisible = value
                draft.nextActiveCallback = createNextActiveCallback(onVisible)(value)
            })
        }
    }

const processTooltipEventNameChange =
    (processDebounceTooltipVisible: (value?: boolean) => void) => (eventName?: EventName) => {
        if (eventName && ['hoverIn', 'hoverOut', 'pressIn'].includes(eventName)) {
            const visible = eventName === 'hoverIn'

            processDebounceTooltipVisible(visible)
        }
    }

const processTooltipStateChange =
    ({processDebounceTooltipVisible, eventName}: ProcessTooltipStateEventChangeOptions) =>
    (_setState: Updater<InitialTooltipState>) =>
    (_event: StateEvent) =>
        processTooltipEventNameChange(processDebounceTooltipVisible)(eventName)

export const TooltipBase = forwardRef<View, TooltipBaseProps>(
    ({defaultVisible, disabled = false, eventName, onVisible, render, visible, ...renderProps}, ref) => {
        const [{tooltipVisible, nextActiveCallback}, setState] = useImmer<InitialTooltipState>({
            nextActiveCallback: undefined,
            tooltipVisible: undefined
        })

        const containerRef = useRef<View>(null)
        const id = useId()
        const processDebounceTooltipVisible = useMemo(
            () => debounce(processTooltipVisible(setState)(onVisible))(150),
            [onVisible, setState]
        )

        const onTooltipVisible = processDebounceTooltipVisible
        const onStateEventNameChange = useMemo(
            () => processTooltipEventNameChange(processDebounceTooltipVisible),
            [processDebounceTooltipVisible]
        )

        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            processTooltipStateChange({...options, processDebounceTooltipVisible, state})(setState)(event)

        const onStateEvent = useOnStateEvent({
            ...renderProps,
            disabled: typeof eventName === 'string' ? true : disabled,
            onStateEventChange
        })

        useImperativeProcess(ref, () => (containerRef?.current ? containerRef?.current : {}) as View, [])

        useEffect(() => {
            onTooltipVisible(visible ?? defaultVisible)
        }, [onTooltipVisible, visible, defaultVisible])

        useEffect(() => {
            onStateEventNameChange(eventName)
        }, [eventName, onStateEventNameChange])

        useEffect(() => {
            nextActiveCallback?.()
        }, [nextActiveCallback])

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
