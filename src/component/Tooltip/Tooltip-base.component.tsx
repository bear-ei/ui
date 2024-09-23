import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hook'
import {debounce} from '../../util'
import {EventName, State} from '../Common'
import {InitialTooltipState, ProcessTooltipStateEventChangeOptions, TooltipBaseProps} from './Tooltip.interface'

const createNextActiveCallback = (onActive?: (value?: boolean) => void) => (value?: boolean) => () => onActive?.(value)
const handleTooltipVisible =
    (setState: Updater<InitialTooltipState>) => (onVisible?: (value?: boolean) => void) => (value?: boolean) => {
        if (typeof value === 'boolean') {
            setState(draft => {
                draft.tooltipVisible = value
                draft.nextActiveCallback = createNextActiveCallback(onVisible)(value)
            })
        }
    }

const handleTooltipEventNameChange =
    (handleDebounceTooltipVisible: (value?: boolean) => void) => (eventName?: EventName) => {
        if (eventName && ['hoverIn', 'hoverOut', 'pressIn'].includes(eventName)) {
            const visible = eventName === 'hoverIn'

            handleDebounceTooltipVisible(visible)
        }
    }

const handleTooltipStateChange =
    ({handleDebounceTooltipVisible, eventName}: ProcessTooltipStateEventChangeOptions) =>
    (_setState: Updater<InitialTooltipState>) =>
    (_event: StateEvent) =>
        handleTooltipEventNameChange(handleDebounceTooltipVisible)(eventName)

export const TooltipBase = forwardRef<View, TooltipBaseProps>(
    ({defaultVisible, disabled = false, eventName, onVisible, render, visible, ...renderProps}, ref) => {
        const [{tooltipVisible, nextActiveCallback}, setState] = useImmer<InitialTooltipState>({
            nextActiveCallback: undefined,
            tooltipVisible: undefined
        })

        const containerRef = useRef<View>(null)
        const id = useId()
        const handleDebounceTooltipVisible = useMemo(
            () => debounce(handleTooltipVisible(setState)(onVisible))(150),
            [onVisible, setState]
        )

        const onTooltipVisible = handleDebounceTooltipVisible
        const onStateEventNameChange = useMemo(
            () => handleTooltipEventNameChange(handleDebounceTooltipVisible),
            [handleDebounceTooltipVisible]
        )

        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleTooltipStateChange({...options, handleDebounceTooltipVisible, state})(setState)(event)

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
